import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [isSignIn, setIsSignIn] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const value = {
    questions,
    setQuestions,
    isSignIn,
    setIsSignIn,
    activeIndex,
    setActiveIndex,
    setIsEmailVerified,
    isEmailVerified,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};
