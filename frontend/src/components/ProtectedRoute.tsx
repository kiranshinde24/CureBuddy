// // ProtectedRoute.tsx
// import React, { ReactNode } from "react";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedRoles: string[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // Fetch the role you saved at login
  
//   if (!token) {
//     // No token? Send them to login
//     return <Navigate to="/login" replace />;
//   }

//   if (role && !allowedRoles.includes(role)) {
//     // Role not allowed for this route — send them to their dashboard or login
//     switch (role) {
//       case "admin":
//         return <Navigate to="/admin/dashboard" replace />;
//       case "doctor":
//         return <Navigate to="/doctor/dashboard" replace />;
//       case "patient":
//         return <Navigate to="/patient/dashboard" replace />;
//       default:
//         return <Navigate to="/login" replace />;
//     }
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    switch (role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "doctor":
        return <Navigate to="/doctor" replace />;
      case "patient":
        return <Navigate to="/patient/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
