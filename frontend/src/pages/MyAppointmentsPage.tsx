import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
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

const MyAppointmentsPage: React.FC = () => {
  const [list, setList] = useState<Appointment[]>([]);
  const token = localStorage.getItem("token");
  const userId = token ? (jwtDecode(token) as any).id : null;

  useEffect(() => {
    fetchAppointments();
  }, [userId, token]);

  const fetchAppointments = () => {
    if (!userId || !token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/appointments/patient/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          const futureAppointments = res.data.appointments.filter((a: Appointment) =>
            new Date(a.appointmentDate) >= new Date()
          );
          setList(futureAppointments);
        } else {
          setList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        toast.error("Failed to fetch appointments.");
        setList([]);
      });
  };

  const handleCancel = (appointmentId: string) => {
<<<<<<< HEAD
  toast((t) => (
    <div className="text-sm">
      <p className="font-semibold mb-2">
        Are you sure you want to cancel this appointment?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
        >
          No
        </button>
        <button
          onClick={async () => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/appointments/${appointmentId}/cancel-by-patient`,
      {}, // Important: Send an empty body since PUT requires one
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.success) {
      setList((prev) => prev.filter((a) => a._id !== appointmentId));
      toast.success("Appointment cancelled.");
    } else {
      toast.error("Failed to cancel appointment.");
    }
  } catch (error) {
    console.error("Cancel error:", error);
    toast.error("An error occurred while cancelling.");
  } finally {
    toast.dismiss(t.id); // This line assumes you’re inside a toast with t.id
  }
}}

          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
        >
          Yes, Cancel
        </button>
      </div>
    </div>
  ), { duration: 8000 });
};

=======
    toast((t) => (
      <div className="text-sm">
        <p className="font-semibold mb-2">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={async () => {
              try {
                const res = await axios.delete(
                  `${import.meta.env.VITE_API_URL}/api/appointments/${appointmentId}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                if (res.data.success) {
                  setList((prev) => prev.filter((a) => a._id !== appointmentId));
                  toast.success("Appointment cancelled.");
                } else {
                  toast.error("Failed to cancel appointment.");
                }
              } catch (error) {
                console.error("Cancel error:", error);
                toast.error("An error occurred while canceling.");
              } finally {
                toast.dismiss(t.id);
              }
            }}
            className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    ), { duration: 8000 });
  };
>>>>>>> 7ac95f55556aded38d8559b4718d6a22e76658cb

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow rounded">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">My Upcoming Appointments</h2>
          <Link to="/appointment-history" className="text-indigo-600 underline text-sm">
            View History →
          </Link>
        </div>
        {list.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming appointments.</p>
        ) : (
          list.map((a) => (
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
                  <p className="text-sm font-medium">
                    {a.status || "Scheduled"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCancel(a._id)}
                className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50 transition text-sm"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default MyAppointmentsPage;
