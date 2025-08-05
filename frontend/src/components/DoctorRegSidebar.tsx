import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdContactPhone } from "react-icons/md";
import { FaUserEdit, FaHospitalAlt, FaFileAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const DoctorRegSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Personal & Contact Info", path: "/doctor/register", icon: <MdContactPhone /> },
    { label: "Professional Info", path: "/doctor/professional", icon: <FaUserEdit /> },
    { label: "Clinic & Hospital Info", path: "/doctor/clinic", icon: <FaHospitalAlt /> },
    { label: "Consultation Info", path: "/doctor/consultation", icon: <FaUserEdit /> },
    { label: "Documents", path: "/doctor/documents", icon: <FaFileAlt /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="CureBuddy" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-blue-700">CureBuddy</h1>
        </div>
        <span className="text-xs border border-blue-500 text-blue-700 px-2 py-1 rounded-full">
          Doctor Reg
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 text-sm">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path); 
          return (
            <Link to={item.path} key={item.path}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </div>
            </Link>
          );
        })}
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

export default DoctorRegSidebar;
