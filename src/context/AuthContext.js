import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // When token changes, update localStorage and fetch user
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUserProfile(token);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setToken(null);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setToken(null);
    }
  };

  const login = (newToken) => setToken(newToken);
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
