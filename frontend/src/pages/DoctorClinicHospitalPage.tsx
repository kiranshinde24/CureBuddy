// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDoctor } from "../context/DoctorContext";


// const DoctorClinicHospitalPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { doctorData, updateDoctorData } = useDoctor();

//   const [hospitalName, setHospitalName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");

//   useEffect(() => {
//     if (doctorData.hospitalName) setHospitalName(doctorData.hospitalName);
//     if (doctorData.address) setAddress(doctorData.address);
//     if (doctorData.city) setCity(doctorData.city);
//     if (doctorData.state) setState(doctorData.state);
//     if (doctorData.pincode) setPincode(doctorData.pincode);
//   }, [doctorData]);

//   const handleNext = () => {
//     if (!hospitalName || !address || !city || !state || !pincode) {
//       alert("Please fill all fields.");
//       return;
//     }

//     updateDoctorData({ hospitalName, address, city, state, pincode });
//     navigate("/consultation");
//   };

//   const handleBack = () => {
//     navigate("/professional");
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="flex flex-col flex-1 overflow-hidden">
        
//         <main className="p-6 overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Clinic / Hospital Info</h2>

//           <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Hospital / Clinic Name</label>
//                 <input
//                   type="text"
//                   value={hospitalName}
//                   onChange={(e) => setHospitalName(e.target.value)}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   placeholder="e.g. City Care Hospital"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">City</label>
//                 <input
//                   type="text"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">State</label>
//                 <input
//                   type="text"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Pincode</label>
//                 <input
//                   type="text"
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   required
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium mb-1">Address</label>
//                 <textarea
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   rows={3}
//                   required
//                 />
//               </div>
//             </form>

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={handleBack}
//               >
//                 ← Back
//               </button>
//               <button
//                 type="button"
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 onClick={handleNext}
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

// export default DoctorClinicHospitalPage;
// import React, { useState, useEffect } from "react";
// import { useDoctor } from "../context/DoctorContext";

// interface DoctorClinicHospitalPageProps {
//   onNext: () => void;
//   onBack: () => void;
// }

// const DoctorClinicHospitalPage: React.FC<DoctorClinicHospitalPageProps> = ({
//   onNext,
//   onBack,
// }) => {
//   const { doctorData, updateDoctorData } = useDoctor();

//   const [hospitalName, setHospitalName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");

//   useEffect(() => {
//     setHospitalName(doctorData.hospitalName || "");
//     setAddress(doctorData.address || "");
//     setCity(doctorData.city || "");
//     setState(doctorData.state || "");
//     setPincode(doctorData.pincode || "");
//   }, [doctorData]);

//   const handleNextClick = () => {
//     if (!hospitalName || !address || !city || !state || !pincode) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     updateDoctorData({ hospitalName, address, city, state, pincode });
//     onNext();
//   };

//   return (
//     <div className="flex flex-col flex-1 overflow-hidden">
//       <main className="p-6 overflow-y-auto">
//         <h2 className="text-2xl font-bold text-blue-800 mb-6">Clinic / Hospital Information</h2>

//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl">
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Hospital Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Hospital / Clinic Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={hospitalName}
//                 onChange={(e) => setHospitalName(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. City Care Hospital"
//               />
//             </div>

//             {/* City */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 City <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. Pune"
//               />
//             </div>

//             {/* State */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 State <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. Maharashtra"
//               />
//             </div>

//             {/* Pincode */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Pincode <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 maxLength={6}
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g. 411001"
//               />
//             </div>

//             {/* Address */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Address <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Full clinic/hospital address"
//               ></textarea>
//             </div>
//           </form>

//           {/* Buttons */}
//           <div className="flex justify-between mt-8">
//             <button
//               type="button"
//               onClick={onBack}
//               className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
//             >
//               ← Back
//             </button>
//             <button
//               type="button"
//               onClick={handleNextClick}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorClinicHospitalPage;

import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";

interface DoctorClinicHospitalPageProps {
  onNext: () => void;
  onBack: () => void;
}

const DoctorClinicHospitalPage: React.FC<DoctorClinicHospitalPageProps> = ({
  onNext,
  onBack,
}) => {
  const { doctorData, updateDoctorData } = useDoctor();

  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    setHospitalName(doctorData.hospitalName || "");
    setAddress(doctorData.address || "");
    setCity(doctorData.city || "");
    setState(doctorData.state || "");
    setPincode(doctorData.pincode || "");
  }, [doctorData]);

  const handleNextClick = () => {
    if (!hospitalName || !address || !city || !state || !pincode) {
      alert("Please fill all required fields.");
      return;
    }

    updateDoctorData({ hospitalName, address, city, state, pincode });
    onNext();
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <main className="p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Clinic / Hospital Information</h2>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Hospital / Clinic Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. City Care Hospital"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Pune"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Maharashtra"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 411001"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full clinic/hospital address"
              ></textarea>
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
            >
              ← Back
            </button>
            <button
              type="button"
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

export default DoctorClinicHospitalPage;
