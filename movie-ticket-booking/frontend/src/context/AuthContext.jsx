// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwt_decode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   // ✅ Load user + verify token on first render
//   useEffect(() => {
//     if (!token) {
//       setUser(null);
//       return;
//     }

//     try {
//       const decoded = jwt_decode(token);
//       const currentTime = Date.now() / 1000;

//       if (decoded.exp < currentTime) {
//         logout();
//       } else {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) setUser(JSON.parse(storedUser));
//       }
//     } catch (e) {
//       logout();
//     }
//   }, [token]);

//   // ✅ Login function used by Login.jsx
//   const login = (token, userData) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));

//     setToken(token);
//     setUser(userData);
//   };

//   // ✅ Logout (global)
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setToken(null);
//     setUser(null);

//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Hook
// export const useAuth = () => useContext(AuthContext);

import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // ✅ Verify token on first load or token change
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token); // ✅ Correct function
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        logout(); // ✅ Auto logout if expired
        return;
      }

      // ✅ Load stored user
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));

    } catch (err) {
      logout(); // ✅ Invalid token → logout
    }
  }, [token]);

  // ✅ Login handler (called from Login.jsx)
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(token);
    setUser(userData);
  };

  // ✅ Global logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
