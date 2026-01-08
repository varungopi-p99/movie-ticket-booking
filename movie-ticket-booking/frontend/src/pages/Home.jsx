
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import API from "../api/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [streaming, setStreaming] = useState([]);
  const [upComming, setUpComming] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/movies");
        setMovies(res.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    API.get("/movies/streaming").then((res) => setStreaming(res.data));
    API.get("/movies/upcoming").then((res) => setUpComming(res.data));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (movies.length > 0) {
        setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, movies]);

  const MovieCard = ({ movie }) => (
    <div
      className="w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transform hover:scale-105 transition"
      onClick={() => navigate(`/showtimes/${movie.id}`)}
    >
      <img
        src={movie.image_url}
        className="w-full h-56 object-cover rounded-lg"
        alt={movie.title}
      />
      <p className="text-white mt-2 text-sm opacity-80">{movie.title}</p>
    </div>
  );

  const UpcommingCard = ({ movie }) => (
    <div
      className="w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transform hover:scale-105 transition"
      onClick={() => navigate(`/upcomming/${movie.id}`)}
    >
      <img
        src={movie.image_url}
        className="w-full h-56 object-cover rounded-lg"
        alt={movie.title}
      />
      <p className="text-white mt-2 text-sm opacity-80">{movie.title}</p>
    </div>
  );

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="mt-5 bg-black text-white min-h-screen overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      {movies.length > 0 ? (
        <div
          className="relative w-full h-[85vh] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence>
            <motion.img
              key={movies[current].id}
              src={movies[current].image_url}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

          <div className="absolute left-10 top-3/4 -translate-y-1/2 max-w-xl space-y-4">
            <h1 className="text-5xl font-bold">{movies[current].title}</h1>
            <p className="text-lg opacity-80">Book your favourite movie now!</p>

            <button
              onClick={() => navigate(`/showtimes/${movies[current].id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg mt-4"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() =>
              setCurrent((prev) => (prev === 0 ? movies.length - 1 : prev - 1))
            }
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            onClick={() =>
              setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      ) : (
        <div className="text-center text-white py-20 text-2xl">
          No movies available
        </div>
      )}

      {/* Streaming Row */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
        {streaming.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {streaming.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        ) : (
          <p className="text-white opacity-70">No streaming movies available</p>
        )}
      </section>

      {/* Upcoming movies */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
        {upComming.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {upComming.map((m) => (
              <UpcommingCard key={m.id} movie={m} />
            ))}
          </div>
        ) : (
          <p className="text-white opacity-70">No upcoming movies</p>
        )}
      </section>
    </div>
  );
};

export default Home;
