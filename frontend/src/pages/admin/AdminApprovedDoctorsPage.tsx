import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  status: string;
}

const AdminApprovedDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    const fetchApprovedDoctors = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();

        if (!data.success) throw new Error(data.message || "Failed to load doctors");

        const approved = (data.data || []).filter(
          (doc: Doctor) => doc.status === "approved"
        );

        setDoctors(approved);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedDoctors();
  }, [navigate]);

  const filteredDoctors = doctors.filter((doc) => {
    const matchSearch = `${doc.name || ""} ${doc.email || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchGender = genderFilter ? doc.gender === genderFilter : true;
    return matchSearch && matchGender;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Approved Doctors</h1>
        <p className="text-gray-600 mb-4">{filteredDoctors.length} doctors found</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
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

        {/* Main Content */}
        {loading ? (
          <div className="text-gray-500 text-lg">Loading approved doctors...</div>
        ) : error ? (
          <div className="text-red-500 text-lg">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-100 text-indigo-800 uppercase text-xs">
                <tr>
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Email</th>
                  <th className="p-4 border">Phone</th>
                  <th className="p-4 border">Gender</th>
                  <th className="p-4 border">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredDoctors.map((doctor, index) => (
                  <tr
                    key={doctor._id}
                    className={`border-b transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50`}
                  >
                    <td
                      className="p-4 font-medium text-indigo-600 cursor-pointer border"
                      onClick={() => navigate(`/admin/doctors/${doctor._id}`)}
                    >
                      {doctor.name || "N/A"}
                    </td>
                    <td className="p-4 border">{doctor.email || "N/A"}</td>
                    <td className="p-4 border">{doctor.phone || "N/A"}</td>
                    <td className="p-4 border">{doctor.gender || "N/A"}</td>
                    <td className="p-4 border">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-500">
                      No approved doctors found.
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

export default AdminApprovedDoctorsPage;
