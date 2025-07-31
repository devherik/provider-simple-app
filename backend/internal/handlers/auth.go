package handlers

import (
	"net/http"

	"provider-simple-app-backend/internal/models"
	"provider-simple-app-backend/internal/services"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "validation_error",
			Message: "Invalid request format",
		})
		return
	}

	err := h.authService.ValidateCredentials(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "authentication_failed",
			Message: "Invalid credentials",
		})
		return
	}

	c.JSON(http.StatusOK, models.LoginResponse{
		Message: "Login successful",
	})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	// In a real application, you would invalidate the session/token here
	c.JSON(http.StatusOK, models.LoginResponse{
		Message: "Logout successful",
	})
}

func (h *AuthHandler) Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func (h *AuthHandler) Status(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "Server is running",
	})
}

func (h *AuthHandler) GetUsers(c *gin.Context) {
	users, err := h.authService.GetUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "internal_error",
			Message: "Failed to retrieve users",
		})
		return
	}

	c.JSON(http.StatusOK, users)
}
