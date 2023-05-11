import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ name, setName, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
