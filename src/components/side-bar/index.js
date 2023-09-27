import React from "react";
import { useNavigate } from "react-router-dom";
import { SideBarStyled } from "./style";

const SideBar = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  return (
    <>
      <SideBarStyled>
        <div
          className="side-bar container-fluid"
          style={{ background: "#111d2c", height: "100vh", padding: "0" }}
        >
          <div className="pt-3 px-0 container-fluid ">
            <div className=" border-bottom button  container-fluid">
              <button className="btn " onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            </div>
            {isAdmin === "true" ? (
              <div className=" border-bottom button">
                <button
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
        </div>
      </SideBarStyled>
    </>
  );
};

export default SideBar;
