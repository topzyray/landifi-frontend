import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: "landlord" | "tenant" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/auth/login" replace />;
  }

  if (user.userType !== requiredRole) {
    console.log(
      `User role mismatch. Redirecting to /dashboard/${user.userType}`
    );
    return <Navigate to={`/dashboard/${user.userType}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
