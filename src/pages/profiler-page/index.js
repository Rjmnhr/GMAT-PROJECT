import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import BasicDetailsForm from "../../components/profiler-forms/basic-details";
import WorkExperienceForm from "../../components/profiler-forms/work-experience";
import UndergraduateDegreeForm from "../../components/profiler-forms/graduate-form";
import CommunityServiceForm from "../../components/profiler-forms/community-service-form";
import HobbiesForm from "../../components/profiler-forms/hobbies-form";
import NatureOfWorkForm from "../../components/profiler-forms/work-experience/nature-of-work";

import { ProfilerPageStyled } from "./style";
import { Progress, message } from "antd";
import { useNavigate } from "react-router-dom";

const ProfilerPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [totalNonEmptyCountValue, setTotalNonEmptyCountValue] = useState(0);
  const [overAllProgress, setOverAllProgress] = useState(0);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const totalQuestions = 26;

  const handleSaveAndContinue = () => {
    try {
      updateFormValues("basic-details");
      updateFormValues("experience");

      updateFormValues("natureExperience");
      updateFormValues("graduate");
      updateFormValues("service");
      updateFormValues("hobbies");
      sessionStorage.removeItem("form-filled");
      navigate("/selection-chance");
    } catch {
      messageApi.open({
        type: "error",
        content: "You have not answered enough questions to continue",
      });
    }
  };
  const updateFormValues = (formName) => {
    const defaultValues = JSON.parse(
      sessionStorage.getItem(`${formName}-default`)
    );
    const currentValues = JSON.parse(sessionStorage.getItem(formName));

    // Check if all keys from defaultValues are present in currentValues
    const missingKeys = Object.keys(defaultValues).filter(
      (key) => !currentValues.hasOwnProperty(key)
    );

    // If there are missing keys, update currentValues with default values
    if (missingKeys.length > 0) {
      const updatedValues = { ...currentValues, ...defaultValues };
      sessionStorage.setItem(formName, JSON.stringify(updatedValues));
    }
  };
  useEffect(() => {
    // Clear session storage items when the component is reloaded
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("experience");
      sessionStorage.removeItem("experience-default");
      sessionStorage.removeItem("natureExperience");
      sessionStorage.removeItem("natureExperience-default");
      sessionStorage.removeItem("basic-details");
      sessionStorage.removeItem("basic-details-default");
      sessionStorage.removeItem("graduate");
      sessionStorage.removeItem("graduate-default");
      sessionStorage.removeItem("service");
      sessionStorage.removeItem("service-default");
      sessionStorage.removeItem("hobbies");
      sessionStorage.removeItem("hobbies-default");
    };

    // Attach the event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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

  const handleUpdateProgress = (formName, nonEmptyCount) => {
    // Update the progress state based on the formName and nonEmptyCount
    // Add the nonEmptyCount to the progress state or update it if already present
    setProgress((prevProgress) => ({
      ...prevProgress,
      [formName]: nonEmptyCount,
    }));
  };

  useEffect(() => {
    // Calculate the overall progress by summing up the nonEmptyCount from all forms
    const totalNonEmptyCount = Object.values(progress).reduce(
      (total, count) => total + count,
      0
    );
    setTotalNonEmptyCountValue(totalNonEmptyCount);
    const overallProgressPercentage =
      (totalNonEmptyCount / totalQuestions) * 100;
    setOverAllProgress(overallProgressPercentage?.toFixed(2));
  }, [progress]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  return (
    <ProfilerPageStyled>
      {contextHolder}
      <NavBar />
      <div
        className="container-fluid"
        style={{ background: "rgb(248, 248, 248)" }}
      >
        <div style={{ background: "white" }} className="container">
          <div
            className="vh-100 container col-12"
            style={{
              marginTop: "100px",
              display: "grid",
              alignContent: "center",
              justifyContent: `${
                activeTab === 0 ? "center" : `${isMobile ? "start" : "center"}`
              }`,
            }}
          >
            <div className="d-flex justify-content-between mb-2 align-items-center">
              <div style={{ textAlign: "left", marginTop: "10px" }}>
                <Progress
                  size={40}
                  type="circle"
                  percent={overAllProgress}
                  strokeColor={twoColors}
                />
                <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                  Answered {totalNonEmptyCountValue} out of {totalQuestions}{" "}
                </span>
              </div>
              <div>
                <button
                  onClick={handleSaveAndContinue}
                  className="btn btn-primary"
                >
                  Save & continue{" "}
                </button>
              </div>
            </div>
            <Tabs
              value={activeTab}
              centered
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Basic Details" />
              <Tab label="Work Experience" />
              <Tab label="Nature of Experience" />
              <Tab label="Undergraduate Degree" />
              <Tab label="Community Service" />
              <Tab label="Hobbies" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
              <div style={{ minHeight: "70vh" }}>
                <BasicDetailsForm onUpdateProgress={handleUpdateProgress} />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <div style={{ minHeight: "70vh" }}>
                <WorkExperienceForm onUpdateProgress={handleUpdateProgress} />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <div
                className="scrollable-container"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                <NatureOfWorkForm onUpdateProgress={handleUpdateProgress} />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
              <div style={{ minHeight: "70vh" }}>
                <UndergraduateDegreeForm
                  onUpdateProgress={handleUpdateProgress}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={4}>
              <div style={{ minHeight: "70vh" }}>
                <CommunityServiceForm onUpdateProgress={handleUpdateProgress} />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={5}>
              <div style={{ minHeight: "70vh" }}>
                <HobbiesForm onUpdateProgress={handleUpdateProgress} />
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    </ProfilerPageStyled>
  );
};

export default ProfilerPage;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}