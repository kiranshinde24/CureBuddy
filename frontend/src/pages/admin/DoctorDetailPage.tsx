import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/doctors/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        const data = await res.json();
        if (data.success) {
          setDoctor(data.data);
        } else {
          setError(data.message || "Doctor not found");
        }
      } catch (err) {
        setError("Failed to fetch doctor details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleStatusUpdate = async (status: "Approve" | "Reject") => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token missing.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/doctors/${id}/${status.toLowerCase()}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success(`Doctor ${status}d successfully`);
        navigate("/admin/doctors");
      } else {
        toast.error(result.message || `Failed to ${status.toLowerCase()} doctor.`);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${status.toLowerCase()} doctor.`);
    }
  };

  if (loading) return <div className="p-8 text-gray-600">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!doctor) return <div className="p-8 text-gray-600">Doctor not found.</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctor Profile</h2>

        {doctor.profilePicture && (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${doctor.profilePicture}`}
            alt="Doctor"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Personal Information</h3>
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
          <p><strong>Gender:</strong> {doctor.gender}</p>
          <p><strong>Birthday:</strong> {doctor.dob ? new Date(doctor.dob).toLocaleDateString() : "N/A"}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Professional Information</h3>
          <p><strong>Qualification:</strong> {doctor.professionalInfo?.qualification || "N/A"}</p>
          <p><strong>Specialization:</strong> {doctor.professionalInfo?.specialization || "N/A"}</p>
          <p><strong>Experience:</strong> {doctor.professionalInfo?.yearsOfExperience || "N/A"} years</p>
          <p><strong>License No:</strong> {doctor.professionalInfo?.licenseNo || "N/A"}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Clinic / Hospital Details</h3>
          <p><strong>Name:</strong> {doctor.hospitalInfo?.name || "N/A"}</p>
          <p><strong>City:</strong> {doctor.hospitalInfo?.city || "N/A"}</p>
          <p><strong>Address:</strong> {doctor.hospitalInfo?.address || "N/A"}</p>
          <p><strong>Pincode:</strong> {doctor.hospitalInfo?.pincode || "N/A"}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Consultation</h3>
          <p><strong>Fee:</strong> ₹{doctor.consultationInfo?.fee || "N/A"}</p>
          <p><strong>Available Days:</strong> {(doctor.consultationInfo?.availableDays || []).join(", ") || "N/A"}</p>
          <p><strong>Time Slots:</strong> {(doctor.consultationInfo?.availableTimeSlots || []).join(", ") || "N/A"}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Uploaded Documents</h3>
          {[
            { label: "Degree Certificate", key: "degreeCertificate" },
            { label: "Medical License", key: "medicalLicense" },
            { label: "ID Proof", key: "idProof" },
          ].map(({ label, key }) => (
            <p key={key}>
              <strong>{label}: </strong>
              {doctor.documents?.[key] ? (
                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${doctor.documents[key]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              ) : (
                <span className="text-gray-500">Not uploaded</span>
              )}
            </p>
          ))}
        </section>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => handleStatusUpdate("Approve")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate("Reject")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
