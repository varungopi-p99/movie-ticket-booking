// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo32 from "../assets/logo32.png";
// import { ArrowLeft, LogOut } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Login from "../pages/Login";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const [isSideOpen, setIsSideOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* ✅ Modern OTT Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
//         <div className="flex items-center justify-between px-6 py-3">
//           {/* ✅ Logo + Name */}
//           <div
//             onClick={() => setIsSideOpen(true)}
//             className="flex items-center space-x-3 cursor-pointer"
//           >
//             <img src={logo32} alt="BYT" className="h-10 w-10" />
//             <span className="text-xl tracking-wide font-semibold text-white">
//               BookYourTickets
//             </span>
//           </div>

//           {/* ✅ Search + User */}
//           <div className="flex items-center space-x-4 relative">
//             {/* Search Bar */}
//             <div className="hidden md:flex items-center relative">
//               <input
//                 type="text"
//                 placeholder="Search movies..."
//                 className="bg-white/10 text-white placeholder-white/60 px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 absolute right-3 text-white/80"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
//                 />
//               </svg>
//             </div>

//             {/* ✅ Sign In or User Menu */}
//             {!user ? (
//               <button
//                 onClick={() => setIsLoginOpen(true)}
//                 className="px-5 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition"
//               >
//                 Sign In
//               </button>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen((prev) => !prev)}
//                   className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition"
//                 >
//                   <span className="font-semibold">
//                     {user.user_name
//                       ? `Hi, ${user.user_name}`
//                       : "My Account"}
//                   </span>
//                 </button>

//                 <AnimatePresence>
//                   {dropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 bg-black/90 text-white shadow-lg rounded-md w-40 border border-white/20"
//                     >
//                       <button
//                         onClick={() => {
//                           logout();
//                           setDropdownOpen(false);
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center"
//                       >
//                         <LogOut size={16} className="mr-2" /> Logout
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ✅ Side Navigation (Mobile Menu) */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-black/70 backdrop-blur-xl transform ${
//           isSideOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 z-50`}
//       >
//         <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
//           <h2 className="text-lg font-semibold text-white">Menu</h2>
//           <button
//             onClick={() => setIsSideOpen(false)}
//             className="text-white/80 hover:text-white"
//           >
//             <ArrowLeft size={26} />
//           </button>
//         </div>

//         <ul className="flex flex-col mt-4 space-y-4 px-6 text-white/90 font-medium">
//           <Link to="/" onClick={() => setIsSideOpen(false)}>
//             Home
//           </Link>
//           <Link to="/bookings" onClick={() => setIsSideOpen(false)}>
//             Bookings
//           </Link>

//           {!user && (
//             <button
//               className="mt-4 py-2 border-t border-white/20 text-left"
//               onClick={() => {
//                 setIsLoginOpen(true);
//                 setIsSideOpen(false);
//               }}
//             >
//               Sign In
//             </button>
//           )}
//         </ul>
//       </div>

//       {/* Dark Overlay */}
//       {isSideOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//           onClick={() => setIsSideOpen(false)}
//         />
//       )}

//       {/* Login Modal */}
//       {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo32 from "../assets/logo32.png";
import { ArrowLeft, LogOut, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";
import API from "../api/api"; // Axios instance

const Navbar = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch movies on mount
  useEffect(() => {
    API.get("/movies/streaming/")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim() || !movies.length) {
      setFilteredMovies([]);
      return;
    }

    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(results);
  };

  // Navigate to movie page and reset search
  const handleNavigate = (path) => {
    navigate(path);
    setQuery("");
    setFilteredMovies([]);
    setMobileSearchOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div
            onClick={() => setIsSideOpen(true)}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img src={logo32} alt="BYT" className="h-10 w-10" />
            <span className="text-xl tracking-wide font-semibold text-white hidden md:inline">
              BookYourTickets
            </span>
          </div>

          {/* Search + User */}
          <div className="flex items-center space-x-4 relative">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleSearch}
                className="bg-white/10 text-white placeholder-white/60 px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              />
              <Search size={20} className="absolute right-3 text-white/80" />

              {/* Search Results */}
              {query && (
                <div className="absolute top-full mt-2 w-64 bg-black/90 text-white rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
                  {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                      <button
                        key={movie.id}
                        onClick={() => handleNavigate(`/showtimes/${movie.id}`)}
                        className="w-full text-left px-4 py-2 hover:bg-white/20"
                      >
                        {movie.title}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-white/70">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                className="p-2 rounded-md hover:bg-white/20"
              >
                <Search size={20} className="text-white" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <AnimatePresence>
              {mobileSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-64 md:hidden"
                >
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={handleSearch}
                    className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  {query && (
                    <div className="mt-1 bg-black/90 text-white rounded-md shadow-lg max-h-80 overflow-y-auto">
                      {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                          <button
                            key={movie.id}
                            onClick={() =>
                              handleNavigate(`/showtimes/${movie.id}`)
                            }
                            className="w-full text-left px-4 py-2 hover:bg-white/20"
                          >
                            {movie.title}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-white/70">
                          No results found
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sign In / User Menu */}
            {!user ? (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-5 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition"
              >
                Sign In
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <span className="font-semibold">
                    {user.user_name ? `Hi, ${user.user_name}` : "My Account"}
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 bg-black/90 text-white shadow-lg rounded-md w-40 border border-white/20"
                    >
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Side Navigation (Mobile Menu) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/70 backdrop-blur-xl transform ${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={() => setIsSideOpen(false)}
            className="text-white/80 hover:text-white"
          >
            <ArrowLeft size={26} />
          </button>
        </div>

        <ul className="flex flex-col mt-4 space-y-4 px-6 text-white/90 font-medium">
          <Link to="/" onClick={() => setIsSideOpen(false)}>
            Home
          </Link>
          <Link to="/bookings" onClick={() => setIsSideOpen(false)}>
            Bookings
          </Link>

          {!user && (
            <button
              className="mt-4 py-2 border-t border-white/20 text-left"
              onClick={() => {
                setIsLoginOpen(true);
                setIsSideOpen(false);
              }}
            >
              Sign In
            </button>
          )}
        </ul>
      </div>

      {/* Dark Overlay */}
      {isSideOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsSideOpen(false)}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Navbar;
