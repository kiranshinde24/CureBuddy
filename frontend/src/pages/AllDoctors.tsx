import React, { useState, useEffect } from "react";
import { fetchApprovedDoctors } from "../apis/doctorApi";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  profileImage?: string;
}

const AllDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await fetchApprovedDoctors();
      const mappedDoctors = data.map((doc: any) => ({
        _id: doc._id,
        fullName: doc.name,
        specialization: doc.professionalInfo?.specialization || "Not specified",
        profileImage: doc.profilePicture || undefined,
      }));
      setDoctors(mappedDoctors);
    };

    loadDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToDoctorProfile = (doctorId: string) => {
    navigate(`/doctor-profile/${doctorId}`);
  };

  return (
    <div className="bg-white px-6 py-10 text-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-8">All Doctors</h2>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => goToDoctorProfile(doctor._id)}
            className="cursor-pointer bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition text-center"
          >
            <img
              src={
                doctor.profileImage
                  ? `${import.meta.env.VITE_API_URL}/uploads/${doctor.profileImage}`
                  : "/default-doctor.jpg"
              }
              onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
              alt={doctor.fullName}
              className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No doctors found.</p>
        )}
      </div>

      <div className="mt-20 h-32"></div>
    </div>
  );
};

export default AllDoctors;
