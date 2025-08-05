import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  professionalInfo?: {
    specialization?: string;
  };
}

const DoctorListPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token missing. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch doctors.");
        }

        setDoctors(data.data || []);
        setFiltered(data.data || []);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let results = doctors;

    if (search.trim()) {
      results = results.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.email.toLowerCase().includes(search.toLowerCase()) ||
          doc.professionalInfo?.specialization?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      results = results.filter((doc) => doc.status === statusFilter);
    }

    setFiltered(results);
  }, [search, statusFilter, doctors]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-indigo-700">All Doctors</h2>
            <p className="text-gray-500">
              Showing {filtered.length} of {doctors.length} doctors
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name/email/specialization"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-72"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            {(search || statusFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                }}
                className="text-sm text-red-500 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-gray-600 text-lg">Loading doctors...</div>
        ) : error ? (
          <div className="text-red-500 bg-red-100 p-4 rounded border border-red-300 mb-4">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Email</th>
                  <th className="p-4 border">Phone</th>
                  <th className="p-4 border">Specialization</th>
                  <th className="p-4 border">Status</th>
                  <th className="p-4 border">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filtered.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-gray-50">
                    <td className="p-4 border">{doctor.name}</td>
                    <td className="p-4 border">{doctor.email}</td>
                    <td className="p-4 border">{doctor.phone || "N/A"}</td>
                    <td className="p-4 border">
                      {doctor.professionalInfo?.specialization || "N/A"}
                    </td>
                    <td className="p-4 border">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          doctor.status.toLowerCase() === "approved"
                            ? "bg-green-100 text-green-800"
                            : doctor.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td className="p-4 border">
                      <button
                        onClick={() => navigate(`/admin/doctors/${doctor._id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      No doctors found.
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

export default DoctorListPage;
