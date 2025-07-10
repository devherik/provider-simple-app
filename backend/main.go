package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// main is the entrypoint for the application and starts the HTTP server.
func main() {
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	router.POST("/login", func(ctx *gin.Context) {
		var loginData struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := ctx.ShouldBindJSON(&loginData); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid request",
			})
			return
		}

		if loginData.Username == "admin" && loginData.Password == "password" {
			ctx.JSON(http.StatusOK, gin.H{
				"message": "Login successful",
			})
		} else {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"message": "Invalid credentials",
			})
		}
	})
	router.POST("/logout", func(ctx *gin.Context) {
		// In a real application, you would handle session termination here.
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Logout successful",
		})
	})
	router.GET("/status", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status": "Server is running",
		})
	})
	router.Run("localhost:8080")
}
