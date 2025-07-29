import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export function useAuth() {
  // Custom hook to access authentication context
  // This hook provides access to the authentication context
  // and can be used in components to get authentication status
  // and perform actions like logging in or out
  // It throws an error if used outside of AuthProvider
  // This ensures that components using this hook are wrapped in AuthProvider
  // and have access to the authentication context
  // This is useful for managing authentication state in a React application
  // and allows components to react to changes in authentication status
  // and perform actions accordingly
  // It also helps in keeping the authentication logic centralized
  // and reusable across different components in the application
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}