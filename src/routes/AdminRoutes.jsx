import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (userData?.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}