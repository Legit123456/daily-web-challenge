import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if token exists in LocalStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  if (!token) {
    // If no token, kick them to Login
    return <Navigate to="/login" replace />;
  }

  // If token exists, let them see the page (Admin)
  return children;
};

export default ProtectedRoute;