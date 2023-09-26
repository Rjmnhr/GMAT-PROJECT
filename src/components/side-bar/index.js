import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  return (
    <div
      className="side-bar container-fluid"
      style={{ background: "#111d2c", height: "100vh" }}
    >
      <div className="pt-3 border-bottom">
        <button
          style={{ color: "white" }}
          className="btn "
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
      {isAdmin === "true" ? (
        <div className="pt-3 border-bottom">
          <button
            style={{ color: "white" }}
            className="btn "
            onClick={() => navigate("/admin-dashboard")}
          >
            Admin Dashboard
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
