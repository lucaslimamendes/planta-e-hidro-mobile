import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [name, setName] = useState('');
  const [tokenJwt, setTokenJwt] = useState('');
  const [tokenMsg, setTokenMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);

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
        userId,
        setUserId,
        sensors,
        setSensors,
        alerts,
        setAlerts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
