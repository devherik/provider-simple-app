# Backend API

This is the backend API for the Provider Simple App, built with Go and Gin framework.

## Features

- RESTful API endpoints
- Structured logging
- CORS configuration
- Error handling middleware
- Environment-based configuration
- Basic authentication
- Input validation

## Project Structure

```
backend/
├── internal/
│   ├── config/         # Configuration management
│   ├── handlers/       # HTTP handlers
│   ├── middleware/     # HTTP middleware
│   ├── models/         # Data models
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── main.go             # Application entry point
└── go.mod              # Go module file
```

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /logout` - User logout

### Health Check
- `GET /ping` - Health check endpoint
- `GET /status` - Server status

## Configuration

The application uses environment variables for configuration:

- `PORT` - Server port (default: 8080)
- `ENVIRONMENT` - Application environment (default: development)
- `ALLOWED_ORIGINS` - Allowed CORS origins (default: http://localhost:5173)

Copy `.env.example` to `.env` and modify as needed.

## Running the Application

```bash
# Build the application
go build -o main .

# Run the application
./main

# Or run directly
go run main.go
```

## Testing

```bash
# Run all tests
go test ./...

# Run with coverage
go test -cover ./...
```

## Security Notes

- This is a demo application with hardcoded credentials
- In production, use proper authentication with JWT tokens
- Implement proper password hashing
- Use a database for user storage
- Add rate limiting
- Use HTTPS in production