"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";
import Cookies from "js-cookie";
import AuthServer from "../server/AuthServer";
import LoadingPage from "../presentation/loading/page";
import { useTheme } from "../hooks/useTheme";

type SessionStatusType = "UP" | "DOWN" | "LOADING" | "ERROR";

interface UserCredentials {
  userId?: number;
  userName: string;
  password?: string;
  theme?: string;
  token?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser?: UserCredentials;
  /**
   * Logs in the user with the provided credentials.
   * @param credentials - An object containing userName and optional password.
   * @returns A promise that resolves when the login is successful.
   */
  login: (credentials: {
    userName: string;
    password?: string;
    token?: string;
  }) => Promise<void>;
  createSession: (currentUser: UserCredentials) => void;
  clearSession: () => void;
  sessionStatus: SessionStatusType;
  /**
   * Logs out the user.
   * @returns A promise that resolves when the logout is successful.
   */
  logout: () => void;
  lookForASession: () => Promise<boolean>;
  updateTheme: (theme: string) => Promise<void>;
  updateUser: (user: UserCredentials) => Promise<void>;
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
  const { theme, showToast } = useTheme();
  const [currentUser, setCurrentUser] = useState<UserCredentials | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<SessionStatusType>("DOWN");
  const cookie = Cookies;
  // Use the singleton instance of AuthServer
  // This ensures that the same instance is used across the application
  // and avoids unnecessary re-instantiation.
  const server = AuthServer.instance;

  const createSession = useCallback(
    (currentUser: UserCredentials) => {
      cookie.set("session", "true", { expires: 1 });
      cookie.set("user", currentUser.userName, { expires: 1 });
      cookie.set("userId", currentUser.userId?.toString() || "", { expires: 1 });
      cookie.set("theme", currentUser.theme!, { expires: undefined });
      cookie.set("token", currentUser.token!, { expires: 7 });
    },
    [cookie]
  );

  const clearSession = useCallback(() => {
    cookie.remove("session");
    cookie.remove("user");
    cookie.remove("userId");
    cookie.remove("token");
    cookie.remove("theme");
  }, [cookie]);

  const lookForASession = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSessionStatus("LOADING");
    try {
      const sessionExists = cookie.get("session") === "true";
      const userName = cookie.get("user");
      const userId = cookie.get("userId");
      const theme = cookie.get("theme") || "light";
      if (sessionExists && userName && userId) {
        setCurrentUser({ userName: userName, userId: parseInt(userId), theme });
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
        .then(async (data) => {
          if (!data) {
            throw new Error(
              "Login failed: Invalid credentials or server error."
            );
          }
          const json: { token: string; theme: string; user_id: number } = await data.json();
          if (!json || !data.ok) {
            throw new Error("Login failed: Invalid response from server.");
          }
          const payload = {
            userName: credentials.userName,
            userId: json.user_id,
            theme: json.theme === "" ? theme : json.theme,
            token: json.token,
          };
          console.info("Login successful:", json, payload);
          createSession(payload);
          setCurrentUser(payload);
          setIsAuthenticated(true);
          setSessionStatus("UP");
          showToast(`Welcome back, ${credentials.userName}!`, "success");
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
      .then(async (data) => {
        if (!data) {
          throw new Error("Logout failed: Invalid response from server.");
        }
        clearSession();
        setCurrentUser(undefined);
        setIsAuthenticated(false);
        setSessionStatus("DOWN");
        showToast("You have been logged out.", "success");
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

  const updateTheme = useCallback(
    async (theme: string) => {
      if (!currentUser || !currentUser.userId) {
        throw new Error("No user is currently logged in.");
      }
      setError(null);
      await server
        .updateUser(
          { userId: currentUser.userId },
          { userName: currentUser.userName },
          { password: currentUser.password || "password" },
          { theme: theme },
          { token: currentUser.token || "" }
        )
        .then(async (data) => {
          if (!data) {
            throw new Error("Update failed: Invalid response from server.");
          }
          const updatedUser = {
            userName: currentUser.userName,
            userId: currentUser.userId,
            theme: theme,
          };
          console.info("User theme updated successfully:", updatedUser);
          setCurrentUser(updatedUser);
          showToast(`Theme updated to ${theme} successfully!`, "success");
        })
        .catch((error) => {
          console.error("Update failed:", error);
          setError(
            error instanceof Error ? error.message : "An unknown error occurred."
          );
          throw error;
        });
    },
    [createSession, currentUser, server]
  );

  const updateUser = useCallback(
    async (user: UserCredentials) => {
      if (!user.userName || !user.userId) {
        throw new Error("Username and userId are required for update.");
      }
      setError(null);
      await server
        .updateUser(
          { userId: user.userId },
          { userName: user.userName },
          { password: user.password || "password" },
          { theme: user.theme || "light" },
          { token: user.token || "" }
        )
        .then(async (data) => {
          if (!data) {
            throw new Error("Update failed: Invalid response from server.");
          }
          const updatedUser = {
            userName: user.userName,
            userId: user.userId,
            theme: user.theme || "light",
          };
          console.info("User updated successfully:", user, updatedUser);
          createSession(updatedUser);
          setCurrentUser(updatedUser);
          showToast(`User ${user.userName} updated successfully!`, "success");
        })
        .catch((error) => {
          console.error("Update failed:", error);
          setError(
            error instanceof Error ? error.message : "An unknown error occurred."
          );
          throw error;
        })
    },
    [createSession, server]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      login,
      logout,
      createSession,
      clearSession,
      lookForASession,
      updateTheme,
      updateUser,
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
      updateTheme,
      updateUser,
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
