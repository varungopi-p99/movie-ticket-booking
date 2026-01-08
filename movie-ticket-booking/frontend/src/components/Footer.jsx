import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 py-8 flex flex-col items-center">
      
      {/* Brand */}
      <h2 className="text-white text-lg font-semibold mb-2">
        BookYourTickets
      </h2>

      {/* Links */}
      <div className="flex gap-6 text-sm mb-2">
        <Link to="/terms" className="hover:text-blue-400 transition">Terms & Privacy</Link>
        <Link to="/feedback" className="hover:text-blue-400 transition">Send Feedback</Link>
        <Link to="/help" className="hover:text-blue-400 transition">Help</Link>
      </div>

      {/* Copyright */}
      <p className="text-xs text-gray-500">
        {new Date().getFullYear()} BookYourTickets, Project. P99 Soft Sol.
      </p>

    </footer>
  );
};

export default Footer;
