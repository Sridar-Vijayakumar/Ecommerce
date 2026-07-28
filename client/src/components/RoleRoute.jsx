import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRoute({ roles, children }) {
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();
  if (!userInfo) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (!roles.includes(userInfo.role || "user")) return <Navigate to="/portal" replace />;
  return children;
}
