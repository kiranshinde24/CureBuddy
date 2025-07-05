import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface Appointment {
  _id: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
}

const PatientDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user?._id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/appointments/patient/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAppointments(res.data.appointments);
          }
        })
        .catch((err) => {
          console.error("Failed to load appointments:", err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to CureBuddy 👩‍⚕️</h1>
        <p className="text-gray-700 text-lg mb-6">This is your patient dashboard.</p>

        <div className="mb-6 space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-700 font-semibold">🔍 Browse doctors</p>
            <p className="text-sm text-gray-600">Find the best doctors based on your needs.</p>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="text-green-700 font-semibold">📅 Book appointments</p>
            <p className="text-sm text-gray-600">Manage and view your upcoming bookings.</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3">📋 Your Appointments</h2>

        {loading ? (
          <p className="text-gray-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className="border p-4 rounded-md shadow-sm bg-white"
              >
                <p className="text-lg font-semibold text-indigo-600">
                  Dr. {appointment.doctorName}
                </p>
                <p className="text-gray-700">
                  📅 {dayjs(appointment.appointmentDate).format("DD MMM YYYY")} | 🕒{" "}
                  {appointment.appointmentTime}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientDashboardPage;
