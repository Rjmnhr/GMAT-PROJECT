// MyComponent.js

import React from "react";
import { LMSRepresentationStyled } from "./style";
import NavBar from "../nav-bar";
import { useNavigate } from "react-router-dom";
// import pointArrow from "../../icons/right-arrow.png";

const LMSRepresentation = () => {
  const navigate = useNavigate();
  return (
    <LMSRepresentationStyled>
      <NavBar />
      <div
        className="pb-3"
        style={{ background: "#62b9bf", color: "white", minHeight: "100vh" }}
      >
        <div style={{ paddingTop: "150px" }} className="d-lg-flex container">
          <div className="additional-content text-left col-lg-6 p-3">
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
          <div className="circle-container mb-3 ">
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
          </div>
        </div>
      </div>
      <div className="extra-block"></div>
    </LMSRepresentationStyled>
  );
};

export default LMSRepresentation;