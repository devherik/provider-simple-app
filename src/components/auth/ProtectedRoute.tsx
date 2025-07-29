import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingCircleSpinner from "../load-spinner/LoadingCircleSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { lookForASession } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const authenticated = await lookForASession();
        if (isMounted) {
          setIsAuthenticated(authenticated);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - runs only once

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingCircleSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with the current location as state
    sessionStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
