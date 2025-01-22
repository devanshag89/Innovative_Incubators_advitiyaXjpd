import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isProfileComplete, setisProfileComplete] = useState(
    localStorage.getItem("isProfileComplete") || null
  );

  const login = (token, email, isProfileComplete) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("isProfileComplete", isProfileComplete);
    setToken(token);
    setEmail(email);
    setisProfileComplete(isProfileComplete);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ email, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
