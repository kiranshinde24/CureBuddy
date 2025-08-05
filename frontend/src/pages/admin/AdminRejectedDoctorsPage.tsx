import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
}

const AdminRejectedDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token missing. Please login.");
      setLoading(false);
      return;
    }

    const fetchRejectedDoctors = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();

        const rejected = (data.data || []).filter(
          (doc: Doctor) => doc.status === "rejected"
        );

        setDoctors(rejected);
      } catch (err: any) {
        console.error("Failed to fetch rejected doctors", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    `${doc.name} ${doc.email}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genderFilter ? doc.gender === genderFilter : true)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Rejected Doctors</h1>
      <p className="text-gray-600 mb-4">{filteredDoctors.length} doctors found</p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400"
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
            className="text-sm text-blue-600 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-gray-500 text-lg">Loading rejected doctors...</div>
      ) : error ? (
        <div className="text-red-600 text-lg">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
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
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td
                    className="p-4 border text-blue-600 font-medium cursor-pointer"
                    onClick={() => navigate(`/admin/doctors/${doctor._id}`)}
                  >
                    {doctor.name}
                  </td>
                  <td className="p-4 border">{doctor.email}</td>
                  <td className="p-4 border">{doctor.phone}</td>
                  <td className="p-4 border">{doctor.gender}</td>
                  <td className="p-4 border">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Rejected
                    </span>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No rejected doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRejectedDoctorsPage;
