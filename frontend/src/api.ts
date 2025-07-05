const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Utility function to attach headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ========== API CALLS ==========

export const getAllDoctors = async () => {
  const res = await fetch(`${API_BASE}/api/admin/doctors`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return res.json();
};

// Add more APIs as needed using same pattern
// export const getPatients = async () => { ... }
// export const approveDoctor = async (id: string) => { ... }
