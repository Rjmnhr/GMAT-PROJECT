// MyComponent.js

import React, { useEffect, useState } from "react";
import { LMSRepresentationStyled } from "./style";

import NavBar from "../nav-bar";

import { useNavigate } from "react-router-dom";
import {
  EditFilled,
  ProfileFilled,
  QuestionCircleFilled,
  VideoCameraFilled,
} from "@ant-design/icons";
import AxiosInstance from "../axios";
// import pointArrow from "../../icons/right-arrow.png";
const toolsArray = [
  { title: "Profiler", icon: <ProfileFilled />, link: "/profiler" },
  { title: "GMAT Practice Test", icon: <EditFilled />, link: "/gmat" },
  {
    title: "Practice Questions",
    icon: <QuestionCircleFilled />,
    link: "/practice-questions",
  },
  { title: "Recorded Videos", icon: <VideoCameraFilled />, link: "/videos" },
];
const LMSRepresentation = () => {
  const navigate = useNavigate();

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
    <LMSRepresentationStyled>
      <NavBar />
      <div
        className="pb-3"
        style={{ background: "#62b9bf", color: "white", minHeight: "100vh" }}
      >
        <div style={{ paddingTop: "150px" }} className="d-lg-flex container">
          <div className="additional-content text-left col-lg-5 p-3">
            <div className="section-title text-left p-0">
              <h2>Unlock Your Learning Potential with Adeft Education</h2>
            </div>
            <h3>Explore our interactive tools</h3>
            <p>
              Embark on a journey of knowledge and skill enhancement with Adeft
              Education.Dive into a GMAT Practice Test, discover your strengths
              with the Profiler, watch engaging Recorded Videos, and tackle
              challenging Practice Questions.
            </p>
            <p>
              Explore the possibilities that await you. Click on the circles to
              navigate through Adeft Education's diverse offerings. Let's make
              your learning adventure both exciting and rewarding!
            </p>
          </div>
          <div className="col-8">
            <div className="d-flex align-items-center justify-content-center mt-3 flex-wrap">
              {toolsArray.map((tool) => {
                return (
                  <>
                    <div
                      onClick={() => navigate(tool.link)}
                      className="m-2 hover-card"
                      style={{
                        backgroundPosition: "center",
                        width: "300px",
                        height: "200px",
                      }}
                    >
                      <div
                        className="hover-sub-card"
                        style={{
                          height: "100%",
                          display: "grid",
                          justifyItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <span style={{ fontSize: "60px" }}>{tool.icon}</span>
                        {/* <img width={120} src={tool.icon} alt="gmat test icon" /> */}
                        <h5 className="w-100 m-1">{tool.title}</h5>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* <div className="circle-container mb-3 ">
            <div
              style={{ display: "grid", placeItems: "center", padding: "8px" }}
              className="big-circle"
            >
              <h5>Adeft </h5>
            </div>
            <div
              onClick={() => navigate("/profiler")}
              style={{ display: "grid", placeItems: "center", padding: "8px" }}
              className="small-circle top"
            >
              <p>Profiler</p>
            </div>
            <div
              onClick={() => navigate("/videos")}
              style={{ display: "grid", placeItems: "center", padding: "8px" }}
              className="small-circle right"
            >
              {" "}
              <p>Recorded Videos</p>
            </div>
            <div
              onClick={() => navigate("/dashboard")}
              style={{ display: "grid", placeItems: "center", padding: "8px" }}
              className="small-circle bottom"
            >
              <p>GMAT Practice Test</p>
            </div>
            <div
              onClick={() => navigate("/practice-questions")}
              style={{ display: "grid", placeItems: "center", padding: "8px" }}
              className="small-circle left"
            >
              <p>Practice Questions</p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="extra-block"></div>
    </LMSRepresentationStyled>
  );
};

export default LMSRepresentation;
