import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";




// import Login from "@/pages/Login";
// import ForgotPassword from "@/pages/ForgotPassword";
// import Dashboard from "@/pages/dashboard/Dashboard";

// import ProtectedRoute from "@/routes/ProtectedRoute";

export default function AppRoutes() {
  return (
    
    <Routes>
       
      {/* Redirect root to login */}
      <Route path="/" element={<Home />} />

      {/* Public Routes */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */} 
    </Routes>
  );
}