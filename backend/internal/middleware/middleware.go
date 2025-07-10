package middleware

import (
	"log"
	"time"

	"provider-simple-app-backend/internal/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupCORS configures CORS middleware with proper security settings
func SetupCORS(cfg *config.Config) gin.HandlerFunc {
	config := cors.Config{
		AllowCredentials: true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
	}

	// Allow all origins only in development, otherwise use configured origins
	if cfg.Environment == "development" {
		config.AllowAllOrigins = true
	} else {
		config.AllowOrigins = cfg.AllowedOrigins
	}

	return cors.New(config)
}

// Logger provides structured logging for requests
func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		raw := c.Request.URL.RawQuery

		// Process request
		c.Next()

		// Log details
		latency := time.Since(start)
		clientIP := c.ClientIP()
		method := c.Request.Method
		statusCode := c.Writer.Status()

		if raw != "" {
			path = path + "?" + raw
		}

		log.Printf("[%s] %s %s %d %v",
			method,
			path,
			clientIP,
			statusCode,
			latency,
		)
	}
}

// ErrorHandler handles panic recovery and error responses
func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("Panic recovered: %v", err)
				c.JSON(500, gin.H{
					"error":   "internal_server_error",
					"message": "An unexpected error occurred",
				})
				c.Abort()
			}
		}()
		c.Next()
	}
}