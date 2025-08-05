// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegistrationSubmittedPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(5);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);

//     if (countdown <= 0) {
//       navigate("/login");
//     }

//     return () => clearInterval(timer);
//   }, [countdown, navigate]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
//       <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Submitted ✅</h2>
//         <p className="text-gray-700 mb-6">
//           Thank you for submitting your profile. Our admin will review and approve your account shortly.
//         </p>
//         <p className="text-gray-500 mb-6">
//           Redirecting to login in {countdown} seconds...
//         </p>

//         <button
//           onClick={() => navigate("/login")}
//           className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
//         >
//           Go to Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RegistrationSubmittedPage;
// src/pages/RegistrationSubmittedPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationSubmittedPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown <= 0) {
      navigate("/login");
    }

    return () => clearInterval(timer); // clear timer on unmount or update
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Submitted ✅</h2>
        <p className="text-gray-700 mb-6">
          Thank you for submitting your profile. Our admin will review and approve your account shortly.
        </p>
        <p className="text-gray-500 mb-6">Redirecting to login in {countdown} seconds...</p>

        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSubmittedPage;
