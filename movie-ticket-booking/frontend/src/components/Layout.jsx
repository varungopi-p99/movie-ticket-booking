// import React from "react"
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
//       {/* Navbar at top */}
//       <Navbar />

//       {/* Page Content */}
//       <main className="flex-1">{children}</main>

//       <Footer />

//       {/* (Optional) Footer can be added here later */}
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from "../context/AuthContext"; 


const Layout = ({ children }) => {
  const location = useLocation();

  // ✅ Hide footer for seats and payment pages
  const hideFooter =
    location.pathname.startsWith("/seats") ||
    location.pathname.startsWith("/payment");

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      <AuthProvider>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* ✅ Footer appears only if NOT seat or payment pages */}
        {!hideFooter && <Footer />}
      </AuthProvider>
    </div>
  );
};

export default Layout;
