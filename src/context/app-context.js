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
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    isMobile,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};
