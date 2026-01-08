import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const Upcomming = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/upcomming/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        setError("Movie not found");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading)
    return <div className="text-white text-center mt-24">Loading...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center mt-24">
        {error}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white"
        >
          Go to Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      {/* Movie Card */}
      <div className="max-w-3xl w-full bg-gray-900 rounded-2xl p-6 shadow-lg">
        <img
          src={movie.image_url || "/placeholder.jpg"}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-400 mb-4">
          Release Date: {new Date(movie.release_date).toLocaleDateString()}
        </p>

        <p className="text-gray-200 mb-6">{movie.description || "No description available."}</p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default Upcomming;
