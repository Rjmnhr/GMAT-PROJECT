import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../Config/axios";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [isSignIn, setIsSignIn] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(true);
  const [trigger, setTrigger] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    AxiosInstance.get(
      "api/user/details",

      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        const UserData = res.data?.data;

        if (res.status === 200) {
          setUserData(UserData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const value = {
    questions,
    setQuestions,
    isSignIn,
    setIsSignIn,
    activeIndex,
    setActiveIndex,
    setIsEmailVerified,
    isEmailVerified,
    setUserData,
    userData,
    currentSectionIndex,
    setCurrentSectionIndex,
    showInstruction,
    setShowInstruction,
    trigger,
    setTrigger,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};
