// src/layouts/PageLayout.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Paths where we do NOT want the Footer
  const noFooterPaths = [
    "/about",
    "/contact",
    "/alldoctors",
    "/login",
    "/signup"
  ];
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-white">
      <Navbar />

      <main className="flex-grow">{children}</main>

      {showFooter ? <Footer /> : <div className="h-64"></div>}
    </div>
  );
};

export default PageLayout;
