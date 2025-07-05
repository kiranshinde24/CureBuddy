import React, { useEffect, useState } from "react";

interface Patient {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

const AdminPatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token missing.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/patients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        setPatients(data.data || []);
        setFiltered(data.data || []);
      })
      .catch((err: any) => {
        console.error(err);
        setError(err.message || "Something went wrong.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let results = patients;

    if (search.trim()) {
      results = results.filter(
        (p) =>
          p.fullName.toLowerCase().includes(search.toLowerCase()) ||
          p.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDate) {
      results = results.filter(
        (p) =>
          new Date(p.createdAt).toISOString().split("T")[0] === selectedDate
      );
    }

    setFiltered(results);
  }, [search, selectedDate, patients]);

  return (
    <main className="flex-1 bg-gray-100 p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">All Patients</h1>
          <p className="text-gray-500">
            Showing {filtered.length} of {patients.length} registered patients
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-64"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {(search || selectedDate) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedDate("");
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Registered On</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filtered.map((p, idx) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{p.fullName}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3">
                    {new Date(p.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminPatientsPage;
