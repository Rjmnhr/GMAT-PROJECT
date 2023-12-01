import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/nav-bar";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import BasicDetailsForm from "../../components/profiler-forms/basic-details";
import WorkExperienceForm from "../../components/profiler-forms/work-experience";
import UndergraduateDegreeForm from "../../components/profiler-forms/graduate-form";
import CommunityServiceForm from "../../components/profiler-forms/community-service-form";
import HobbiesForm from "../../components/profiler-forms/hobbies-form";
import NatureOfWorkForm from "../../components/profiler-forms/work-experience/nature-of-work";

import { ProfilerPageStyled } from "./style";

const ProfilerPage = () => {
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  const formRef3 = useRef(null);
  const formRef4 = useRef(null);
  const formRef5 = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [completedForms, setCompletedForms] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  const formProgress = {
    1: 33, // Basic Details
    2: 66, // Work Experience
    3: 77, // Nature of Work Experience
    4: 88, // Undergraduate Degree
    5: 99, // Community Service
    6: 100, // Hobbies
  };

  const handleTabChange = (event, newValue) => {
    if (unsavedChanges) {
      // Handle unsaved changes logic here
    } else {
      setActiveTab(newValue);
    }
  };

  const updateOverallProgress = (formKey) => {
    const completedKeys = [...completedForms, formKey];
    const totalForms = Object.keys(formProgress).length;
    const progress = Math.ceil((completedKeys.length / totalForms) * 100);
    setOverallProgress(progress);
  };

  const handleSubmit = (formRef, formKey, nextTab) => {
    formRef.current
      .validateFields()
      .then(() => {
        setCompletedForms((prev) => [...prev, formKey]);
        updateOverallProgress(formKey);
        setActiveTab(nextTab);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleFormChange = () => {
    setUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
  };

  return (
    <ProfilerPageStyled>
      <NavBar />
      <div
        className="container-fluid"
        style={{ background: "rgb(248, 248, 248)" }}
      >
        <div style={{ background: "white" }} className="container">
          <div
            className="vh-100 container col-12"
            style={{
              paddingTop: "100px",
              display: "grid",
              alignContent: "center",
              justifyContent: `${
                activeTab === 0 ? "center" : `${isMobile ? "start" : "center"}`
              }`,
            }}
          >
            {overallProgress > 0 && activeTab !== 0 && (
              <div style={{ marginBottom: "20px" }}>
                {/* Display your progress bar here */}
              </div>
            )}
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
                <BasicDetailsForm
                  formRef={formRef1}
                  onSubmit={() => handleSubmit(formRef1, "1", 1)}
                  onChange={handleFormChange}
                  onSaveChanges={handleSaveChanges}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <div style={{ minHeight: "70vh" }}>
                <WorkExperienceForm
                  formRef={formRef2}
                  onSubmit={() => handleSubmit(formRef2, "2", 2)}
                  onChange={handleFormChange}
                  onSaveChanges={handleSaveChanges}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <div style={{ minHeight: "70vh" }}>
                <NatureOfWorkForm
                  formRef={formRef3}
                  onSubmit={() => handleSubmit(formRef3, "3", 3)}
                  onChange={handleFormChange}
                  onSaveChanges={handleSaveChanges}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
              <div style={{ minHeight: "70vh" }}>
                <UndergraduateDegreeForm
                  formRef={formRef4}
                  onSubmit={() => handleSubmit(formRef4, "4", 4)}
                  onChange={handleFormChange}
                  onSaveChanges={handleSaveChanges}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={4}>
              <div style={{ minHeight: "70vh" }}>
                <CommunityServiceForm
                  formRef={formRef5}
                  onSubmit={() => handleSubmit(formRef5, "5", 5)}
                  onChange={handleFormChange}
                  onSaveChanges={handleSaveChanges}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={5}>
              <div style={{ minHeight: "70vh" }}>
                <HobbiesForm />
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
