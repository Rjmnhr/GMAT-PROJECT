import React from "react";

import { useApplicationContext } from "../Context/app-context";
import { SideBarStyled } from "./style";
import { gmat_dashboard_path } from "../Config/config";
import { useNavigate } from "react-router-dom";

const GMATSideBar = () => {
  const { setActiveIndex, activeIndex } = useApplicationContext();

  const sideBarOptions = ["GMAT Practice Exams", "GMAT Focus Edition"];
  const navigate = useNavigate();
  return (
    <>
      <SideBarStyled>
        <div
          className="side-bar  container-fluid"
          style={{ background: "#f8f8f8", height: "100vh", padding: "0" }}
        >
          <div className="pt-3 px-0 container-fluid ">
            {sideBarOptions.map((option, index) => (
              <div className=" border-bottom button p-0  container-fluid">
                <p
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #c9c8c7",
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                    navigate(gmat_dashboard_path);
                  }}
                  className={` p-3 w-100 m-0 cursor-pointer text-left ${
                    activeIndex === index ? "selected-tab" : ""
                  } `}
                >
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SideBarStyled>
    </>
  );
};

export default GMATSideBar;
