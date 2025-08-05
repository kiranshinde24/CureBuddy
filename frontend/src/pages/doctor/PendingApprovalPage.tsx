import React from "react";

const PendingApprovalPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          Profile Under Review 🕒
        </h2>
        <p className="text-gray-700 mb-6">
          Your profile has been submitted and is currently under review by our
          admin team.
        </p>
        <p className="text-gray-500">Please check back later for updates.</p>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
