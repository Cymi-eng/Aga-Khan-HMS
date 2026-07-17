import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import About from "@/pages/About";
import Services from "@/pages/Services";
import MyAppointments from "@/pages/MyAppointments";
import BookAppointment from "@/pages/BookAppointments";
import AppointmentSuccess from "@/pages/AppointmentSuccess";

import ProtectedRoute from "@/routes/ProtectedRoutes";
import AdminRoutes  from "@/routes/AdminRoutes";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Appointments from "@/pages/admin/Appointments";
import Patients from "@/pages/admin/Patients";
import Doctors from "@/pages/admin/Doctors";
import Departments from "@/pages/admin/Departments";
import DataImporter from "@/pages/admin/DataImporter";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      

      {/* Patient Routes */}
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
        path="/appointment-success"
        element={<AppointmentSuccess />}
      />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="departments" element={<Departments />} />
        <Route path="import" element={<DataImporter />} />
      </Route>
    </Routes>
  );
}