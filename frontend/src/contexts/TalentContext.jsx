import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem('email') || null); // Store email in state
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Store token in state

  // Set the email and token when the user logs in
  const login = (token, email) => {
    localStorage.setItem('token', token); // Store the token in localStorage
    localStorage.setItem('email', email); // Store the email in localStorage
    setToken(token); // Update token state
    setEmail(email); // Update email state
  };

  // Clear the user data on logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null); // Clear token state
    setEmail(null); // Clear email state
  };

  return (
    <AuthContext.Provider value={{ email, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
