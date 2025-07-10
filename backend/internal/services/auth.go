package services

import (
	"crypto/subtle"
	"errors"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrUserNotFound       = errors.New("user not found")
)

// AuthService handles authentication logic
type AuthService struct {
	// In a real application, this would use a database
	// For now, we'll use hardcoded credentials for demo purposes
	validUsers map[string]string
}

// NewAuthService creates a new authentication service
func NewAuthService() *AuthService {
	return &AuthService{
		validUsers: map[string]string{
			"admin": "password", // In production, this would be hashed
		},
	}
}

// ValidateCredentials checks if the provided credentials are valid
func (s *AuthService) ValidateCredentials(username, password string) error {
	if username == "" || password == "" {
		return ErrInvalidCredentials
	}

	expectedPassword, exists := s.validUsers[username]
	if !exists {
		return ErrUserNotFound
	}

	// Use constant time comparison to prevent timing attacks
	if subtle.ConstantTimeCompare([]byte(password), []byte(expectedPassword)) != 1 {
		return ErrInvalidCredentials
	}

	return nil
}

// GetUserByUsername retrieves user information by username
func (s *AuthService) GetUserByUsername(username string) (map[string]interface{}, error) {
	if _, exists := s.validUsers[username]; !exists {
		return nil, ErrUserNotFound
	}

	return map[string]interface{}{
		"username": username,
		"id":       1, // In production, this would come from the database
	}, nil
}