import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(1);
  const happyBirthday = () => setAge(age + 1);

  return (
    <AppContext.Provider value={{ name, age, setName, happyBirthday }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
