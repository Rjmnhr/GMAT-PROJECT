import React from "react";

import { SideBarStyled } from "./style";
import { useApplicationContext } from "../../context/app-context";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { setActiveIndex, activeIndex } = useApplicationContext();
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
                onClick={() => {
                  setActiveIndex(0);
                  navigate("/gmat");
                }}
                className={` p-3 w-100 m-0 cursor-pointer text-left ${
                  activeIndex === 0 ? "selected-tab" : ""
                } `}
              >
                GMAT Focus Edition
              </p>
            </div>
            <div className=" border-bottom button p-0  container-fluid">
              <p
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #c9c8c7",
                }}
                onClick={() => {
                  setActiveIndex(1);
                  navigate("/gmat");
                }}
                className={` p-3 w-100 m-0 cursor-pointer text-left ${
                  activeIndex === 1 ? "selected-tab" : ""
                } `}
              >
                GMAT Practice Exam
              </p>
            </div>
            <div className=" border-bottom button p-0  container-fluid">
              <p
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #c9c8c7",
                }}
                onClick={() => {
                  setActiveIndex(2);
                  navigate("/gmat");
                }}
                className={` p-3 w-100 m-0 cursor-pointer text-left  ${
                  activeIndex === 2 ? "selected-tab" : ""
                } `}
              >
                Practice Exam Focus Edition
              </p>
            </div>
          </div>
        </div>
      </SideBarStyled>
    </>
  );
};

export default SideBar;
