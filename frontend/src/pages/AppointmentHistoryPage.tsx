import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PageLayout from "../layout/PageLayout";

interface Doctor {
  _id: string;
  name: string;
  profilePicture?: string;
  professionalInfo?: {
    specialization?: string;
  };
}

interface Appointment {
  _id: string;
  doctorId: Doctor;
  appointmentDate: string;
  appointmentTime: string;
  status?: string;
}

const AppointmentHistoryPage: React.FC = () => {
  const [history, setHistory] = useState<Appointment[]>([]);
  const token = localStorage.getItem("token");
  const userId = token ? (jwtDecode(token) as any).id : null;

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/appointments/patient/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const pastAppointments = res.data.appointments.filter((appt: Appointment) => {
            const apptDate = new Date(appt.appointmentDate);
            return apptDate < today;
          });

          setHistory(pastAppointments);
        } else {
          setHistory([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
        setHistory([]);
      });
  }, [userId, token]);

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Appointment History
        </h2>
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No past appointments.</p>
        ) : (
          history.map((a) => (
            <div
              key={a._id}
              className="flex items-center gap-4 border p-4 mb-4 rounded justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    a.doctorId?.profilePicture
                      ? `${import.meta.env.VITE_API_URL}/uploads/${a.doctorId.profilePicture}`
                      : "/default-doctor.jpg"
                  }
                  className="w-16 h-16 rounded-full object-cover"
                  alt="Doctor"
                  onError={(e) => {
                    e.currentTarget.src = "/default-doctor.jpg";
                  }}
                />
                <div>
                  <p className="font-semibold">
                    Dr. {a.doctorId?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {a.doctorId?.professionalInfo?.specialization || "Specialization N/A"}
                  </p>
                  <p className="text-sm">
                    {new Date(a.appointmentDate).toLocaleDateString()} &nbsp;|&nbsp;{" "}
                    {a.appointmentTime}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {a.status || "Completed"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default AppointmentHistoryPage;
