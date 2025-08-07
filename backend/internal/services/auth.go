package services

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrUserNotFound       = errors.New("user not found")
	ErrUsernameTaken      = errors.New("username is already taken")
)

// User defines the structure for a user in the system.
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Theme    string `json:"theme"`
}

// AuthService handles authentication logic
type AuthService struct {
	db *pgxpool.Pool
}

// NewAuthService creates a new authentication service
func NewAuthService(db *pgxpool.Pool) *AuthService {
	return &AuthService{
		db: db,
	}
}

// ConnectDB establishes a connection to the database
func ConnectDB(dbURL string) (*pgxpool.Pool, error) {
	if dbURL == "" {
		return nil, errors.New("DATABASE_URL environment variable not set")
	}

	db, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database connection: %w", err)
	}

	if err := db.Ping(context.Background()); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Connected to database successfully")
	return db, nil
}

// ValidateCredentials checks if the provided username and password match a stored hash.
func (s *AuthService) ValidateCredentials(username string, password string) (int, error) {
	if username == "" || password == "" {
		return 0, ErrInvalidCredentials
	}

	var hashedPassword string
	var userID int
	row := s.db.QueryRow(context.Background(), "SELECT id, user_password FROM users WHERE user_name = $1", username)
	if err := row.Scan(&userID, &hashedPassword); err != nil {
		if err == sql.ErrNoRows {
			return 0, ErrInvalidCredentials
		}
		return 0, fmt.Errorf("failed to query user: %w", err)
	}

	log.Printf("Validating credentials for user %s, id %d", username, userID)

	// Compare the provided password with the stored hash.
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		// This error means the password does not match.
		log.Printf("Failed login attempt for user %s: %v", username, err)
		return 0, ErrInvalidCredentials
	}

	return userID, nil
}

func (s *AuthService) CreateUser(username, password, theme string) (*User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	var user User
	err = s.db.QueryRow(
		context.Background(),
		"INSERT INTO users (user_name, user_password, user_theme) VALUES ($1, $2, $3) RETURNING id",
		username, hashedPassword, theme,
	).Scan(&user.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	user.Username = username
	user.Theme = theme
	return &user, nil
}

func (s *AuthService) UpdateUser(userID int, username, password, theme string) error {
	if userID <= 0 {
		return ErrUserNotFound
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	// Update user information in the database
	_, err = s.db.Exec(context.Background(),
		"UPDATE users SET user_name = $1, user_password = $2, user_theme = $3 WHERE id = $4",
		username, hashedPassword, theme, userID,
	)
	if err != nil {
		return fmt.Errorf("failed to update user: %w", err)
	}
	return nil
}

// GetUserByUsername retrieves user information by username
func (s *AuthService) GetUserByUsername(username string) (*User, error) {
	var user User
	user.Username = username
	err := s.db.QueryRow(context.Background(), "SELECT id, user_theme FROM users WHERE user_name = $1", username).Scan(&user.ID, &user.Theme)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to get user by username: %w", err)
	}
	return &user, nil
}

// GetUsers retrieves all users from the database.
func (s *AuthService) GetUsers() ([]User, error) {
	rows, err := s.db.Query(context.Background(), "SELECT id, user_name, user_theme FROM users")
	if err != nil {
		return nil, fmt.Errorf("failed to query users: %w", err)
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Username, &user.Theme); err != nil {
			return nil, fmt.Errorf("failed to scan user: %w", err)
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over users: %w", err)
	}

	if users == nil {
		return []User{}, nil // Return empty slice instead of nil
	}

	return users, nil
}
