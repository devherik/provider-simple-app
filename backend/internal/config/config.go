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
}

func New() *Config {
	return &Config{
		Port:           getEnv("PORT", "8080"),
		AllowedOrigins: []string{getEnv("ALLOWED_ORIGINS", "http://localhost:5173")},
		Environment:    getEnv("ENVIRONMENT", "development"),
		DatabaseURL:    getEnv("DATABASE_URL", "postgres://user:password@localhost:5432/dbname"),
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
