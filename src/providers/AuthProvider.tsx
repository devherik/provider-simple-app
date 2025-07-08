"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import AuthServer from "../server/AuthServer";
import LoadingPage from "../presentation/loading/page";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser?: string;
  /**
   * Logs in the user with the provided credentials.
   * @param credentials - An object containing userName and optional password.
   * @returns A promise that resolves when the login is successful.
   */
  login: (credentials: {
    userName: string;
    password?: string;
  }) => Promise<void>;
  /**
   * Logs out the user.
   * @returns A promise that resolves when the logout is successful.
   */
  logout: () => void;
  isLoading?: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Use the singleton instance of AuthServer
  // This ensures that the same instance is used across the application
  // and avoids unnecessary re-instantiation.
  const server = AuthServer.instance;

  const login = useCallback(
    async (credentials: { userName: string; password?: string }) => {
      console.log("Logging in with credentials:", credentials);
      if (!credentials.userName) {
        throw new Error("Username is required for login.");
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await server.login(credentials, {
          password: credentials.password || "password",
        });
        if (!data) {
          throw new Error("Login failed: Invalid credentials or server error.");
        }
        setCurrentUser(credentials.userName);
        setIsAuthenticated(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      login,
      logout,
      isLoading,
      error,
    }),
    [isAuthenticated, currentUser, login, logout, isLoading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? LoadingPage() : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
