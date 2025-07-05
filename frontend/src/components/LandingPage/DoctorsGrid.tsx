import React, { useState, useEffect } from "react";
import { fetchApprovedDoctors } from "../../apis/doctorApi";
import { useNavigate } from "react-router-dom";

// Doctor type
interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  profileImage?: string;
}

// Card component
const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 text-center transform transition-transform hover:scale-105 hover:shadow-lg duration-300">
    <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">
      <img
        src={
          doctor.profileImage
            ? `${import.meta.env.VITE_API_URL}/uploads/${doctor.profileImage}`
            : "/default-doctor.jpg"
        }
        onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
        alt={doctor.fullName}
        className="w-20 h-20 object-cover rounded-full"
      />
    </div>
    <h4 className="font-semibold text-gray-900 mt-4">{doctor.fullName}</h4>
    <p className="text-sm text-indigo-600 mt-1">{doctor.specialization}</p>
  </div>
);

// Grid with Show More
const DoctorsGrid = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
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

  const visibleDoctors = doctors.slice(0, visibleCount);
  const hasMore = visibleCount < doctors.length;

  return (
    <section className="py-10 px-4">
      <h3 className="text-center text-2xl font-bold mb-2">Top Doctors to Book</h3>
      <p className="text-center text-sm text-gray-500 mb-6">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {visibleDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/doctor-profile/${doctor._id}`)}
            className="cursor-pointer"
          >
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            className="bg-indigo-100 text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-200 transition"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Show More
          </button>
        </div>
      )}

      <div className="h-16"></div>
    </section>
  );
};

export default DoctorsGrid;
