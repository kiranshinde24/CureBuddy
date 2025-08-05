// // src/layout/DoctorLayout.tsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import DoctorRegSidebar from "../components/DoctorRegSidebar";

// const DoctorLayout: React.FC = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <DoctorRegSidebar />
//       <main className="flex-1 p-6 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DoctorLayout;
// import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DoctorDashboardSidebar from "../components/DoctorDashboardSidebar";
import Footer from "../components/LandingPage/Footer";

const DoctorLayout: React.FC = () => {
  const location = useLocation();

  const isRegistrationFlow =
    location.pathname.startsWith("/doctor/register") ||
    location.pathname === "/doctor/registration-submitted";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isRegistrationFlow ? (
        // DoctorRegistrationFlow already handles sidebar and layout
        <Outlet />
      ) : (
        <>
          <DoctorDashboardSidebar />
          <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default DoctorLayout;
