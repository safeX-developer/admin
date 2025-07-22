
import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../api/api';

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const api = new ApiService();

  // Context value
  const value = {
    api,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
