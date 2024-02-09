import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const AppContext = createContext({
  userId: "",
  gameResult: "",
  darkTheme: false,
  setDarkTheme: () => {},
  setGameResult: () => {},
});

const ContextProvider = ({ children }) => {
  const userId = `${uuid()}`;
  const [gameResult, setGameResult] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <AppContext.Provider
      value={{
        userId,
        gameResult,
        setGameResult,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default ContextProvider;
