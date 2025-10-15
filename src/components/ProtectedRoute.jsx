import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user ,loading } = useAuth();

   if (loading) {
    return <p>Loading...</p>; // or a spinner
  }


  // ✅ Check token instead of separate role
  if (!user || !user.token) {
    
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
