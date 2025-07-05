
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import PageLayout from "./layout/PageLayout";
// import DoctorLayout from "./layout/DoctorLayout";
// import AdminLayout from "./layout/AdminLayout";

// import ProtectedRoute from "./components/ProtectedRoute";

// import LandingPage from "./pages/LandingPage";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
// import AllDoctors from "./pages/AllDoctors";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";

// import PatientDashboard from "./pages/PatientDashboard";
// import DoctorDashboard from "./pages/doctor/DoctorDashboardPage";


// import DoctorRegistrationFlow from "./pages/DoctorRegistrationFlow"; 

// import RegistrationSubmittedPage from "./pages/RegistrationSubmittedPage";

// import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
// import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage";
// import DoctorListPage from "./pages/admin/DoctorListPage";
// import AdminApprovedDoctorsPage from "./pages/admin/AdminApprovedDoctorsPage";
// import AdminPendingDoctorsPage from "./pages/admin/AdminPendingDoctorsPage";
// import AdminRejectedDoctorsPage from "./pages/admin/AdminRejectedDoctorsPage";
// import DoctorDetailsPage from "./pages/admin/DoctorDetailPage";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<PageLayout><LandingPage /></PageLayout>} />
//         <Route path="/about" element={<PageLayout><AboutUs /></PageLayout>} />
//         <Route path="/contact" element={<PageLayout><ContactUs /></PageLayout>} />
//         <Route path="/alldoctors" element={<PageLayout><AllDoctors /></PageLayout>} />
//         <Route path="/login" element={<PageLayout><LoginPage /></PageLayout>} />
//         <Route path="/signup" element={<PageLayout><SignupPage /></PageLayout>} />

//         {/* Patient */}
//         <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><PatientDashboard /></ProtectedRoute>} />

//         {/* Doctor */}
//         <Route path="/doctor" element={<DoctorLayout />}>
//           <Route path="register" element={<DoctorRegistrationFlow />} />
//           <Route path="registration-submitted" element={<RegistrationSubmittedPage />} />
//           <Route path="dashboard" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorDashboard /></ProtectedRoute>} />
//           <Route index element={<Navigate to="dashboard" replace />} />
//         </Route>

//         {/* Admin */}
//         <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
//           <Route index element={<AdminDashboardPage />} />
//           <Route path="appointments" element={<AdminAppointmentsPage />} />
//           <Route path="doctors" element={<DoctorListPage />} />
//           <Route path="doctors/approved" element={<AdminApprovedDoctorsPage />} />
//           <Route path="doctors/pending" element={<AdminPendingDoctorsPage />} />
//           <Route path="doctors/rejected" element={<AdminRejectedDoctorsPage />} />
//           <Route path="doctors/:id" element={<DoctorDetailsPage />} />
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };
// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PageLayout from "./layout/PageLayout";
import DoctorLayout from "./layout/DoctorLayout";
import AdminLayout from "./layout/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AllDoctors from "./pages/AllDoctors";
import DoctorProfile from "./pages/DoctorProfile";
import MyAppointments from "./pages/MyAppointmentsPage";
import AppointmentHistoryPage from "./pages/AppointmentHistoryPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import PatientDashboard from "./pages/patient/PatientDashboardPage";

import DoctorDashboard from "./pages/doctor/DoctorDashboardPage";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import AppointmentHistory from "./pages/doctor/AppointmentHistory";

import DoctorRegistrationFlow from "./pages/DoctorRegistrationFlow";
import RegistrationSubmittedPage from "./pages/RegistrationSubmittedPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage";
import DoctorListPage from "./pages/admin/DoctorListPage";
import AdminApprovedDoctorsPage from "./pages/admin/AdminApprovedDoctorsPage";
import AdminPendingDoctorsPage from "./pages/admin/AdminPendingDoctorsPage";
import AdminRejectedDoctorsPage from "./pages/admin/AdminRejectedDoctorsPage";
import DoctorDetailsPage from "./pages/admin/DoctorDetailPage";
import AdminPatientsPage from "./pages/admin/AdminPatientsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Pages */}
        <Route path="/" element={<PageLayout><LandingPage /></PageLayout>} />
        <Route path="/about" element={<PageLayout><AboutUs /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><ContactUs /></PageLayout>} />
        <Route path="/alldoctors" element={<PageLayout><AllDoctors /></PageLayout>} />
        <Route path="/doctor-profile/:id" element={<PageLayout><DoctorProfile /></PageLayout>} />
        <Route path="/login" element={<PageLayout><LoginPage /></PageLayout>} />
        <Route path="/signup" element={<PageLayout><SignupPage /></PageLayout>} />

        {/* 👨‍⚕️ Doctor Registration Flow */}
        <Route path="/doctor/register" element={<DoctorRegistrationFlow />} />

        {/* 👨‍⚕️ Doctor Pages (with Sidebar) */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="registration-submitted" element={<RegistrationSubmittedPage />} />
          <Route path="dashboard" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorDashboard /></ProtectedRoute>} />
          <Route path="appointments" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorAppointmentsPage /></ProtectedRoute>} />
          <Route path="appointments/history" element={<ProtectedRoute allowedRoles={["doctor"]}><AppointmentHistory /></ProtectedRoute>} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* 🧑‍⚕️ Patient Pages */}
        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRoles={["patient"]}><PatientDashboard /></ProtectedRoute>
        } />
        <Route path="/myappointments" element={
          <ProtectedRoute allowedRoles={["patient"]}><MyAppointments /></ProtectedRoute>
        } />
        <Route path="/appointment-history" element={
          <ProtectedRoute allowedRoles={["patient"]}><AppointmentHistoryPage /></ProtectedRoute>
        } />

        {/* 🛠️ Admin Pages */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="appointments" element={<AdminAppointmentsPage />} />
          <Route path="doctors" element={<DoctorListPage />} />
          <Route path="doctors/approved" element={<AdminApprovedDoctorsPage />} />
          <Route path="doctors/pending" element={<AdminPendingDoctorsPage />} />
          <Route path="doctors/rejected" element={<AdminRejectedDoctorsPage />} />
          <Route path="doctors/:id" element={<DoctorDetailsPage />} />
          <Route path="patients" element={<AdminPatientsPage />} />
        </Route>

        {/* 🔁 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
