// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DoctorProvider } from "./context/DoctorContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ Add this import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap here */}
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </AuthProvider>
  </React.StrictMode>
);
