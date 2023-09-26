import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarHome = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogOut = () => {
    navigate("/");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
  };
  return (
    <div
      className="container-fluid p-1 d-flex justify-content-between align-items-center border-bottom"
      style={{ color: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <p style={{ color: "white", margin: "0" }}>www.adefteducation.com</p>
      </div>

      <div>
        {isLoggedIn === "true" ? (
          <button
            style={{ color: "white" }}
            onClick={handleLogOut}
            className="btn"
          >
            Log out
          </button>
        ) : (
          <button
            style={{ color: "white" }}
            onClick={() => navigate("/login")}
            className="btn"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBarHome;
