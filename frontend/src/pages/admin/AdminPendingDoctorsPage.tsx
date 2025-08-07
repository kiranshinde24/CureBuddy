import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
}

const AdminPendingDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authorization token missing. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(${import.meta.env.VITE_API_URL}/api/admin/doctors, {
          headers: {
            Authorization: Bearer ${token},
          },
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch doctors");

        const pending = (data.data || []).filter(
          (doc: Doctor) => doc.status === "pending"
        );
        setDoctors(pending);
      } catch (err: any) {
        console.error("Failed to fetch pending doctors", err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingDoctors();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token missing. Please login again.");
      return;
    }

    try {
      const res = await fetch(${import.meta.env.VITE_API_URL}/api/doctors/${id}/${action}, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${token},
        },
      });

      const result = await res.json();

      if (result.success) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== id));
        toast.success(Doctor ${action === "approve" ? "approved" : "rejected"} successfully.);
      } else {
        toast.error(result.message || Failed to ${action} doctor.);
      }
    } catch {
      toast.error(Failed to ${action} doctor.);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = ${doc.name} ${doc.email} ${doc.gender}
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter ? doc.gender === genderFilter : true;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Pending Doctor Approvals</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email or gender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {(searchTerm || genderFilter) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setGenderFilter("");
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-gray-600 text-lg">Loading doctors...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-100 text-indigo-800 uppercase text-xs">
                <tr>
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Email</th>
                  <th className="p-4 border">Phone</th>
                  <th className="p-4 border">Gender</th>
                  <th className="p-4 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filteredDoctors.map((doctor, index) => (
                  <tr
                    key={doctor._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td
                      className="p-4 border text-indigo-600 font-medium cursor-pointer"
                      onClick={() => navigate(/admin/doctors/${doctor._id})}
                    >
                      {doctor.name}
                    </td>
                    <td className="p-4 border">{doctor.email}</td>
                    <td className="p-4 border">{doctor.phone || "N/A"}</td>
                    <td className="p-4 border">{doctor.gender}</td>
                    <td className="p-4 border text-center space-x-2">
                      <button
                        onClick={() => handleAction(doctor._id, "approve")}
                        className={`bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs ${
                          processingId === doctor._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={processingId === doctor._id}
                      >
                        {processingId === doctor._id ? "Processing..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleAction(doctor._id, "reject")}
                        className={`bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs ${
                          processingId === doctor._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={processingId === doctor._id}
                      >
                        {processingId === doctor._id ? "Processing..." : "Reject"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-500">
                      No pending doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPendingDoctorsPage;
