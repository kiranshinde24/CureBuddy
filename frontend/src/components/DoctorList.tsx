import React from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  professionalInfo?: {
    specialization?: string;
  };
}

interface Props {
  doctors: Doctor[];
}

const DoctorList: React.FC<Props> = ({ doctors }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const base = "inline-block px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case "approved":
        return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;
      case "pending":
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
      case "rejected":
        return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
    }
  };

  if (!Array.isArray(doctors)) {
    return <div className="text-red-600 p-4 text-center">⚠️ Invalid doctor data.</div>;
  }

  if (!doctors.length) {
    return <div className="text-gray-500 p-6 text-center border rounded bg-white shadow-sm">No matching doctors found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm text-left border border-gray-200 rounded-md shadow">
        <thead className="bg-blue-100 text-blue-700 uppercase text-xs">
          <tr>
            <th className="p-4 border">Name</th>
            <th className="p-4 border">Email</th>
            <th className="p-4 border">Phone</th>
            <th className="p-4 border">Specialization</th>
            <th className="p-4 border">Status</th>
            <th className="p-4 border text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {doctors.map((doctor, index) => (
            <tr
              key={doctor._id}
              className={`border-b transition duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
            >
              <td className="p-4 border">{doctor.name}</td>
              <td className="p-4 border">{doctor.email}</td>
              <td className="p-4 border">{doctor.phone || "N/A"}</td>
              <td className="p-4 border">{doctor.professionalInfo?.specialization || "N/A"}</td>
              <td className="p-4 border">{getStatusBadge(doctor.status)}</td>
              <td className="p-4 border text-center">
                <button
                  onClick={() => navigate(`/admin/doctors/${doctor._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-full transition-all duration-150 shadow-sm"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
