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
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import GoalsForm from "../../components/profiler-forms/goals-form";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../components/axios";

const ProfilerPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [totalNonEmptyCountValue, setTotalNonEmptyCountValue] = useState(
    sessionStorage.getItem("totalNonEmptyCount") || 0
  );
  //eslint-disable-next-line
  const [overAllProgress, setOverAllProgress] = useState(0);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const totalQuestions = 28;
  const storedProgress =
    parseInt(sessionStorage.getItem("totalNonEmptyCount")) || 0;


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

  const handleSaveAndContinue = () => {
    try {
      updateFormValues("basic-details");
      updateFormValues("experience");

      updateFormValues("natureExperience");
      updateFormValues("graduate");
      updateFormValues("service");
      updateFormValues("hobbies");
      updateFormValues("goalsInputObject");
      sessionStorage.removeItem("form-filled");
      navigate("/selection-chance");
    } catch {
      messageApi.open({
        type: "error",
        content: "Answer at least one from each section to continue",
      });
    }
  };
  const updateFormValues = (formName) => {
    const defaultValues = JSON.parse(
      sessionStorage.getItem(`${formName}-default`)
    );
    console.log(
      "🚀 ~ file: index.js:53 ~ updateFormValues ~ defaultValues:",
      defaultValues
    );
    const currentValues = JSON.parse(sessionStorage.getItem(formName));
    console.log(
      "🚀 ~ file: index.js:54 ~ updateFormValues ~ currentValues:",
      currentValues
    );

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
  // useEffect(() => {
  //   // Clear session storage items when the component is reloaded
  //   const handleBeforeUnload = () => {
  //     sessionStorage.removeItem("experience");
  //     sessionStorage.removeItem("experience-default");
  //     sessionStorage.removeItem("natureExperience");
  //     sessionStorage.removeItem("natureExperience-default");
  //     sessionStorage.removeItem("basic-details");
  //     sessionStorage.removeItem("basic-details-default");
  //     sessionStorage.removeItem("graduate");
  //     sessionStorage.removeItem("graduate-default");
  //     sessionStorage.removeItem("service");
  //     sessionStorage.removeItem("service-default");
  //     sessionStorage.removeItem("hobbies");
  //     sessionStorage.removeItem("hobbies-default");
  //     sessionStorage.removeItem("goalsInputObject");
  //     sessionStorage.removeItem("goalsInputObject-default");
  //   };

  //   // Attach the event listener for beforeunload
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

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
    if (storedProgress < totalNonEmptyCount) {
      sessionStorage.setItem("totalNonEmptyCount", totalNonEmptyCount);
    }

    const overallProgressPercentage =
      (totalNonEmptyCount / totalQuestions) * 100;

    setOverAllProgress(overallProgressPercentage?.toFixed(2));
  }, [progress, storedProgress]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  // const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

  const handleFormValidation = (formName, tab) => {
    const defaultValues = JSON.parse(
      sessionStorage.getItem(`${formName}-default`)
    );
    const currentValues = JSON.parse(sessionStorage.getItem(formName));
    if (defaultValues && !isMobile) {
      const missingKeys = Object.keys(defaultValues).filter(
        (key) => !currentValues.hasOwnProperty(key)
      );

      if (formName === "service" || formName === "hobbies") {
        const validate = checkServiceAndHobbiesForms();

        if (validate) {
          const isFormAlreadyFilled = sessionStorage.getItem(
            `${formName}-filled`
          );

          // Check if the form was not already marked as filled
          if (!isFormAlreadyFilled) {
            // Mark the form as filled
            sessionStorage.setItem(`${formName}-filled`, "true");

            // If the tab is not the last one, navigate to the next tab
            if (tab !== 6) {
              setActiveTab(tab);
              return;
            } else {
              navigate("/selection-chance");
            }
          }
        } else {
          sessionStorage.removeItem(`${formName}-filled`);
          return;
        }

        // If both "service" and "hobbies" forms are filled, navigate to the next tab
      }
      if (missingKeys.length === 0) {
        const isFormAlreadyFilled = sessionStorage.getItem(
          `${formName}-filled`
        );

        // Check if the form was not already marked as filled
        if (!isFormAlreadyFilled) {
          // Mark the form as filled
          sessionStorage.setItem(`${formName}-filled`, "true");

          // If the tab is not the last one, navigate to the next tab
          if (tab !== 6) {
            setActiveTab(tab);
          } else {
            navigate("/selection-chance");
          }
        }
      } else {
        // Mark the form as not filled
        sessionStorage.removeItem(`${formName}-filled`);
      }
    }
    // Check if all keys from defaultValues are present in currentValues
  };
  const checkServiceAndHobbiesForms = () => {
    // Check if both "service" and "hobbies" forms are filled
    const serviceDefaultValues = JSON.parse(
      sessionStorage.getItem("service-default")
    );
    const serviceCurrentValues = JSON.parse(sessionStorage.getItem("service"));

    const hobbiesDefaultValues = JSON.parse(
      sessionStorage.getItem("hobbies-default")
    );
    const hobbiesCurrentValues = JSON.parse(sessionStorage.getItem("hobbies"));

    if (serviceDefaultValues && hobbiesDefaultValues) {
      const missingKeysService = Object.keys(serviceDefaultValues).filter(
        (key) => !serviceCurrentValues.hasOwnProperty(key)
      );
      const missingKeysHobbies = Object.keys(hobbiesDefaultValues).filter(
        (key) => !hobbiesCurrentValues.hasOwnProperty(key)
      );

      if (
        missingKeysService?.length === 0 &&
        missingKeysHobbies?.length === 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  const handleNextTabMobile = () => {
    if (activeTab < 6) {
      setActiveTab((prev) => prev + 1);
    } else {
      handleSaveAndContinue();
    }
  };
  const handlePrevTabMobile = () => {
    if (activeTab > 0) {
      setActiveTab((prev) => prev - 1);
    }
  };
  return (
    <ProfilerPageStyled>
      {contextHolder}
      <Helmet>
        <title>Profiler | Adeft Education</title>
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
        className="container-fluid"
        style={{ background: "rgb(248, 248, 248)" }}
      >
        <div style={{ background: "white" }} className="container p-0 p-lg-2">
          <div
            className="vh-100 container col-12"
            style={{
              marginTop: "100px",
              display: `${isMobile ? "block" : "grid"}`,
              alignContent: "center",
              justifyContent: `${
                activeTab === 0 ? "center" : `${isMobile ? "start" : "center"}`
              }`,
            }}
          >
            <div className="d-lg-flex justify-content-between mb-3 align-items-center">
              <div style={{ textAlign: "left", marginTop: "10px" }}>
                {/* <Progress
                  style={{ display: `${isMobile ? "none" : "inline-block"}` }}
                  size={40}
                  type="circle"
                  percent={overAllProgress}
                  strokeColor={twoColors}
                /> */}
                <span className="text-primary " style={{ fontWeight: "bold" }}>
                  Answered{" "}
                  {storedProgress > totalNonEmptyCountValue
                    ? storedProgress
                    : totalNonEmptyCountValue}{" "}
                  out of {totalQuestions}{" "}
                </span>
              </div>
              <div>
                <button
                  style={{ display: `${isMobile ? "none" : "block"}` }}
                  onClick={handleSaveAndContinue}
                  className="btn btn-primary"
                >
                  Save & continue{" "}
                </button>
              </div>
            </div>
            <Tabs
              style={{ display: `${isMobile ? "none" : "block"}` }}
              orientation={isMobile ? "vertical" : "horizontal"} // Set orientation based on the screen size
              variant={isMobile ? "scrollable" : "standard"} // Use scrollable variant for vertical tabs
              value={activeTab}
              centered={!isMobile} // Center tabs for horizontal layout
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Basic Details" />
              <Tab label="Work Experience" />
              <Tab label="Nature of Experience" />

              <Tab label="Undergraduate Degree" />

              {isMobile ? (
                <>
                  <Tab label="Service" />
                  <Tab label="Hobbies" />
                </>
              ) : (
                <Tab label="Service & Hobbies" />
              )}

              <Tab label="Goals" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
              <div style={{ minHeight: `${isMobile ? "" : "70vh"}` }}>
                <BasicDetailsForm
                  onUpdateProgress={handleUpdateProgress}
                  onFormValidation={handleFormValidation}
                  nextTabMobile={handleNextTabMobile}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <div style={{ minHeight: "70vh" }}>
                <WorkExperienceForm
                  onUpdateProgress={handleUpdateProgress}
                  onFormValidation={handleFormValidation}
                  nextTabMobile={handleNextTabMobile}
                  prevTabMobile={handlePrevTabMobile}
                />
              </div>
            </TabPanel>
            <TabPanel style={{ padding: "0" }} value={activeTab} index={2}>
              <div
                className="scrollable-container"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                <NatureOfWorkForm
                  onUpdateProgress={handleUpdateProgress}
                  onFormValidation={handleFormValidation}
                  nextTabMobile={handleNextTabMobile}
                  prevTabMobile={handlePrevTabMobile}
                />
              </div>
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
              <div style={{ minHeight: "70vh" }}>
                <UndergraduateDegreeForm
                  onUpdateProgress={handleUpdateProgress}
                  onFormValidation={handleFormValidation}
                  nextTabMobile={handleNextTabMobile}
                  prevTabMobile={handlePrevTabMobile}
                />
              </div>
            </TabPanel>
            {isMobile ? (
              <>
                {" "}
                <TabPanel value={activeTab} index={4}>
                  <div style={{ minHeight: "70vh" }}>
                    <CommunityServiceForm
                      onUpdateProgress={handleUpdateProgress}
                      onFormValidation={handleFormValidation}
                      nextTabMobile={handleNextTabMobile}
                      prevTabMobile={handlePrevTabMobile}
                    />
                  </div>
                </TabPanel>
                <TabPanel value={activeTab} index={5}>
                  <div style={{ minHeight: "70vh" }}>
                    <HobbiesForm
                      onUpdateProgress={handleUpdateProgress}
                      onFormValidation={handleFormValidation}
                      nextTabMobile={handleNextTabMobile}
                      prevTabMobile={handlePrevTabMobile}
                    />
                  </div>
                </TabPanel>
                <TabPanel value={activeTab} index={6}>
                  <div style={{ minHeight: "70vh" }}>
                    <GoalsForm
                      onUpdateProgress={handleUpdateProgress}
                      onFormValidation={handleFormValidation}
                      nextTabMobile={handleNextTabMobile}
                      prevTabMobile={handlePrevTabMobile}
                    />
                  </div>
                </TabPanel>
              </>
            ) : (
              <>
                {" "}
                <TabPanel value={activeTab} index={4}>
                  <div
                    style={{
                      minHeight: "70vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <h3 className="text-left pl-3 mb-3">
                        Community Services
                      </h3>
                      <CommunityServiceForm
                        onUpdateProgress={handleUpdateProgress}
                        onFormValidation={handleFormValidation}
                        nextTabMobile={handleNextTabMobile}
                        prevTabMobile={handlePrevTabMobile}
                      />
                    </div>
                    <div>
                      <h3 className="text-left pl-3 mb-3">Hobbies</h3>
                      <HobbiesForm
                        onUpdateProgress={handleUpdateProgress}
                        onFormValidation={handleFormValidation}
                        nextTabMobile={handleNextTabMobile}
                        prevTabMobile={handlePrevTabMobile}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={activeTab} index={5}>
                  <div style={{ minHeight: "70vh" }}>
                    <GoalsForm
                      onUpdateProgress={handleUpdateProgress}
                      onFormValidation={handleFormValidation}
                      nextTabMobile={handleNextTabMobile}
                      prevTabMobile={handlePrevTabMobile}
                    />
                  </div>
                </TabPanel>
              </>
            )}
          </div>
        </div>
      </div>
    </ProfilerPageStyled>
  );
};

export default ProfilerPage;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
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

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: `${isMobile ? "0" : ""}` }} p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
