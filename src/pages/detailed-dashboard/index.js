import React from "react";
import NavBar from "../../components/nav-bar";

import SideBar from "../../components/side-bar";
import { useApplicationContext } from "../../context/app-context";
import GMATFocusDetailed from "../../components/gmat-focus/gmat-focus-detailed";
import GMATOldDetailed from "../../components/gmat-old/gmat-old-detailed";
const DashboardDetailed = () => {
  const { activeIndex } = useApplicationContext();
  return (
    <>
      <NavBar />
      <div
        style={{ marginTop: "80px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="col-2 p-0">
          <SideBar />
        </div>
        <div className="container col-10 p-5" style={{ height: "100vh" }}>
          {activeIndex === 0 ? <GMATOldDetailed /> : <GMATFocusDetailed />}
        </div>
      </div>
    </>
  );
};

export default DashboardDetailed;
