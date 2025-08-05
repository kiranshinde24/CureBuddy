import React, { useEffect, useState } from "react";

const AppointmentHistory: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/doctor/summary`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setAppointments(data.data.history || []);
        setFiltered(data.data.history || []);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (token) fetchAppointments();
  }, [token]);

  useEffect(() => {
    let result = appointments;

    if (search.trim()) {
      result = result.filter((a) =>
        a.patientName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDate) {
      result = result.filter(
        (a) =>
          new Date(a.appointmentDate).toISOString().split("T")[0] ===
          selectedDate
      );
    }

    setFiltered(result);
  }, [search, selectedDate, appointments]);

  if (!token) return <p className="p-6">Please login to view appointment history.</p>;
  if (error) return <p className="text-red-600 p-6">{error}</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Appointment History
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/2 shadow-sm"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3 shadow-sm"
        />
      </div>

      {(search || selectedDate) && (
        <div className="text-right mb-4">
          <button
            onClick={() => {
              setSearch("");
              setSelectedDate("");
            }}
            className="text-sm text-red-500 underline hover:text-red-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No past appointments found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((appt, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center border border-gray-100 hover:shadow-md transition-all"
            >
              <div>
                <p className="text-lg font-medium">{appt.patientName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(appt.appointmentDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-sm text-gray-600">{appt.appointmentTime}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
