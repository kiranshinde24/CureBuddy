import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"doctor" | "patient">("patient");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------------- LOGIN ---------------------
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (role === "patient") {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("token", data.token);
          const decoded: any = jwt_decode(data.token);
          if (decoded.role === "patient") {
            navigate("/patient/appointments");
          } else {
            navigate("/personal");
          }
        } else {
          alert(data.message);
        }
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("token", data.token);
          const decoded: any = jwt_decode(data.token);
          if (decoded.role === "doctor") {
            navigate("/personal");
          } else {
            navigate("/patient/appointments");
          }
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("OTP error:", error);
      alert("Something went wrong while sending OTP.");
    }
    setLoading(false);
  };

  // ---------------------- SIGNUP ---------------------
  const handleSignup = async () => {
    if (role === "doctor" && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        if (role === "doctor") {
          navigate("/personal");
        } else {
          navigate("/patient/appointments");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 font-semibold ${
              tab === "login"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold ${
              tab === "signup"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("signup")}
          >
            Signup
          </button>
        </div>

        {/* Common fields */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          className="w-full border rounded px-3 py-2 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value as "doctor" | "patient")}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {/* ================= Login ================= */}
        {tab === "login" && (
          <>
            {role === "doctor" ? (
              <>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2 mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            ) : (
              <>
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded mb-3 hover:bg-yellow-600 disabled:opacity-50"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
                <label className="block text-sm font-medium mb-1">OTP</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mb-4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </>
            )}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </>
        )}

        {/* ================= Signup ================= */}
        {tab === "signup" && (
          <>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-4"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {role === "doctor" && (
              <>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2 mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full border rounded px-3 py-2 mb-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            )}

            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
