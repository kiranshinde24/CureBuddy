import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorList from "../../components/DoctorList";
import { Users, CheckCircle, Clock, XCircle, Search, Filter } from "lucide-react";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  status: "approved" | "pending" | "rejected";
}

const AdminDashboardPage: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token missing. Redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to load doctors");

        setAllDoctors(data.data || []);
      } catch (err: any) {
        console.error("Failed to fetch doctors", err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [navigate]);

  const totalDoctors = allDoctors.length;
  const pendingDoctors = allDoctors.filter((d) => d.status === "pending").length;
  const approvedDoctors = allDoctors.filter((d) => d.status === "approved").length;
  const rejectedDoctors = allDoctors.filter((d) => d.status === "rejected").length;

  const filteredDoctors = allDoctors
    .filter((doc) => filterStatus === "all" || doc.status === filterStatus)
    .filter((doc) =>
      `${doc.name} ${doc.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const StatCard = ({
    icon: Icon,
    title,
    count,
    color,
    onClick,
    isActive,
  }: {
    icon: React.ElementType;
    title: string;
    count: number;
    color: { bg: string; text: string };
    onClick: () => void;
    isActive: boolean;
  }) => (
    <div
      className={`group cursor-pointer bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border transition-all duration-300 transform hover:scale-105 ${
        isActive ? "ring-2 ring-indigo-500 border-indigo-200" : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${color.bg}`}>
            <Icon size={24} className={color.text} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <p className={`text-2xl font-bold ${color.text}`}>{count}</p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100">
          <div
            className={`w-2 h-2 rounded-full ${
              color.text === "text-indigo-600"
                ? "bg-indigo-600"
                : color.text === "text-yellow-600"
                ? "bg-yellow-500"
                : color.text === "text-green-600"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage and monitor doctor registrations</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium">
                {totalDoctors} Doctors
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
            <XCircle size={20} />
            <div>
              <h4 className="font-medium">Error</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Doctors"
            count={totalDoctors}
            color={{ bg: "bg-indigo-100", text: "text-indigo-600" }}
            onClick={() => setFilterStatus("all")}
            isActive={filterStatus === "all"}
          />
          <StatCard
            icon={Clock}
            title="Pending Review"
            count={pendingDoctors}
            color={{ bg: "bg-yellow-100", text: "text-yellow-600" }}
            onClick={() => setFilterStatus("pending")}
            isActive={filterStatus === "pending"}
          />
          <StatCard
            icon={CheckCircle}
            title="Approved"
            count={approvedDoctors}
            color={{ bg: "bg-green-100", text: "text-green-600" }}
            onClick={() => setFilterStatus("approved")}
            isActive={filterStatus === "approved"}
          />
          <StatCard
            icon={XCircle}
            title="Rejected"
            count={rejectedDoctors}
            color={{ bg: "bg-red-100", text: "text-red-500" }}
            onClick={() => setFilterStatus("rejected")}
            isActive={filterStatus === "rejected"}
          />
        </div>

        {/* Doctors Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="bg-indigo-600 px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Doctors Management</h2>
                <p className="text-indigo-100">
                  {filteredDoctors.length} of {totalDoctors} doctors shown
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Filter size={18} className="text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 px-4 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-w-[120px]"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Doctor List */}
          <div className="p-6">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No doctors have been registered yet"}
                </p>
              </div>
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
