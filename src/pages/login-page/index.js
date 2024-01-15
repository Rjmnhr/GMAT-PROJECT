import SignIn from "../../components/sign-in/index";
import NavBar from "../../components/nav-bar";
import { LoginPageStyled } from "./style";
import SignUp from "../../components/sign-up/index";
import { useApplicationContext } from "../../context/app-context";
import pointArrow from "../../icons/right-arrow.png";
import AxiosInstance from "../../components/axios";
import { useEffect, useState } from "react";
const LoginPage = () => {
  const { isSignIn } = useApplicationContext();
  const location = window.location.href;
  const userID = localStorage.getItem("adefteducation_user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

  return (
    <>
      <LoginPageStyled>
        <NavBar />

        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container bg-dark"
            style={{
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <h2 className="text-left w-100">
              Log in to unlock exclusive tools
            </h2>

            <div className="text-left w-100 mt-3">
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />{" "}
                GMAT Practice Test
              </h5>
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />
                Profiler
              </h5>
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />
                Recorded Videos
              </h5>
              <h5 className="d-flex justify-contents-start align-items-center mb-3  col-12">
                <img
                  style={{ marginRight: "8px" }}
                  src={pointArrow}
                  alt=""
                  height={50}
                  width={50}
                />
                Practice Questions
              </h5>
            </div>
          </div>
          <div className="right-container">
            <div className="right-sub-container">
              <div>{isSignIn ? <SignIn /> : <SignUp />}</div>
            </div>
          </div>
        </div>
      </LoginPageStyled>
    </>
  );
};

export default LoginPage;
