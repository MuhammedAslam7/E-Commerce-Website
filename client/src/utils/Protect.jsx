import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
}
