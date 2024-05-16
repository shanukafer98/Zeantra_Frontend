import React, { createContext, useState, useContext } from 'react';

// Create a context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);