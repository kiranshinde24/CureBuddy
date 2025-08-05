import React from "react";
import { useNavigate } from "react-router-dom";

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/patient");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">👋 Patient Dashboard</h1>
      <p className="text-lg mb-8">Your personal health records and appointments appear here.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default PatientDashboard;
