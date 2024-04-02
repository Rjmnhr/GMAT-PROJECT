import NavBar from "../../Layout/nav-bar";
import "./style.css";
import GMATSideBar from "../../Layout/gmat-side-bar";
import { useApplicationContext } from "../../Context/app-context";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import GMATDashboard from "./dashboard";
import AxiosInstance from "../../Config/axios";

const DashboardMainPage = () => {
  const { activeIndex } = useApplicationContext();
  const location = window.location.href;

  const userID = localStorage.getItem("adefteducation_user_id");

  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

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
          <GMATDashboard activeIndex={activeIndex} />
        </div>
      </div>
    </>
  );
};

export default DashboardMainPage;
