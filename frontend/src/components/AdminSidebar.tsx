import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiLogOut,
  FiUser, // 👤 Added for All Patients
} from "react-icons/fi";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path);

  const linkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 transition ${
      isActive(path)
        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-500"
        : "text-gray-700"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-indigo-700">CureBuddy</h1>
        </div>
        <span className="px-2 py-1 text-xs border rounded-full text-blue-600 border-blue-500">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 flex flex-col gap-2 text-sm">
        <Link to="/admin" className={linkClasses("/admin/dashboard")}>
          <FiHome className="text-xl" />
          Dashboard
        </Link>

        <Link to="/admin/appointments" className={linkClasses("/admin/appointments")}>
          <FiCalendar className="text-xl" />
          Appointments
        </Link>

        <Link to="/admin/patients" className={linkClasses("/admin/patients")}>
          <FiUser className="text-xl" />
          All Patients
        </Link>

        <Link to="/admin/doctors" className={linkClasses("/admin/doctors")}>
          <FiUsers className="text-xl" />
          All Doctors
        </Link>

        <Link to="/admin/doctors/approved" className={linkClasses("/admin/doctors/approved")}>
          <FiCheckCircle className="text-xl" />
          Approved Doctors
        </Link>

        <Link to="/admin/doctors/pending" className={linkClasses("/admin/doctors/pending")}>
          <FiClock className="text-xl" />
          Pending Doctors
        </Link>

        <Link to="/admin/doctors/rejected" className={linkClasses("/admin/doctors/rejected")}>
          <FiXCircle className="text-xl" />
          Rejected Doctors
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
