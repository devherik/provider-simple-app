package services

/*import (
	"testing"
)

func TestAuthService_ValidateCredentials(t *testing.T) {
	service := NewAuthService()

	tests := []struct {
		name     string
		username string
		password string
		wantErr  error
	}{
		{
			name:     "Valid credentials",
			username: "admin",
			password: "password",
			wantErr:  nil,
		},
		{
			name:     "Invalid username",
			username: "invalid",
			password: "password",
			wantErr:  ErrUserNotFound,
		},
		{
			name:     "Invalid password",
			username: "admin",
			password: "invalid",
			wantErr:  ErrInvalidCredentials,
		},
		{
			name:     "Empty username",
			username: "",
			password: "password",
			wantErr:  ErrInvalidCredentials,
		},
		{
			name:     "Empty password",
			username: "admin",
			password: "",
			wantErr:  ErrInvalidCredentials,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := service.ValidateCredentials(tt.username, tt.password)
			if err != tt.wantErr {
				t.Errorf("ValidateCredentials() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestAuthService_GetUserByUsername(t *testing.T) {
	service := NewAuthService()

	tests := []struct {
		name     string
		username string
		wantErr  error
	}{
		{
			name:     "Valid user",
			username: "admin",
			wantErr:  nil,
		},
		{
			name:     "Invalid user",
			username: "invalid",
			wantErr:  ErrUserNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			user, err := service.GetUserByUsername(tt.username)
			if err != tt.wantErr {
				t.Errorf("GetUserByUsername() error = %v, wantErr %v", err, tt.wantErr)
			}
			if err == nil && user["username"] != tt.username {
				t.Errorf("GetUserByUsername() got username = %v, want %v", user["username"], tt.username)
			}
		})
	}
}
*/
