import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import { X } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    retype_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await API.post("/auth/signup", formData);
      setMessage("Account created successfully!");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Signup failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md rounded-2xl p-8 
                     bg-gradient-to-br from-white/10 to-white/5
                     backdrop-blur-xl border border-white/20
                     shadow-[0_0_25px_rgba(255,0,0,0.3)]"
        >
          {/* Close Button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            {/* First Name */}
            <div>
              <label className="block mb-1 text-gray-300">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-gray-300">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Retype Password */}
            <div>
              <label className="block mb-1 text-gray-300">Retype Password</label>
              <input
                type="password"
                name="retype_password"
                value={formData.retype_password}
                onChange={handleChange}
                className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Re-enter your password"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-xl font-medium transition shadow-[0_0_15px_rgba(255,0,0,0.4)] ${
                isSubmitting
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-700 hover:bg-red-800"
              }`}
            >
              {isSubmitting ? "Creating..." : "Sign Up"}
            </button>

            {/* Messages */}
            {message && (
              <p className="text-green-400 text-center font-medium">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}
          </form>

          {/* Redirect */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Already have an account?{" "}
            <span
              onClick={() => (window.location.href = "/login")}
              className="text-red-400 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SignUp;
