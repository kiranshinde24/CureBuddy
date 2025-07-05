// src/pages/PatientAppointmentsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user?._id && token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/appointments/patient/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) setAppointments(res.data.appointments);
        });
    }
  }, [user, token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        appointments.map((a) => (
          <div
            key={a._id}
            className="border p-4 rounded shadow mb-4 bg-white space-y-1"
          >
            <p className="font-semibold">Doctor: {a.doctorName}</p>
            <p>Date: {a.appointmentDate}</p>
            <p>Time: {a.appointmentTime}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientAppointmentsPage;
