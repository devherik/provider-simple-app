import { Navigate } from "react-router-dom";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import LoadingCircleSpinner from "../load-spinner/LoadingCircleSpinner";

interface WithAuthGuardProps {
  children: React.ReactNode;
}

export default function withAuthGuard<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthGuardedComponent(props: T) {
    const { isLoading, isAuthenticated } = useAuthGuard();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <LoadingCircleSpinner />
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Alternative: Simple wrapper component
export function AuthGuard({ children }: WithAuthGuardProps) {
  const { isLoading, isAuthenticated } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingCircleSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
