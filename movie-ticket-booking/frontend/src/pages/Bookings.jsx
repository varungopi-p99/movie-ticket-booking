// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Booking() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state) {
//     return (
//       <div className="text-white text-center mt-24 text-xl">
//         No booking data found.
//       </div>
//     );
//   }

//   const { movieInfo, selectedSeats, totalAmount } = state;

//   return (
//     <div className="min-h-screen pt-24 px-4 flex justify-center bg-[#080808] text-white">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-3xl bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
//       >
//         {/* ✅ SUCCESS BANNER */}
//         <motion.div
//           initial={{ scale: 0.7 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.4, type: "spring" }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
//             Booking Successful ✅
//           </h1>
//           <p className="text-gray-300 mt-2 text-sm">
//             Your tickets have been booked successfully
//           </p>
//         </motion.div>

//         {/* ✅ Movie Section */}
//         <div className="flex flex-col sm:flex-row gap-8 mb-10">
//           <img
//             src={movieInfo.image || "/placeholder.jpg"}
//             onError={(e) => (e.target.src = "/placeholder.jpg")}
//             alt="poster"
//             className="w-40 h-56 object-cover rounded-xl shadow-lg"
//           />

//           <div className="flex flex-col justify-center">
//             <h2 className="text-3xl font-bold">{movieInfo.movieName}</h2>
//             <p className="text-gray-300 mt-2 text-lg">
//               {movieInfo.theatre}
//             </p>

//             <div className="mt-3 text-gray-400">
//               <p>{movieInfo.date}</p>
//               <p>{movieInfo.showtime}</p>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Ticket Details Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-black/30 p-6 rounded-2xl border border-white/10 shadow-xl"
//         >
//           <h3 className="text-2xl font-semibold mb-4">Ticket Summary 🎟️</h3>

//           <div className="flex justify-between text-lg">
//             <p className="text-gray-300">Seats Selected:</p>
//             <p className="font-semibold">
//               {selectedSeats.map((s) => `${s.row}${s.col}`).join(", ")}
//             </p>
//           </div>

//           <div className="flex justify-between text-lg mt-3">
//             <p className="text-gray-300">Total Paid:</p>
//             <p className="font-bold text-green-400 text-xl">₹ {totalAmount}</p>
//           </div>
//         </motion.div>

//         {/* ✅ Buttons */}
//         <div className="flex justify-between mt-12">
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg"
//           >
//             Go Home
//           </button>

//           <button
//             onClick={() => navigate("/mybookings")}
//             className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-white font-semibold shadow-lg"
//           >
//             View My Bookings
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in (e.g., via localStorage token)
  const isLoggedIn = !!localStorage.getItem("token"); // replace "token" with your key

  if (!state) {
    return (
      <div className="text-white text-center mt-24 text-xl">
        No booking data found.
      </div>
    );
  }

  const { movieInfo, selectedSeats, totalAmount } = state;

  const handleViewBookings = () => {
    if (!isLoggedIn) {
      alert("Please sign in to view your bookings!");
      return;
    }
    navigate("/bookings"); // redirect to BookingPage.jsx
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex justify-center bg-[#080808] text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* ✅ SUCCESS BANNER */}
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Booking Successful ✅
          </h1>
          <p className="text-gray-300 mt-2 text-sm">
            Your tickets have been booked successfully
          </p>
        </motion.div>

        {/* ✅ Movie Section */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          <img
            src={movieInfo.image || "/placeholder.jpg"}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
            alt="poster"
            className="w-40 h-56 object-cover rounded-xl shadow-lg"
          />

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">{movieInfo.movieName}</h2>
            <p className="text-gray-300 mt-2 text-lg">{movieInfo.theatre}</p>

            <div className="mt-3 text-gray-400">
              <p>{movieInfo.date}</p>
              <p>{movieInfo.showtime}</p>
            </div>
          </div>
        </div>

        {/* ✅ Ticket Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 p-6 rounded-2xl border border-white/10 shadow-xl"
        >
          <h3 className="text-2xl font-semibold mb-4">Ticket Summary 🎟️</h3>

          <div className="flex justify-between text-lg">
            <p className="text-gray-300">Seats Selected:</p>
            <p className="font-semibold">
              {selectedSeats.map((s) => `${s.row}${s.col}`).join(", ")}
            </p>
          </div>

          <div className="flex justify-between text-lg mt-3">
            <p className="text-gray-300">Total Paid:</p>
            <p className="font-bold text-green-400 text-xl">₹ {totalAmount}</p>
          </div>
        </motion.div>

        {/* ✅ Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg"
          >
            Go Home
          </button>

          <button
            onClick={handleViewBookings}
            className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-white font-semibold shadow-lg"
          >
            View My Bookings
          </button>
        </div>
      </motion.div>
    </div>
  );
}
