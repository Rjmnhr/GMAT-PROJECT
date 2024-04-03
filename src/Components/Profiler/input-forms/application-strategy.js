import React, { useEffect, useState } from "react";
import { Form, Tabs } from "antd";

import { StarFilled, StarOutlined } from "@ant-design/icons";

import ApplicationStrategyOutput from "../output/application-strategy-output";
import AxiosInstance from "../../../Config/axios";

const PreferenceForm = ({ onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [allInputsSelected, setAllInputsSelected] = useState(false);

  useEffect(() => {
    // Check if all options have been selected
    const areAllInputsSelected = options.every(
      (option) => selectedOptions[option.label] !== undefined
    );

    setAllInputsSelected(areAllInputsSelected);
    //eslint-disable-next-line
  }, [selectedOptions]);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleStarClick = (label, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [label]: value,
    });
  };

  const onFinish = (values) => {
    sessionStorage.setItem(
      "applicationSkillInputObject",
      JSON.stringify(selectedOptions)
    );
    onSubmit();
  };

  const options = [
    { label: "innovativeThinking", text: "Innovative Thinking" },
    { label: "problemSolving", text: "Problem Solving" },
    { label: "selfMotivated", text: "Self Motivated" },
    { label: "multiTasking", text: "Multi-tasking" },
    {
      label: "seniorStakeholderManagement",
      text: "Senior Stakeholder Management",
    },
    { label: "teamWork", text: "Team Work" },
    { label: "reportWriting", text: "Report Writing/Board Papers" },
    { label: "excel", text: "Excel" },
    { label: "strategy", text: "Strategy" },
    { label: "marketing", text: "Marketing" },
    { label: "finance", text: "Finance" },
    { label: "technology", text: "Technology" },
    { label: "hr", text: "HR" },
    { label: "operations", text: "Operations" },
  ];

  const renderStarOptions = (label) => {
    const maxRating = 4;

    return (
      <div style={{ gap: "8px" }} className="d-flex star-ratings">
        {[...Array(maxRating)].map((_, index) => {
          const ratingValue = index + 1; // Change here to reverse the order

          return (
            <div
              className="star-icon "
              key={index}
              onClick={() => handleStarClick(label, ratingValue)}
              style={{
                color:
                  selectedOptions[label] >= ratingValue ? "#FFD700" : "#d9d9d9",
                transition: "color 0.3s ease-in-out",
                marginLeft: "5px", // Adjust as needed
              }}
            >
              {selectedOptions[label] >= ratingValue ? (
                <img
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701664950/yme8l5iqy91jan3oc5lk.png"
                  alt=""
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701938737/qunal5unjsxk9soqg5ze.png"
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h3>Select the following to rate yourself</h3>
      {isMobile ? (
        ""
      ) : (
        <div
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          className="mb-3 mt-3"
        >
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <span style={{ marginLeft: "8px" }}>Highly Skilled</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>Skilled</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>Developing the skill</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>No idea</span>
          </div>
        </div>
      )}

      <Form onFinish={onFinish}>
        <div
          style={{ height: "60vh", overflowY: "scroll" }}
          className="container-fluid p-0 mt-3 mt-lg-2 scrollable-container d-lg-flex align-items-center justify-content-between flex-wrap mt-5"
        >
          {options.map((option) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyConte: "center",
                alignItems: "center",
              }}
              key={option.label}
              className={`star-rating-container  ${
                isMobile ? "w-100" : "w-50"
              } `}
            >
              <div
                style={{
                  padding: "0.575rem 1rem",
                  boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className={`d-flex ${
                  isMobile ? "w-100" : "w-75"
                }  mb-2 justify-content-between align-items-center `}
              >
                {" "}
                <h6 className="text-left">{option.text}</h6>
                {renderStarOptions(option.label)}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-3 text-center"
          style={{ width: "100%", marginBottom: "6rem" }}
        >
          <button
            htmlType="submit"
            className={`btn btn-lg btn-primary ${isMobile ? "w-75" : "w-25"}  `}
            disabled={!allInputsSelected}
          >
            Next
          </button>
        </div>
      </Form>
    </div>
  );
};

const { TabPane } = Tabs;

const ApplicationStrategyPage = () => {
  const formFilled = sessionStorage.getItem("form-filled-application");
  const [currentStep, setCurrentStep] = useState(
    formFilled === "true" ? "1" : "0"
  );

  const handleTabChange = (key) => {
    setCurrentStep(key);
  };

  const handleTryAgain = () => {
    sessionStorage.setItem("form-filled-application", "false");
    setCurrentStep("0");
  };

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
    <div className="container-fluid p-0">
      <Tabs
        tabBarStyle={{ display: "none" }}
        activeKey={currentStep}
        onChange={handleTabChange}
      >
        <TabPane tab="Preference Form" key="0">
          <PreferenceForm onSubmit={() => setCurrentStep("1")} />
        </TabPane>
        <TabPane tab="Application Strategy Output" key="1">
          <ApplicationStrategyOutput />
          <div className="mb-lg-0" style={{ marginBottom: "8rem" }}>
            {currentStep === "1" && (
              <button
                className="btn-primary btn btn-lg mt-3 mb-lg-3"
                onClick={handleTryAgain}
              >
                Try filling form again
              </button>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default ApplicationStrategyPage;
