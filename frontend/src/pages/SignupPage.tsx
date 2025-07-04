// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!email) return setError("Please enter your email first.");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        alert("OTP sent successfully! Check your email.");
      } else {
        setError(data.message || "Error sending OTP.");
      }
    } catch {
      setError("Error contacting the server.");
    }
  };

  const verifyOtp = async () => {
    if (!email || !otp) return setError("Please enter OTP.");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setIsOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch {
      setError("Error verifying OTP.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !isOtpVerified) {
      return setError("Please verify your OTP before signing up.");
    }

    if (!fullName || !password || (role === "doctor" && !confirmPassword)) {
      return setError("Please fill all required fields.");
    }

    if (role === "doctor" && password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, otp, password, role }),
      });

      const data = await res.json();
      if (data.success) {
        // ✅ Save userId in localStorage for doctor
        if (role === "doctor") {
          localStorage.setItem("userId", data.user._id); // ensure backend sends user._id
        }

        alert(`Signup successful as ${role}. Redirecting...`);
        if (role === "doctor") {
          navigate("/doctor/register");
        } else {
          navigate("/login");
        }
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch {
      setError("Error contacting the server.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up as {role}</h2>

        {/* Role Switch */}
        <div className="flex justify-center mb-4 gap-4">
          <button
            onClick={() => setRole("patient")}
            className={`px-4 py-2 rounded ${role === "patient" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
          >
            Patient
          </button>
          <button
            onClick={() => setRole("doctor")}
            className={`px-4 py-2 rounded ${role === "doctor" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
          >
            Doctor
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="button" onClick={sendOtp} className="bg-indigo-500 text-white px-4 py-2 rounded w-full">
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {otpSent && (
            <button
              type="button"
              onClick={verifyOtp}
              className={`bg-yellow-500 text-white px-4 py-2 rounded w-full ${isOtpVerified ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isOtpVerified}
            >
              {isOtpVerified ? "OTP Verified ✅" : "Verify OTP"}
            </button>
          )}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {role === "doctor" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            className="bg-indigo-500 text-white w-full p-2 rounded font-semibold"
            disabled={!isOtpVerified}
          >
            {role === "doctor" ? "Next" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-indigo-500 underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
