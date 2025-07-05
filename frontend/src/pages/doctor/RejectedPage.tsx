import React from "react";

const RejectedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full border border-red-300">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Application Rejected ❌</h2>
        <p className="text-gray-700 mb-4">
          We regret to inform you that your profile has been rejected by our admin team.
        </p>
        <p className="text-gray-600 mb-6">
          This may be due to incomplete or incorrect information submitted.
          You can reach out to our support team or try registering again later.
        </p>
        <button
          onClick={() => window.location.href = "/auth"}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default RejectedPage;
