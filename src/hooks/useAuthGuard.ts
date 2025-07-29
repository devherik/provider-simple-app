import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export function useAuthGuard() {
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
