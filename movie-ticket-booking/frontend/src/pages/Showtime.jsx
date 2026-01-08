import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import API from "../api/api";

const Showtime = () => {
  const { movieId } = useParams();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate next 7 dates
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 7; i++) {
      const d = dayjs().add(i, "day");
      temp.push({
        label: d.format("ddd"),
        date: d.format("DD MMM"),
        value: d.format("YYYY-MM-DD"),
      });
    }
    setDates(temp);
  }, []);

  // Fetch showtimes
  useEffect(() => {
    if (!movieId) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/showtimes/${movieId}?date=${selectedDate}`);
        setShowtimes(res.data);
      } catch (e) {
        console.error(e);
        setShowtimes([]);
      }
      setLoading(false);
    };

    load();
  }, [selectedDate, movieId]);

  return (
    <div className="mt-24 px-6 text-white">
      {/* DATE SELECTOR */}
      <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar">
        {dates.map((d) => (
          <button
            key={d.value}
            onClick={() => setSelectedDate(d.value)}
            className={`flex flex-col items-center min-w-[70px] px-4 py-2 rounded-xl border backdrop-blur-md transition
            ${
              selectedDate === d.value
                ? "bg-blue-600 text-white border-blue-500 shadow-lg"
                : "bg-zinc-900/60 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            }`}
          >
            <span className="text-sm font-medium">{d.label}</span>
            <span className="text-xs">{d.date}</span>
          </button>
        ))}
      </div>

      {/* SHOWTIMES */}
      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading showtimes...</p>
      ) : showtimes.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No shows available</p>
      ) : (
        <div className="mt-8 space-y-6">
          {showtimes.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl backdrop-blur-md shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-3">
                {t.theatre_name} — {t.loc_name}
              </h2>

              <div className="flex flex-wrap gap-3">
                {t.showtimes.map((s) => (
                  <Link
                    key={s.id}
                    to={`/seats/${s.id}`}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 
                               transition shadow hover:shadow-lg"
                  >
                    {s.time}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showtime;
