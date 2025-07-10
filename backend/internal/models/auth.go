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

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}