# Provider Simple App

A full-stack web application with a React frontend and a Go backend.

## Features

### Backend
- RESTful API built with Go and the [Gin](https://gin-gonic.com/) framework.
- Structured logging and centralized error handling.
- Environment-based configuration for port, allowed origins, and application environment.
- CORS middleware to handle cross-origin requests.
- Basic authentication and user management endpoints.
- Well-organized project structure following Go best practices.
- Unit tests for services.

### Frontend
- Modern frontend built with React and TypeScript.
- Client-side routing with `react-router-dom`.
- State management using React Hooks and Context API (`useAuth` and `useTheme`).
- Protected routes to handle authentication flow.
- UI components styled with CSS Modules and Tailwind CSS.
- Animations using `animejs` and `motion`.
- API client for communication with the backend.

## Getting Started

### Prerequisites
- [Go](https://go.dev/doc/install) (version 1.21 or later)
- [Node.js](https://nodejs.org/en/download) (version 18 or later)

### Backend

To run the backend server:
```bash
cd backend
go run main.go
```
The backend server will start on port `8080` by default.

### Frontend

To run the frontend application:
```bash
npm install
npm run dev
```
The frontend development server will start on port `5173`.

## API Endpoints

All endpoints are prefixed with `/api`.

- `GET /ping`: Health check to verify if the server is running.
- `GET /status`: Provides the status of the server.
- `POST /login`: Authenticates a user and returns a token.
- `POST /logout`: Logs out a user.
- `POST /users`: Retrieves a list of users.

## Configuration

The backend can be configured using environment variables:

- `PORT`: The port for the server to listen on. (Default: `8080`)
- `ENVIRONMENT`: The application environment (`development` or `production`). (Default: `development`)
- `ALLOWED_ORIGINS`: A comma-separated list of allowed origins for CORS. (Default: `http://localhost:5173`)

## Security Notes

This is a demonstration application and is not intended for production use without further security enhancements. For a production environment, consider the following:

- Implement robust JWT-based authentication with refresh tokens.
- Use a secure method for password hashing (e.g., bcrypt).
- Add rate limiting to protect against brute-force attacks.
- Use HTTPS to encrypt communication.
- Implement comprehensive session management.
- Sanitize all user inputs to prevent injection attacks.

