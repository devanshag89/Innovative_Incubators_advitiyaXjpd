import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./TalentContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/talent-login" />;
  }

  return children;
};

export default ProtectedRoute;
