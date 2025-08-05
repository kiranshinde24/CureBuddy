import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DoctorDashboardSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUsername(parsed.name || parsed.email || "Doctor");
      } catch {
        setUsername("Doctor");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isDropdownOpen]);

  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white border-b">
      {/* Brand */}
      <Link to="/" className="flex items-center space-x-2 cursor-pointer">
        <img src="/Logo.png" alt="CureBuddy Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold text-indigo-900">CureBuddy</h1>
      </Link>

      {/* Doctor Nav Links */}
      <nav className="flex items-center gap-8 text-base font-medium text-gray-800">
        <Link
          to="/doctor/dashboard"
          className={`hover:text-indigo-600 ${
            location.pathname === "/doctor/dashboard" ? "text-indigo-700" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/doctor/appointments"
          className={`hover:text-indigo-600 ${
            location.pathname === "/doctor/appointments" ? "text-indigo-700" : ""
          }`}
        >
          Upcoming
        </Link>
        <Link
          to="/doctor/appointments/history"
          className={`hover:text-indigo-600 ${
            location.pathname === "/doctor/appointments/history" ? "text-indigo-700" : ""
          }`}
        >
          History
        </Link>
      </nav>

      {/* Profile Dropdown */}
      <div className="relative user-dropdown">
        <button
          onClick={toggleDropdown}
          className="bg-indigo-100 text-indigo-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-200 transition"
        >
          Hi, {username}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <Link
              to="/doctor/dashboard"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/doctor/appointments"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Upcoming
            </Link>
            <Link
              to="/doctor/appointments/history"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              History
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DoctorDashboardSidebar;
