import React, { createContext, useContext, useState } from "react";

const ClientContext = createContext();

export const useClient = () => {
  return useContext(ClientContext);
};

const ClientProvider = ({ children }) => {
  const [clientToken, setClientToken] = useState(
    localStorage.getItem("clientToken") || null
  );
  const [clientEmail, setClientEmail] = useState(
    localStorage.getItem("clientEmail") || null
  );

  const login = (token, email) => {
    console.log(email);
    localStorage.setItem("clientToken", token);
    localStorage.setItem("clientEmail", email);
    setClientToken(token);
    setClientEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientEmail");
    setClientToken(null);
    setClientEmail(null);
  };

  return (
    <ClientContext.Provider value={{ clientToken, clientEmail, login, logout }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
