// // DoctorPersonalInfoPage.tsx
// import React, { useState, ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import DoctorImageUpload from "../components/DoctorImageUpload";
// import { useDoctor } from "../context/DoctorContext";

// const DoctorPersonalInfoPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { updateDoctorData } = useDoctor();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [gender, setGender] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");

//   const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) setPhone(value);
//   };

//   const handleNext = () => {
//     updateDoctorData({ name, email, gender, dob, phone });
//     navigate("/professional");
//   };

//   return (
//     <div className="flex flex-col flex-1 overflow-hidden">
//       <main className="p-6 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Personal and Contact Info</h2>

//         <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
//           <DoctorImageUpload />

//           <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold mb-1">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 placeholder="Enter full name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-1">Phone No.</label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={handlePhoneChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 maxLength={10}
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-1">E-mail</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 placeholder="Enter email address"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-1">Gender</label>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
//               >
//                 <option value="" disabled>
//                   Select Gender
//                 </option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold mb-1">Date of Birth</label>
//               <input
//                 type="date"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>
//           </form>

//           <div className="mt-6 text-right">
//             <button
//               onClick={handleNext}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorPersonalInfoPage;
// // DoctorPersonalInfoPage.tsx
// import React, { useState, ChangeEvent } from "react";
// import DoctorImageUpload from "../components/DoctorImageUpload";
// import { useDoctor } from "../context/DoctorContext";

// interface DoctorPersonalInfoPageProps {
//   onNext: () => void;
//   onBack?: () => void;
// }

// const DoctorPersonalInfoPage: React.FC<DoctorPersonalInfoPageProps> = ({ onNext, onBack }) => {
//   const { updateDoctorData } = useDoctor();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [gender, setGender] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");

//   const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) setPhone(value);
//   };

//   const handleNext = () => {
//     // Save this page's data
//     updateDoctorData({ name, email, gender, dob, phone });

//     // Call the parent handler to go to next page
//     onNext();
//   };

//   return (
//     <div className="flex flex-col flex-1 overflow-hidden">
//       <main className="p-6 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Personal and Contact Info</h2>

//         <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
//           <DoctorImageUpload />

//           <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold mb-1">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 placeholder="Enter full name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-1">Phone No.</label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={handlePhoneChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 maxLength={10}
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-1">E-mail</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 placeholder="Enter email address"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-1">Gender</label>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
//               >
//                 <option value="" disabled>
//                   Select Gender
//                 </option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold mb-1">Date of Birth</label>
//               <input
//                 type="date"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>
//           </form>

//           <div className="mt-6 flex justify-between">
//             <button
//               onClick={onBack}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={handleNext}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// src/pages/DoctorPersonalInfoPage.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import DoctorImageUpload from "../components/DoctorImageUpload";
import { useDoctor } from "../context/DoctorContext";

interface DoctorPersonalInfoPageProps {
  onNext: () => void;
}

const DoctorPersonalInfoPage: React.FC<DoctorPersonalInfoPageProps> = ({ onNext }) => {
  const { doctorData, updateDoctorData } = useDoctor();

  const [name, setName] = useState(doctorData.name || "");
  const [email, setEmail] = useState(doctorData.email || "");
  const [gender, setGender] = useState(doctorData.gender || "");
  const [dob, setDob] = useState(doctorData.dob || "");
  const [phone, setPhone] = useState(doctorData.phone || "");

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPhone(value); // Allow only digits
  };

  const handleNextClick = () => {
    if (!name || !email || !gender || !dob || !phone) {
      alert("Please fill all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return;
    }

    updateDoctorData({ name, email, gender, dob, phone });
    onNext();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">👨‍⚕️ Personal & Contact Information</h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto border border-blue-100">
            <DoctorImageUpload />

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Dr. Aakash Mehta"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. dr.ak@example.com"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* DOB */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </form>

            {/* Next Button */}
            <div className="mt-8 text-right">
              <button
                type="button"
                onClick={handleNextClick}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 shadow-md transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorPersonalInfoPage;
