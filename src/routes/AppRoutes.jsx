import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import BookAppointment from "@/pages/BookAppointments";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import MyAppointments from "@/pages/MyAppointments";
import About from "@/pages/About";
import Services from "@/pages/Services";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Appointments from "@/pages/admin/Appointments";
import Patients from "@/pages/admin/Patients";
import Doctors from "@/pages/admin/Doctors";
import Departments from "@/pages/admin/Departments";





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
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  
  <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="appointments" element={<Appointments />} />
  <Route path="patients" element={<Patients />} />
  <Route path="doctors" element={<Doctors />} />
  <Route path="departments" element={<Departments />} />
</Route>

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