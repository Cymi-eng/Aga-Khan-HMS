import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import BookAppointment from "@/pages/BookAppointments";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import MyAppointments from "@/pages/MyAppointments";




import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
// import Dashboard from "@/pages/dashboard/Dashboard";

// import ProtectedRoute from "@/routes/ProtectedRoute";

export default function AppRoutes() {
  return (
    
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/my-appointments" element={<MyAppointments />} />

  <Route
  path="/book-appointment"
  element={
    <ProtectedRoute>
      <BookAppointment />
    </ProtectedRoute>
  }
/>

  <Route
    path="/book-appointment"
    element={
      <ProtectedRoute>
        <BookAppointment />
      </ProtectedRoute>
    }
    
  />
</Routes>
  );
}