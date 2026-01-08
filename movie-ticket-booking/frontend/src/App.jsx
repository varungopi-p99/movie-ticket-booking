import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Booking from "./pages/Bookings";
import BookingPage from "./pages/Bookingpage";
import Showtime from "./pages/Showtime";
import Seat from "./pages/Seat";
import Upcomming from "./pages/Upcomming";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upcomming/:movieId" element={<Upcomming />} />
        <Route path="/showtimes/:movieId" element={<Showtime />} />
        <Route path="/seats/:showtimeId" element={<Seat />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
