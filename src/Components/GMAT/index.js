import NavBar from "../../Layout/nav-bar";
import "./style.css";
import GMATSideBar from "../../Layout/gmat-side-bar";
import { useApplicationContext } from "../../Context/app-context";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import GMATDashboard from "./dashboard";
import {
  practiceExamData,
  practiceExamDataFocus,
} from "../../Config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../../Config/axios";
import { login_path } from "../../Config/config";
import TestInsights from "./test-insights";

const DashboardMainPage = () => {
  const { activeIndex } = useApplicationContext();
  const [examData, setExamData] = useState({});
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const path = location?.pathname;
  const navigate = useNavigate();
  const category = location.search.replace("?p=", "");
  const [componentTrigger, setComponentTrigger] = useState(false);

  useEffect(() => {
    switch (activeIndex) {
      case 0:
        setExamData(practiceExamData);
        sessionStorage.setItem("category", "old");
        break;
      case 1:
        setExamData(practiceExamDataFocus);
        sessionStorage.setItem("category", "focus");
        break;
      default:
        break;
    }
  }, [activeIndex]);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    AxiosInstance.get("/api/gmat/user-activity/get-activity", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;
        if (response.status === 200) {
          setUserActivities(response.data);
          setIsLoading(false);
        } else {
          navigate(`${login_path}?p=${path}`);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, path]);

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
          <GMATSideBar />
        </div>

        <div className="container col-10 p-5" style={{ height: "100vh" }}>
          {category === "insights" ? (
            <TestInsights
              activeIndex={activeIndex}
              examData={examData}
              userActivities={userActivities}
              loading={isLoading}
              componentTrigger={componentTrigger}
            />
          ) : (
            <GMATDashboard
              activeIndex={activeIndex}
              examData={examData}
              userActivities={userActivities}
              loading={isLoading}
              setComponentTrigger={setComponentTrigger}
              componentTrigger={componentTrigger}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardMainPage;
