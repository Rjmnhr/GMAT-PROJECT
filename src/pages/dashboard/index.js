import NavBar from "../../components/nav-bar";
import "./style.css";

import SideBar from "../../components/side-bar";

import GMATOld from "../../components/gmat-old";
import GMATFocus from "../../components/gmat-focus";
import { useApplicationContext } from "../../context/app-context";
import GMATFocusContent from "../../components/gmat-focus-content";
import { Helmet } from "react-helmet";

const DashBoardComponent = () => {
  const { activeIndex } = useApplicationContext();

  return (
    <>
      <Helmet>
        <title>GMAT | Adeft Education</title>
        <meta
          name="description"
          content="Transform your MBA aspirations into reality with Adeft Education - a trusted consultancy with over three decades of post-MBA expertise"
        />
        <meta
          property="og:description"
          content="Transform your MBA aspirations into reality with Adeft Education - a trusted consultancy with over three decades of post-MBA expertise"
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>

      <NavBar />
      <div
        style={{ marginTop: "80px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="col-2 p-0">
          <SideBar />
        </div>

        <div className="container col-10 p-5" style={{ height: "100vh" }}>
          {activeIndex === 0 ? (
            <GMATFocusContent />
          ) : activeIndex === 1 ? (
            <GMATOld />
          ) : (
            <GMATFocus />
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoardComponent;
