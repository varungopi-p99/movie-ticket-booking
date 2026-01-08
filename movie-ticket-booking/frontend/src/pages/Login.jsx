// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import API from "../api/api";

// const Login = ({ onClose }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const form = new URLSearchParams();
//       form.append("username", formData.email);
//       form.append("password", formData.password);

//       const response = await API.post("/auth/login", form, {
//         headers: { "content-Type": "application/x-www-form-urlencoded" },
//       });

//       setMessage("Login successful!");

//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       setTimeout(() => {
//         if (onClose) onClose();
//         navigate(from, { replace: true });
//       }, 800);
//     } catch (err) {
//       setMessage(err.response?.data?.detail || "Invalid email or password");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate(from, { replace: true });
//   }, [navigate, from]);

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         <motion.div
//           onClick={(e) => e.stopPropagation()}
//           initial={{ scale: 0.85, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.85, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="relative w-full max-w-md rounded-2xl p-8 
//                      bg-gradient-to-br from-white/10 to-white/5
//                      backdrop-blur-xl border border-white/20
//                      shadow-[0_0_25px_rgba(255,0,0,0.3)]"
//         >
//           {/* Close Button */}
//           <button
//             onClick={() => (window.location.href = "/")}
//             className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl font-bold"
//           >
//             ×
//           </button>

//           <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
//             Sign In
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block mb-1 text-gray-300">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
//                            focus:outline-none focus:ring-2 focus:ring-red-600"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block mb-1 text-gray-300">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full bg-black/40 text-white border border-white/20 px-4 py-2 rounded-xl
//                            focus:outline-none focus:ring-2 focus:ring-red-600"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-xl 
//                          transition-all duration-200 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
//             >
//               Sign In
//             </button>

//             {message && (
//               <p className="text-center mt-4 text-gray-300">{message}</p>
//             )}
//           </form>

//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-400">
//               Don’t have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-red-400 font-semibold hover:underline"
//                 onClick={onClose}
//               >
//                 Create new account
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { user, login } = useAuth();

  // ✅ If already logged in, close popup
  useEffect(() => {
    if (user) onClose?.();
  }, [user, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const form = new URLSearchParams();
      form.append("username", formData.email);
      form.append("password", formData.password);

      const response = await API.post("/auth/login", form, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });

      // ✅ Call AuthContext login
      login(response.data.access_token, response.data.user);

      setMessage("Login successful!");

      setTimeout(() => {
        onClose?.();
        navigate(from, { replace: true });
      }, 500);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md rounded-2xl p-8 
                     bg-gradient-to-br from-white/10 to-white/5
                     backdrop-blur-xl border border-white/20
                     shadow-[0_0_25px_rgba(255,0,0,0.3)]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl font-bold"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
            Sign In
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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

            <div className="mb-6">
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

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-xl 
                         transition-all duration-200 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
            >
              Sign In
            </button>

            {message && (
              <p className="text-center mt-4 text-gray-300">{message}</p>
            )}
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-red-400 font-semibold hover:underline"
                onClick={onClose}
              >
                Create new account
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
