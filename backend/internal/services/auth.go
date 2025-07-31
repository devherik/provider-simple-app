package services

import (
	"crypto/subtle"
	"database/sql"
	"errors"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrUserNotFound       = errors.New("user not found")
)

// AuthService handles authentication logic
type AuthService struct {
	db *sql.DB
}

// NewAuthService creates a new authentication service
func NewAuthService(db *sql.DB) *AuthService {
	return &AuthService{
		db: db,
	}
}

// ConnectDB establishes a connection to the database
func ConnectDB() (*sql.DB, error) {
	host := "localhost"
	port := "3306"
	user := "root_user"
	password := "The4nerazurri"
	dbname := "espetosdb"
	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, dbname)

	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		return nil, fmt.Errorf("failed to open database connection: %w", err)
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Connected to database successfully")
	return db, nil
}

// ValidateCredentials checks if the provided credentials are valid
func (s *AuthService) ValidateCredentials(username string, password string) error {
	if username == "" || password == "" {
		return ErrInvalidCredentials
	}

	row := s.db.QueryRow("SELECT password FROM users WHERE name = ?", username)
	var expectedPassword string
	if err := row.Scan(&expectedPassword); err != nil {
		if err == sql.ErrNoRows {
			return ErrUserNotFound
		}
		return fmt.Errorf("failed to query user: %w", err)
	}

	// Use constant time comparison to prevent timing attacks
	if subtle.ConstantTimeCompare([]byte(password), []byte(expectedPassword)) != 1 {
		return ErrInvalidCredentials
	}

	return nil
}

// GetUserByUsername retrieves user information by username
func (s *AuthService) GetUserByUsername(username string) (map[string]interface{}, error) {
	// This is a simplified query. In a real app, you'd select more user details.
	var id int
	err := s.db.QueryRow("SELECT id FROM users WHERE name = ?", username).Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to get user by username: %w", err)
	}

	return map[string]interface{}{"username": username, "id": id}, nil
}

func (s *AuthService) GetUsers() ([]map[string]any, error) {
	rows, err := s.db.Query("SELECT id, name FROM users")
	if err != nil {
		return nil, fmt.Errorf("failed to query users: %w", err)
	}
	defer rows.Close()

	var users []map[string]interface{}
	for rows.Next() {
		var id int
		var username string
		if err := rows.Scan(&id, &username); err != nil {
			return nil, fmt.Errorf("failed to scan user: %w", err)
		}
		users = append(users, map[string]interface{}{"username": username, "id": id})
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over users: %w", err)
	}

	return users, nil
}
