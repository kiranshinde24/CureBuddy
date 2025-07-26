import React, { useEffect, useState } from "react";

const DoctorAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // 🔹 Fetch doctor's appointments
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/doctor/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        setAppointments(data.data || []);
        setFiltered(data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 🔹 Filters: patient name or date
  useEffect(() => {
    let results = appointments;

    if (search.trim()) {
      results = results.filter((appt) =>
        appt.patientName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDate) {
      results = results.filter(
        (appt) =>
          new Date(appt.appointmentDate).toISOString().split("T")[0] === selectedDate
      );
    }

    setFiltered(results);
  }, [search, selectedDate, appointments]);

  // 🔹 Cancel handler
  const handleCancelAppointment = async (appointmentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Not logged in");

    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${appointmentId}/cancel-by-doctor`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // Update UI
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "Cancelled" } : appt
        )
      );
    } catch (error: any) {
      alert(error.message || "Failed to cancel appointment.");
    }
  };

  if (loading) return <p className="p-4">Loading appointments...</p>;
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
        My Appointments
      </h2>

      {/* 🔹 Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-full md:w-1/2"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-full md:w-1/3"
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

      {/* 🔹 Appointment List */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="divide-y divide-gray-200 rounded-md border bg-white shadow-sm">
          {filtered.map((appt, idx) => (
            <div key={idx} className="flex items-center justify-between p-4">
              <div>
                <p className="text-base font-semibold text-gray-800">
                  {appt.patientName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(appt.appointmentDate).toLocaleDateString()} at {appt.appointmentTime}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    appt.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {appt.status || "Scheduled"}
                </span>

                {appt.status !== "Completed" && appt.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelAppointment(appt._id)}
                    className="text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentsPage;
