import { useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/NotFound";

export default function AdminRoute({ children }) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return null;

  if (!currentUser || userData?.role !== "admin") {
    return <NotFound />;
  }

  return children;
}