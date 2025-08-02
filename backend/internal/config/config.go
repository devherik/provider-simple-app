package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port           string
	AllowedOrigins []string
	Environment    string
	DatabaseURL    string
	JWTKey         string
}

func New() *Config {
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")
	dbUser := getEnv("DB_USER", "user")
	dbPassword := getEnv("DB_PASSWORD", "password")
	dbName := getEnv("DB_NAME", "mydb")

	databaseURL := "postgres://" + dbUser + ":" + dbPassword + "@" + dbHost + ":" + dbPort + "/" + dbName + "?sslmode=disable"

	return &Config{
		Port:           getEnv("PORT", "8080"),
		AllowedOrigins: []string{getEnv("ALLOWED_ORIGINS", "http://localhost:5173")},
		Environment:    getEnv("ENVIRONMENT", "development"),
		DatabaseURL:    getEnv("DATABASE_URL", databaseURL),
		JWTKey:         getEnv("JWT_KEY", "your_secret_key"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}
	return defaultValue
}
