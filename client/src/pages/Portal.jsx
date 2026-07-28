import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Portal() {
  const { userInfo } = useContext(AuthContext);
  if (!userInfo) return <Navigate to="/login" replace />;
  if (userInfo.role === "admin") return <Navigate to="/admin" replace />;
  if (userInfo.role === "seller") return <Navigate to="/seller" replace />;
  return <Navigate to="/profile" replace />;
}
