import React, { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

// Custom hook to access ClientContext
export const useClient = () => {
  return useContext(ClientContext);
};

const ClientProvider = ({ children }) => {
  const [clientToken, setClientToken] = useState(localStorage.getItem('clientToken') || null); // Store client token in state
  const [clientEmail, setClientEmail] = useState(localStorage.getItem('clientEmail') || null); // Store client email in state

  // Set the client data when the client logs in
  const login = (token, email) => {
    console.log(email)
    localStorage.setItem('clientToken', token); // Store the client token in localStorage
    localStorage.setItem('clientEmail', email); // Store the client email in localStorage
    setClientToken(token); // Update client token state
    setClientEmail(email); // Update client email state
  };

  // Clear the client data on logout
  const logout = () => {
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientEmail');
    setClientToken(null); // Clear client token state
    setClientEmail(null); // Clear client email state
  };

  return (
    <ClientContext.Provider value={{ clientToken, clientEmail, login, logout }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;