import React, { useState, useContext } from 'react';

const ModeContext = React.createContext();

export function useTheme() {
  return useContext(ModeContext);
}

export function ThemeContext({ children }) {
  const [mode, setMode] = useState('dark');

  const changeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ModeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
}
