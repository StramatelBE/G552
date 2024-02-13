import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const value = {
    darkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
  );
};
