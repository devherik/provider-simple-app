import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  // Custom hook to check authentication status
  // and manage loading state
  // Returns an object with isLoading and isAuthenticated properties
  // This can be used in components to conditionally render content
  // based on authentication status
  const { lookForASession } = useAuth();
  const [authState, setAuthState] = useState<{
    isLoading: boolean;
    isAuthenticated: boolean;
  }>({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const authenticated = await lookForASession();
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: authenticated,
          });
        }
      } catch (error) {
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []); // Runs only once

  return authState;
}
