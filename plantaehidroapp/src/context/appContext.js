import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [tokenJwt, setTokenJwt] = useState('');
  const [tokenMsg, setTokenMsg] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        loading,
        setLoading,
        tokenJwt,
        setTokenJwt,
        tokenMsg,
        setTokenMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
