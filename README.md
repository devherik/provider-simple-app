# Provider Simple App

A full-stack web application with React frontend and Go backend.

## Project Structure

```
├── backend/            # Go backend API
│   ├── internal/       # Internal packages
│   │   ├── config/     # Configuration management
│   │   ├── handlers/   # HTTP handlers
│   │   ├── middleware/ # HTTP middleware
│   │   ├── models/     # Data models
│   │   └── services/   # Business logic
│   ├── main.go         # Application entry point
│   └── README.md       # Backend documentation
├── src/                # React frontend
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── providers/      # Context providers
│   ├── presentation/   # Page components
│   └── server/         # API client
├── public/             # Static assets
└── package.json        # Frontend dependencies
```

## Features

### Backend
- RESTful API with Go and Gin
- Structured logging and error handling
- Environment-based configuration
- CORS configuration
- Input validation
- Basic authentication
- Proper project structure
- Unit tests

### Frontend
- React with TypeScript
- Authentication flow
- Protected routes
- Responsive design with Tailwind CSS
- Clean architecture with hooks and providers

## Getting Started

### Backend

```bash
cd backend
go build -o main .
./main
```

The backend server will start on port 8080.

### Frontend

```bash
npm install
npm run dev
```

The frontend will start on port 5173.

## API Endpoints

- `GET /ping` - Health check
- `GET /status` - Server status
- `POST /login` - User authentication
- `POST /logout` - User logout

## Configuration

Backend configuration via environment variables:
- `PORT` - Server port (default: 8080)
- `ENVIRONMENT` - Application environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins

## Security Notes

This is a demo application. For production use:
- Implement proper JWT authentication
- Use secure password hashing
- Add rate limiting
- Use HTTPS
- Implement proper session management
- Add input sanitization

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
