import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import NavBarHome from "../../components/nav-bar-home";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid img_container "
      style={{
        backgroundImage:
          "url(https://lh5.googleusercontent.com/5fVJIifi1CIJ76Og-mHkXlY2Us2xcnaboBFakE2UVDbfMANy4tv_FFs4gZyMkiK6FduI2GhCXiu79qwMbkyMpu8=w16383)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        transform: "translate3d(0px, 0px, 0px)",
      }}
    >
      <NavBarHome />
      <div
        style={{
          display: "grid",
          alignContent: "center",
          justifyItems: "center",
          height: "80vh",
        }}
      >
        <p style={{ fontSize: "80px" }}>
          <span className="text-primary" style={{ fontWeight: "bold" }}>
            {" "}
            Adeft
          </span>{" "}
          <span style={{ color: "white" }}>Education</span>
        </p>
        <button
          className="btn w-25 border mt-3"
          style={{
            background: "rgba(1, 1, 1, 0.461139)",
            color: "white",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Take free GMAT test
        </button>
      </div>
    </div>
  );
};

export default HomePage;
