// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDoctor } from "../context/DoctorContext";

// const DoctorConsultationPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { doctorData, updateDoctorData } = useDoctor();

//   const [fee, setFee] = useState<number>(0);
//   const [availableDays, setAvailableDays] = useState<string[]>([]);
//   const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const timeOptions = ["9:00 am", "10:00 am", "11:00 am", "2:00 pm", "4:00 pm", "6:00 pm"];

//   // Load previous state if present
//   useEffect(() => {
//     if (doctorData.fee) setFee(doctorData.fee);
//     if (doctorData.availableDays) setAvailableDays(doctorData.availableDays);
//     if (doctorData.availableTimeSlots) setAvailableTimeSlots(doctorData.availableTimeSlots);
//   }, [doctorData]);

//   const toggleDay = (day: string) => {
//     setAvailableDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   const toggleTime = (time: string) => {
//     setAvailableTimeSlots((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleNext = () => {
//     if (!fee || availableDays.length === 0 || availableTimeSlots.length === 0) {
//       alert("Please fill all fields before proceeding.");
//       return;
//     }

//     updateDoctorData({ fee, availableDays, availableTimeSlots });
//     navigate("/documents");
//   };

//   const handleBack = () => {
//     navigate("/clinic");
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="flex flex-col flex-1 overflow-hidden">
      
//         <main className="p-6 overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Consultation Details</h2>

//           <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
//             <form className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Consultation Fee (₹)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={fee}
//                   onChange={(e) => setFee(Number(e.target.value))}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   placeholder="Enter fee in INR"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Available Days</label>
//                 <div className="flex flex-wrap gap-2">
//                   {daysOfWeek.map((day) => (
//                     <button
//                       type="button"
//                       key={day}
//                       onClick={() => toggleDay(day)}
//                       className={`px-3 py-1 rounded border ${
//                         availableDays.includes(day)
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-200 text-gray-700"
//                       }`}
//                     >
//                       {day}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Available Time Slots</label>
//                 <div className="flex flex-wrap gap-2">
//                   {timeOptions.map((time) => (
//                     <button
//                       type="button"
//                       key={time}
//                       onClick={() => toggleTime(time)}
//                       className={`px-3 py-1 rounded border ${
//                         availableTimeSlots.includes(time)
//                           ? "bg-green-600 text-white"
//                           : "bg-gray-200 text-gray-700"
//                       }`}
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </form>

//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={handleBack}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
//               >
//                 ← Back
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// src/pages/DoctorConsultationPage.tsx
// import React, { useState, useEffect } from "react";
// import { useDoctor } from "../context/DoctorContext";

// interface DoctorConsultationPageProps {
//   onNext: () => void;
//   onBack: () => void;
// }

// const DoctorConsultationPage: React.FC<DoctorConsultationPageProps> = ({
//   onNext,
//   onBack,
// }) => {
//   const { doctorData, updateDoctorData } = useDoctor();

//   const [fee, setFee] = useState<number>(0);
//   const [availableDays, setAvailableDays] = useState<string[]>([]);
//   const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const timeOptions = ["9:00 am", "10:00 am", "11:00 am", "2:00 pm", "4:00 pm", "6:00 pm"];

//   useEffect(() => {
//     if (doctorData.fee) setFee(doctorData.fee);
//     if (Array.isArray(doctorData.availableDays)) setAvailableDays(doctorData.availableDays);
//     if (Array.isArray(doctorData.availableTimeSlots))
//       setAvailableTimeSlots(doctorData.availableTimeSlots);
//   }, [doctorData]);

//   const toggleDay = (day: string) => {
//     setAvailableDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   const toggleTime = (time: string) => {
//     setAvailableTimeSlots((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleNextClick = () => {
//     if (!fee || availableDays.length === 0 || availableTimeSlots.length === 0) {
//       alert("Please fill in consultation fee, available days, and time slots.");
//       return;
//     }

//     updateDoctorData({ fee, availableDays, availableTimeSlots });
//     onNext();
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <main className="p-6 overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Consultation Details</h2>

//           <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
//             <form className="space-y-6">
//               {/* Consultation Fee */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Consultation Fee (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={fee}
//                   onChange={(e) => setFee(Number(e.target.value))}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   placeholder="Enter fee in INR"
//                 />
//               </div>

//               {/* Available Days */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Available Days <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {daysOfWeek.map((day) => (
//                     <button
//                       key={day}
//                       type="button"
//                       onClick={() => toggleDay(day)}
//                       className={`px-3 py-1 rounded border ${
//                         availableDays.includes(day)
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-200 text-gray-700"
//                       }`}
//                     >
//                       {day}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Available Time Slots */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Available Time Slots <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {timeOptions.map((time) => (
//                     <button
//                       key={time}
//                       type="button"
//                       onClick={() => toggleTime(time)}
//                       className={`px-3 py-1 rounded border ${
//                         availableTimeSlots.includes(time)
//                           ? "bg-green-600 text-white"
//                           : "bg-gray-200 text-gray-700"
//                       }`}
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </form>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={onBack}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
//               >
//                 ← Back
//               </button>
//               <button
//                 onClick={handleNextClick}
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorConsultationPage;


import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";

interface DoctorConsultationPageProps {
  onNext: () => void;
  onBack: () => void;
}

const DoctorConsultationPage: React.FC<DoctorConsultationPageProps> = ({
  onNext,
  onBack,
}) => {
  const { doctorData, updateDoctorData } = useDoctor();

  const [fee, setFee] = useState<number>(0);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeOptions = ["9:00 am", "10:00 am", "11:00 am", "2:00 pm", "4:00 pm", "6:00 pm"];

  useEffect(() => {
    if (doctorData.fee) setFee(doctorData.fee);
    if (Array.isArray(doctorData.availableDays)) setAvailableDays(doctorData.availableDays);
    if (Array.isArray(doctorData.availableTimeSlots)) setAvailableTimeSlots(doctorData.availableTimeSlots);
  }, [doctorData]);

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTime = (time: string) => {
    setAvailableTimeSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleNextClick = () => {
    if (!fee || availableDays.length === 0 || availableTimeSlots.length === 0) {
      alert("Please fill in consultation fee, available days, and time slots.");
      return;
    }

    updateDoctorData({ fee, availableDays, availableTimeSlots });
    onNext();
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <main className="p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Consultation Details</h2>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl">
          <form className="space-y-6">
            {/* Fee */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Consultation Fee (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter fee in INR"
              />
            </div>

            {/* Days */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Available Days <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-1.5 rounded-full border font-medium transition ${
                      availableDays.includes(day)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Available Time Slots <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleTime(time)}
                    className={`px-4 py-1.5 rounded-full border font-medium transition ${
                      availableTimeSlots.includes(time)
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
            >
              ← Back
            </button>
            <button
              onClick={handleNextClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorConsultationPage;


