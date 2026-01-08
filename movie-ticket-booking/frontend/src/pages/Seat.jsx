import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import useWebSocket from "../hooks/useWebSocket";

export default function Seat() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  // Load seats initially
  useEffect(() => {
    const loadSeats = async () => {
      try {
        const res = await API.get(`/seats/showtimes/${showtimeId}`);
        setSeats(res.data.seats || []);

        // Movie + theatre
        setMovieInfo({
          movieName: res.data.movie_title,
          image: res.data.movie_image,
          theatre: res.data.theatre_name,
          date: new Date(res.data.start_time).toLocaleDateString(),
          showtime: new Date(res.data.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load seats");
      }
    };

    loadSeats();
  }, [showtimeId]);

  // WebSocket
  useWebSocket(`ws://52.200.176.69:8000/seats/ws/${showtimeId}`, (data) => {
    if (data.type === "update_seats") {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => {
          const updatedSeat = data.seats.find((s) => s.id === seat.id);
          return updatedSeat ? { ...seat, status: updatedSeat.status } : seat;
        })
      );
    }
  });

  // Toggle seats
  const toggleSeat = (seat) => {
    if (seat.status !== "available") return;

    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  // Book Now
  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: `/seats/${showtimeId}` } });
      return;
    }
    bookNow();
  };

  const bookNow = async () => {
    const seatIds = selectedSeats.map((s) => s.id);
    const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

    try {
      const res = await API.post("/bookings/", {
        seat_ids: seatIds,
        payment_amount: totalAmount,
        payment_status: "paid",
      });

      navigate("/booking", {
        state: {
          bookingInfo: res.data,
          movieInfo,
          selectedSeats,
          totalAmount,
          time: new Date().toLocaleString(),
        },
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Booking failed");
    }
  };

  // Loading states
  if (seats === null)
    return <div className="text-center mt-24 text-xl text-white">Loading...</div>;
  if (error)
    return <div className="text-center mt-24 text-xl text-red-500">{error}</div>;
  if (!Array.isArray(seats) || seats.length === 0)
    return <div className="text-center mt-24 text-xl text-gray-300">No seats available.</div>;

  // ✅ FIX: GLOBAL SORT — ALWAYS A,B,C,D,... NO MATTER WHAT
  const sortedSeats = [...seats].sort((a, b) => {
    if (a.row < b.row) return -1;
    if (a.row > b.row) return 1;
    return a.col - b.col;
  });

  // ✅ Group by type AFTER sorting alphabetically
  const seatsByType = sortedSeats.reduce((acc, seat) => {
    if (!acc[seat.type]) acc[seat.type] = {};
    if (!acc[seat.type][seat.row]) acc[seat.type][seat.row] = [];
    acc[seat.type][seat.row].push(seat);
    return acc;
  }, {});

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="mt-24 px-4 pb-40 text-white flex flex-col items-center">
      {/* Movie Info */}
      {movieInfo && (
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center gap-8 bg-[#0d0d0d] p-7 rounded-2xl shadow-xl mb-12 border border-gray-800">
          <img
            src={movieInfo.image?.trim() || "/placeholder.jpg"}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
            alt="poster"
            className="w-44 h-64 object-cover rounded-xl shadow-lg"
          />
          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-4xl font-extrabold tracking-wide">{movieInfo.movieName}</h1>
            <p className="text-lg opacity-80 mt-3">{movieInfo.theatre}</p>
            <p className="text-md opacity-70 mt-1">
              {movieInfo.date} • {movieInfo.showtime}
            </p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-semibold text-center mb-4 tracking-wide">
        Select Your Seats
      </h1>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        <Legend color="green" label="Available" />
        <Legend color="blue" label="Selected" />
        <Legend color="yellow" label="Reserved" />
        <Legend color="red" label="Booked" />
      </div>

      {/* Seats Layout */}
      <div className="w-full max-w-3xl flex flex-col items-center">
        {Object.keys(seatsByType).map((type) => (
          <div key={type} className="mb-12 w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-3 uppercase opacity-90 tracking-wide">
              {type} — ₹{Object.values(seatsByType[type])[0][0].price}
            </h2>

            <div className="flex flex-col gap-3 w-full items-center">
              {/* ✅ Rows ALWAYS COME IN ORDER A,B,C,... */}
              {Object.keys(seatsByType[type]).map((row) => (
                <div key={row} className="flex items-center gap-4 w-full justify-center">
                  <span className="w-8 text-center font-semibold">{row}</span>

                  <div className="flex gap-2 flex-nowrap overflow-x-auto no-scrollbar">
                    {seatsByType[type][row].map((seat) => {
                      const seatNumber = `${seat.row}${seat.col}`;
                      const isSelected = selectedSeats.find((s) => s.id === seat.id);

                      let colorClass = "";
                      if (seat.status === "booked") colorClass = "bg-red-600 border-red-700";
                      else if (seat.status === "reserved") colorClass = "bg-yellow-500 border-yellow-600";
                      else if (isSelected) colorClass = "bg-blue-500 border-blue-600";
                      else colorClass = "bg-green-600 border-green-700";

                      return (
                        <motion.button
                          key={seat.id}
                          onClick={() => toggleSeat(seat)}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-md text-xs flex items-center justify-center border font-medium ${colorClass}`}
                        >
                          {seatNumber}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 border-t border-gray-700 backdrop-blur-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col text-white text-center sm:text-left">
          {selectedSeats.length === 0 ? (
            <p className="opacity-70">No seats selected</p>
          ) : (
            <>
              <p className="font-semibold text-lg">{selectedSeats.length} Seat(s) Selected</p>
              <p className="text-sm opacity-80">
                {selectedSeats.map((s) => `${s.row}${s.col}`).join(", ")}
              </p>
            </>
          )}
        </div>

        <div className="text-white font-bold text-xl mt-4 sm:mt-0">₹ {totalAmount}</div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={handleBooking}
          className={`mt-4 sm:mt-0 px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition ${
            selectedSeats.length === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  const colorClass = {
    green: "bg-green-600 border-green-700",
    blue: "bg-blue-500 border-blue-600",
    yellow: "bg-yellow-500 border-yellow-600",
    red: "bg-red-600 border-red-700",
  }[color];

  return (
    <div className="flex items-center gap-2">
      <span className={`w-5 h-5 rounded-sm border ${colorClass}`}></span>
      <p className="text-sm opacity-80">{label}</p>
    </div>
  );
}
