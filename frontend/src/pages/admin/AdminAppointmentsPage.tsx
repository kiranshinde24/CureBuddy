import React, { useEffect, useState } from "react";

interface Appointment {
  _id: string;
  doctorName: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
}

const AdminAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token is missing.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to fetch appointments");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAppointments(data.data);
          setFiltered(data.data);
        } else {
          throw new Error(data.message || "Unexpected response format");
        }
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError(err.message || "Failed to load appointments");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let results = appointments;

    if (search.trim()) {
      results = results.filter(
        (a) =>
          a.patientName.toLowerCase().includes(search.toLowerCase()) ||
          a.doctorName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDate) {
      results = results.filter(
        (a) =>
          new Date(a.appointmentDate).toISOString().split("T")[0] === selectedDate
      );
    }

    setFiltered(results);
  }, [search, selectedDate, appointments]);

  return (
    <main className="flex-1 bg-gray-100 p-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">All Appointments</h1>
          <p className="text-gray-500">
            Showing {filtered.length} of {appointments.length} appointments
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by patient/doctor"
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
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filtered.map((appt, index) => (
                <tr key={appt._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{appt.patientName}</td>
                  <td className="p-3">{appt.doctorName}</td>
                  <td className="p-3">
  {appt.appointmentDate
    ? new Date(appt.appointmentDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A"}
</td>

                  <td className="p-3">{appt.appointmentTime || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminAppointmentsPage;
