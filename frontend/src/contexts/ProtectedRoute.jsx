import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './TalentContext';// Adjust the import path if needed

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/talent-login" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
