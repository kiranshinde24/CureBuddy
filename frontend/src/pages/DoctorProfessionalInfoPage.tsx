import React, { useState } from "react";
import { useDoctor } from "../context/DoctorContext";

interface DoctorProfessionalInfoPageProps {
  onNext: () => void;
  onBack: () => void;
}

const DoctorProfessionalInfoPage: React.FC<DoctorProfessionalInfoPageProps> = ({
  onNext,
  onBack,
}) => {
  const { doctorData, updateDoctorData } = useDoctor();

  const [specialization, setSpecialization] = useState(doctorData.specialization || "");
  const [university, setUniversity] = useState(doctorData.university || "");
  const [qualification, setQualification] = useState(doctorData.qualification || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    doctorData.yearsOfExperience?.toString() || ""
  );
  const [licenseNo, setLicenseNo] = useState(doctorData.licenseNo || "");

  const handleNextClick = () => {
    if (!specialization || !university || !qualification || !yearsOfExperience || !licenseNo) {
      alert("Please fill in all required fields.");
      return;
    }

    updateDoctorData({
      specialization,
      university,
      qualification,
      yearsOfExperience: Number(yearsOfExperience),
      licenseNo,
    });

    onNext();
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <main className="p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Professional Information</h2>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specialization */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Specialization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Cardiology"
              />
            </div>

            {/* University */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Harvard Medical School"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. MBBS, MD"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 5"
              />
            </div>

            {/* License Number */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                License Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={licenseNo}
                onChange={(e) => setLicenseNo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter license number"
              />
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
              onClick={onBack}
            >
              ← Back
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={handleNextClick}
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfessionalInfoPage;
