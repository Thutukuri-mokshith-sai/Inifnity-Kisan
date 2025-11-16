import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage as fallback
    const localToken = localStorage.getItem("token");

    if (!token && !localToken) {
      // Redirect to login if no token is available
      navigate("/login");
    }
  }, [token, navigate]);

  // Optionally: show nothing or a loader while checking
  if (!token && !localStorage.getItem("token")) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
