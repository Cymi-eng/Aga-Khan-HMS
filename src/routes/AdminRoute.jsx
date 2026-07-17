import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminRoute({ children }) {

  const { currentUser, role } = useAuth();

  console.log("AUTH USER:", currentUser);
  console.log("USER ROLE:", role);


  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }


  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }


  return children;
}