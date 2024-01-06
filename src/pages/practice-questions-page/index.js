import { RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
import { PracticeQuestionsPageStyled } from "./style";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../components/axios";
const categoryNames = [
  "Quantitative Reasoning Questions",
  "Verbal Reasoning Questions",
  "Integrated Reasoning Questions",
];

const PracticeQuestionsPage = () => {
  const navigate = useNavigate();

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
        <title>Practice Questions | Adeft Education</title>
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
      <PracticeQuestionsPageStyled>
        <div
          style={{
            background: "#62b9bf",
            paddingTop: "100px",
            minHeight: "100vh",
          }}
        >
          <div style={{}} className="section-title">
            <h2>GMAT Practice Questions</h2>
          </div>
          <div
            className="p-3 tex-left"
            style={{
              display: "grid",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            {categoryNames.map((category, index) => {
              return (
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/category-questions?q=${categoryNames[index]
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    )
                  }
                  className="col-12 col-lg-8 mb-3 test-card"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="m-0">{category}</h3>
                    <RightOutlined />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </PracticeQuestionsPageStyled>
    </>
  );
};

export default PracticeQuestionsPage;
