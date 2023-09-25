import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarHome = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid p-1 d-flex justify-content-between align-items-center border-bottom"
      style={{ color: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3 style={{ color: "white", margin: "0" }}>ADEFT EDUCATION</h3>
      </div>

      <div>
        <button
          style={{ color: "white" }}
          onClick={() => navigate("/login")}
          className="btn"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default NavBarHome;
