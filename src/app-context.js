import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [isSignIn, setIsSignIn] = useState(true);

  const value = {
    questions,
    setQuestions,
    isSignIn,
    setIsSignIn,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};
