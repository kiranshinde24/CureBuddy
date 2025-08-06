import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";

const DoctorDashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/doctor/summary`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setSummary(data.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (token) fetchData();
    return () => clearInterval(timer);
  }, [token]);

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Please login to access your dashboard</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Preparing your appointment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 rounded-lg shadow-sm">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Today's Schedule</h1>
                <p className="text-gray-600">Your daily appointment overview</p>
              </div>
            </div>
            <div className="text-right bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Current Time</p>
              <p className="text-lg font-semibold text-indigo-600">{formatTime(currentTime)}</p>
              <p className="text-xs text-gray-600">{formatDate(currentTime)}</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              icon: <CalendarDays className="w-5 h-5 text-indigo-600" />,
              count: summary.today.length,
              title: "Today's Appointments",
              subtitle: "Active schedule for today",
            },
            {
              icon: <Users className="w-5 h-5 text-indigo-600" />,
              count: summary.upcoming.length,
              title: "Upcoming This Week",
              subtitle: "Future appointments",
            },
            {
              icon: <CheckCircle className="w-5 h-5 text-indigo-600" />,
              count: summary.history.length,
              title: "Completed",
              subtitle: "Successfully finished",
            },
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg">{card.icon}</div>
                <span className="text-xl font-bold text-indigo-600">{card.count}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{card.title}</h3>
              <p className="text-xs text-gray-600">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[{ type: "today", title: "Today's Appointments", icon: <CalendarDays className="w-5 h-5" /> },
            { type: "upcoming", title: "Upcoming Appointments", icon: <Users className="w-5 h-5" /> }
          ].map((section, idx) => {
            const appointments = summary[section.type].filter((a: any) => a.status !== "Cancelled");
            return (
              <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-indigo-600 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <div>
                        <h2 className="text-lg font-bold">{section.title}</h2>
                        <p className="text-indigo-100 text-sm">{appointments.length} patients</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{formatTime(currentTime)}</p>
                      <p className="text-indigo-100 text-xs">Live Time</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <Calendar className="w-12 h-12 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No Appointments</h3>
                      <p className="text-sm">You're all set!</p>
                    </div>
                  ) : (
                    <div className={`grid ${section.type === "today" ? "grid-cols-1 md:grid-cols-2" : "space-y-3"}`}>
                      {appointments.map((appointment: any, index: number) => (
                        <div key={index} className="group p-4 bg-gray-50 rounded-lg border hover:border-indigo-300 hover:shadow-sm transition-all duration-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-indigo-200 rounded-lg flex items-center justify-center group-hover:bg-indigo-300 transition-colors">
                              <User className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-800">{appointment.patientName}</h3>
                              <p className="text-xs text-gray-600">Patient Consultation</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-semibold text-indigo-600">{appointment.appointmentTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Practice Summary</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-indigo-600 mx-auto mb-2" />,
                value: summary.today.length + summary.upcoming.length,
                label: "Active Appointments",
              },
              {
                icon: <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />,
                value: `${Math.round(
                  (summary.history.length /
                    (summary.today.length + summary.upcoming.length + summary.history.length)) * 100
                )}%`,
                label: "Completion Rate",
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-indigo-600 mx-auto mb-2" />,
                value: Math.ceil(
                  (summary.today.length + summary.upcoming.length + summary.history.length) / 7
                ),
                label: "Daily Average",
              },
              {
                icon: <Stethoscope className="w-6 h-6 text-indigo-600 mx-auto mb-2" />,
                value: summary.today.length + summary.upcoming.length + summary.history.length,
                label: "Total Appointments",
              },
            ].map((card, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                {card.icon}
                <p className="text-lg font-bold text-indigo-600 mb-1">{card.value}</p>
                <p className="text-xs text-gray-600 font-medium">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
