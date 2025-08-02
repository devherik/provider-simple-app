package main

import (
	"log"
	"net/http"
	"time"

	"provider-simple-app-backend/internal/config"
	"provider-simple-app-backend/internal/handlers"
	"provider-simple-app-backend/internal/middleware"
	"provider-simple-app-backend/internal/services"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg := config.New()

	// Set Gin mode based on environment
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	dbURL := cfg.DatabaseURL

	// Connect to the database
	db, err := services.ConnectDB(dbURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize services
	authService := services.NewAuthService(db)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(authService, cfg)

	// Setup router
	router := gin.New()

	// Add middleware
	router.Use(middleware.Logger())
	router.Use(middleware.ErrorHandler())
	router.Use(middleware.SetupCORS(cfg))

	// Setup routes
	setupRoutes(router, authHandler, cfg)

	// Create server
	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: router,
		// Security settings
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("Server starting on port %s", cfg.Port)
	log.Printf("Environment: %s", cfg.Environment)
	log.Printf("Allowed origins: %v", cfg.AllowedOrigins)

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func setupRoutes(router *gin.Engine, authHandler *handlers.AuthHandler, cfg *config.Config) {
	// API routes
	api := router.Group("/api").Use(middleware.Auth(cfg))
	{
		api.POST("/user", authHandler.GetUser)
	}

	// For backward compatibility, keep the old routes
	root := router.Group("/")
	{
		root.GET("/ping", authHandler.Ping)
		root.GET("/status", authHandler.Status)
		root.POST("/login", authHandler.Login)
		root.POST("/logout", authHandler.Logout)
		root.POST("/users", authHandler.GetUsers)
		root.POST("/users/create", authHandler.CreateUser)
	}
}
