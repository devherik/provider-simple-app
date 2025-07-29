"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";
import Cookies from "js-cookie";
import AuthServer from "../server/AuthServer";
import LoadingPage from "../presentation/loading/page";
import { useTheme } from "../hooks/useTheme";

type SessionStatusType = "UP" | "DOWN" | "LOADING" | "ERROR";

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
  createSession: (currentUser: string) => void;
  clearSession: () => void;
  sessionStatus: SessionStatusType;
  /**
   * Logs out the user.
   * @returns A promise that resolves when the logout is successful.
   */
  logout: () => void;
  lookForASession: () => Promise<boolean>;
  isLoading?: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<SessionStatusType>("DOWN");
  const cookie = Cookies;
  // Use the singleton instance of AuthServer
  // This ensures that the same instance is used across the application
  // and avoids unnecessary re-instantiation.
  const server = AuthServer.instance;

  const createSession = useCallback(
    (currentUser: string) => {
      cookie.set("session", "true", { expires: 1 });
      cookie.set("user", currentUser, { expires: 1 });
      cookie.set("theme", theme, { expires: undefined });
    },
    [cookie, theme]
  );

  const clearSession = useCallback(() => {
    cookie.remove("session");
    cookie.remove("user");
    cookie.remove("theme");
  }, [cookie]);

  const lookForASession = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSessionStatus("LOADING");
    try {
      const sessionExists = cookie.get("session") === "true";
      const userName = cookie.get("user");
      if (sessionExists && userName) {
        setCurrentUser(userName);
        setIsAuthenticated(true);
        setSessionStatus("UP");
        console.info("Session found for user:", userName);
        return true;
      } else {
        setSessionStatus("DOWN");
        return false;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      setSessionStatus("ERROR");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cookie]);

  const login = useCallback(
    async (credentials: { userName: string; password?: string }) => {
      if (!credentials.userName) {
        throw new Error("Username is required for login.");
      }
      setIsLoading(true);
      setError(null);
      setSessionStatus("LOADING");
      await server
        .login(credentials, {
          password: credentials.password || "password",
        })
        .then((data) => {
          if (!data) {
            throw new Error(
              "Login failed: Invalid credentials or server error."
            );
          }
          createSession(credentials.userName);
          setCurrentUser(credentials.userName);
          setIsAuthenticated(true);
          setSessionStatus("UP");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setError(
            error instanceof Error
              ? error.message
              : "An unknown error occurred."
          );
          setSessionStatus("ERROR");
          setIsLoading(false);
          // Rethrow the error to be handled by the caller
          // This allows the caller to handle the error appropriately.
          // For example, it can display an error message to the user.
          // This is useful for debugging and user feedback.
          // It also ensures that the application can gracefully handle login failures.
          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [createSession, server]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSessionStatus("LOADING");
    await server
      .logout()
      .then(() => {
        clearSession();
        setCurrentUser("");
        setIsAuthenticated(false);
        setSessionStatus("DOWN");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
        setSessionStatus("ERROR");
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clearSession]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      login,
      logout,
      createSession,
      clearSession,
      lookForASession,
      isLoading,
      error,
      sessionStatus,
    }),
    [
      isAuthenticated,
      currentUser,
      login,
      logout,
      createSession,
      clearSession,
      lookForASession,
      isLoading,
      error,
      sessionStatus,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
}
