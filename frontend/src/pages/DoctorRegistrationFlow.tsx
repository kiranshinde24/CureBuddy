// src/pages/DoctorRegistrationFlow.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorPersonalInfoPage from "./DoctorPersonalInfoPage";
import DoctorProfessionalInfoPage from "./DoctorProfessionalInfoPage";
import DoctorClinicHospitalPage from "./DoctorClinicHospitalPage";
import DoctorConsultationPage from "./DoctorConsultationPage";
import DoctorDocumentUploadPage from "./DoctorDocumentUploadPage";
import { useDoctor } from "../context/DoctorContext";

const DoctorRegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { resetDoctorData } = useDoctor();

  useEffect(() => {
    resetDoctorData(); // Clear previous form data when registration starts
  }, []);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmitted = () => navigate("/doctor/registration-submitted");

  const steps = [
    "Personal & Contact Info",
    "Professional Info",
    "Clinic / Hospital Info",
    "Consultation Info",
    "Upload Documents",
  ];

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return <DoctorPersonalInfoPage onNext={handleNext} />;
      case 2:
        return <DoctorProfessionalInfoPage onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <DoctorClinicHospitalPage onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <DoctorConsultationPage onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <DoctorDocumentUploadPage onBack={handleBack} onSubmitted={handleSubmitted} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      {/* Sidebar Steps */}
      <aside className="w-72 bg-white shadow-md p-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-8 tracking-tight">Doctor Registration</h2>

        <ol className="space-y-5 text-sm">
          {steps.map((label, index) => {
            const current = index + 1;
            const isActive = current === step;
            const isCompleted = current < step;

            return (
              <li
                key={label}
                className={`flex items-start gap-3 transition-all ${
                  isActive
                    ? "text-blue-700 font-semibold"
                    : isCompleted
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                    isCompleted
                      ? "bg-blue-500 text-white border-blue-500"
                      : isActive
                      ? "bg-white border-blue-700 text-blue-700"
                      : "bg-gray-200 border-gray-300 text-gray-600"
                  }`}
                >
                  {isCompleted ? "✓" : current}
                </div>
                <span className="pt-0.5">{label}</span>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Form Step Area */}
      <main className="flex-1 p-8 bg-[#f9fbfe] overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          {renderFormStep()}
        </div>
      </main>
    </div>
  );
};

export default DoctorRegistrationFlow;
