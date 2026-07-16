import { Navigate } from "react-router-dom";
import { getRole, isLoggedIn } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  const role = getRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;