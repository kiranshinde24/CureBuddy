import React, { useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import { UploadCloud } from "lucide-react"; // Optional icon

interface DoctorDocumentUploadPageProps {
  onBack: () => void;
  onSubmitted: () => void;
}

const DoctorDocumentUploadPage: React.FC<DoctorDocumentUploadPageProps> = ({
  onBack,
  onSubmitted,
}) => {
  const { doctorData, updateDoctorData } = useDoctor();
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (field: keyof typeof doctorData, file: File | null) => {
    updateDoctorData({ [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please sign up again.");
      setSubmitting(false);
      return;
    }

    const requiredDocs: (keyof typeof doctorData)[] = [
      "profilePicture",
      "degreeCertificate",
      "medicalLicense",
      "idProof",
    ];

    const missingDocs = requiredDocs.filter((doc) => !doctorData[doc]);
    if (missingDocs.length > 0) {
      alert(
        `Please upload the following document(s): ${missingDocs
          .map((doc) => doc.replace(/([A-Z])/g, " $1"))
          .join(", ")}`
      );
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);

    for (const [key, value] of Object.entries(doctorData)) {
      if (value !== undefined && value !== null) {
        if (
          key === "profilePicture" ||
          key === "degreeCertificate" ||
          key === "medicalLicense" ||
          key === "idProof"
        ) {
          formData.append(key, value as File);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/doctors/register`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        onSubmitted();
      } else {
        alert(`Registration failed: ${result.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Error submitting registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const docFields = [
    { key: "profilePicture", label: "Profile Picture" },
    { key: "degreeCertificate", label: "Degree Certificate" },
    { key: "medicalLicense", label: "Medical License" },
    { key: "idProof", label: "Government ID Proof" },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFF]">
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">
          Upload Your Documents
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md max-w-3xl space-y-6"
        >
          {docFields.map(({ key, label }) => (
            <div key={key} className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {label} <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <UploadCloud className="text-blue-500" />
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) =>
                    handleFileChange(key as keyof typeof doctorData, e.target.files?.[0] || null)
                  }
                  className="w-full file:border-none file:rounded-md file:bg-blue-100 file:text-blue-700 file:px-4 file:py-2"
                />
              </div>
              
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 rounded text-white ${
                submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DoctorDocumentUploadPage;
