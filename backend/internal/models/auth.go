package models

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Message string `json:"message"`
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
}

type UserResponse struct {
	Users []User `json:"users"`
}

type CreateUserRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Theme    string `json:"theme" binding:"required"`
}

type CreateUserResponse struct {
	User User `json:"user"`
}

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}
