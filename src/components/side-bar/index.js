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
          className="side-bar  container-fluid"
          style={{ background: "#f8f8f8", height: "100vh", padding: "0" }}
        >
          <div className="pt-3 px-0 container-fluid ">
            <div className=" border-bottom button p-0  container-fluid">
              <p
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #c9c8c7",
                }}
                onClick={() => navigate("/dashboard")}
                className={` p-3 w-100 m-0 cursor-pointer text-left selected-tab`}
              >
                Dashboard
              </p>
            </div>
            {isAdmin === "true" ? (
              <p
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #c9c8c7",
                }}
                onClick={() => navigate("/admin-dashboard")}
                className={` p-3 w-100 m-0 cursor-pointer text-left `}
              >
                Admin Dashboard
              </p>
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
