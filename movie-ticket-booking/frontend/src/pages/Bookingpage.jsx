import React, { useEffect, useState } from "react";
import API from "../api/api";
import useWebSocket from "../hooks/useWebSocket";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingBooking, setCancelingBooking] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Fetch bookings from backend
  const fetchBookings = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      setLoading(false);
      return;
    }

    try {
      const response = await API.get("/bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // WebSocket for live booking updates
  useWebSocket("ws://52.200.176.69:8000/bookings/ws/{showtime_id}", (data) => {
    // Backend should send: { type: 'new_booking'/'cancel_booking', booking: {...} }
    if (data.type === "new_booking") {
      setBookings((prev) => [...prev, data.booking]);
    } else if (data.type === "cancel_booking") {
      setBookings((prev) => prev.filter((b) => b.id !== data.booking.id));
    }
  });

  // Cancel a booking
  const handleCancelBooking = async (bookingId) => {
    try {
      await API.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking canceled successfully!");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-white text-xl">Loading...</div>;

  if (showLoginPrompt)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
          <h2 className="text-xl font-bold mb-4">Please Sign In</h2>
          <p>You need to be logged in to view your bookings.</p>
        </div>
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="text-center mt-10 text-white text-xl">
        You have no bookings yet.
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Your Bookings
      </h2>

      <div className="flex flex-col gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col md:flex-row border rounded-2xl shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm"
          >
            {/* Movie Poster */}
            <div className="w-full md:w-32 flex-shrink-0">
              <img
                src={booking.movie_image || "/placeholder.jpg"}
                alt={booking.movie_title}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ticket Details */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{booking.movie_title}</h3>
                <p className="text-gray-300 text-sm">Theatre: {booking.theatre_name}</p>
                <p className="text-gray-300 text-sm">
                  Date: {new Date(booking.start_time).toLocaleDateString()}
                </p>
                <p className="text-gray-300 text-sm">
                  Showtime:{" "}
                  {new Date(booking.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-gray-300 text-sm">Seats: {booking.seats.join(", ")}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Booked on: {new Date(booking.booked_at).toLocaleString()}
                </p>
              </div>

              {/* Cancel Button */}
              <div className="mt-3">
                <button
                  onClick={() => setCancelingBooking(booking)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Booking Modal */}
      {cancelingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Cancel Booking</h3>
            <p className="text-gray-700">
              Are you sure you want to cancel your booking for{" "}
              <strong>{cancelingBooking.movie_title}</strong>?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setCancelingBooking(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleCancelBooking(cancelingBooking.id);
                  setCancelingBooking(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
