import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import successTick from "../../Icons/check-soft-bg.svg";
import preLoader from "../../Icons/Settings.gif";
import AxiosInstance from "../../Config/axios";
import { gmat_dashboard_path } from "../../Config/config";
import { useApplicationContext } from "../../Context/app-context";

const SuccessRegistration = () => {
  //eslint-disable-next-line
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const email = sessionStorage.getItem("email");
  const first_name = sessionStorage.getItem("first_name");
  const last_name = sessionStorage.getItem("last_name");
  const password = sessionStorage.getItem("password");
  const phone = sessionStorage.getItem("phone");
  const [isProfileCreated, setProfileCreated] = useState(false);
  const { setUserData } = useApplicationContext();
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [sessionId]);

  useEffect(() => {
    if (isProfileCreated) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          navigate(gmat_dashboard_path);
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isProfileCreated]);

  useEffect(() => {
    async function fetchSession() {
      await AxiosInstance.get("/checkout-session?sessionId=" + sessionId).then(
        async (res) => {
          const response = await res.data;
          setSession(response);

          CreateProfile();
        }
      );
    }
    if (sessionId) {
      fetchSession();
    }

    //eslint-disable-next-line
  }, [sessionId]);

  const clearLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("password");
    localStorage.removeItem("phone");
  };

  const CreateProfile = (plan) => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);

    AxiosInstance.post("/api/user/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;

        const accessToken = data.accessToken;

        if (!accessToken) {
          navigate("/login");
          clearLocalStorage();
          return;
        }
        setUserData(data);
        localStorage.setItem("accessToken", accessToken); // Cookie expiration set to 1 day

        clearLocalStorage();
        setProfileCreated(true); // Mark profile as created
      })
      .catch((err) => {
        console.log(err);
        alert("something is wrong");
      });
  };

  return (
    <>
      <div
        className="sr-root"
        style={{
          display: "grid",
          justifyItems: "center",
          height: "100vh",
          alignContent: "center",
        }}
      >
        {/* <div className="sr-section completed-view">
        <div className="sr-callout">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div> */}

        <div className="sr-content p-3 col-12 col-lg-8">
          <div>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
              <h1>Payment Successful!</h1>
              <img
                style={{ marginLeft: "10px" }}
                src={successTick}
                alt=""
                width={50}
                height={50}
              />{" "}
            </div>
            {isProfileCreated ? (
              <>
                {" "}
                <h1>Your Account is ready </h1>{" "}
                <p>
                  You will be redirecting automatically in {seconds} seconds
                </p>{" "}
                or <a href={gmat_dashboard_path}>Click here</a>{" "}
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <h1>Your Account is getting ready </h1>
                <img
                  style={{ marginLeft: "10px" }}
                  src={preLoader}
                  alt=""
                  width={50}
                  height={50}
                />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessRegistration;
