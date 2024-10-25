import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface UnprotectedRouteProps {
  children: ReactNode;
}

const UnprotectedRoute = ({ children }: UnprotectedRouteProps) => {
  const { user } = useAuth();

  // If user is authenticated, redirect based on their role
  if (user) {
    return <Navigate to={`/dashboard/${user.userType}`} replace />;
  }

  // If not authenticated, render the child component (e.g., login page)
  return <>{children}</>;
};

export default UnprotectedRoute;
