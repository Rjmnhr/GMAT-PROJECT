import React, { useRef, useState } from "react";
import NavBar from "../../components/nav-bar";
import { Tabs, message } from "antd";
import BasicDetailsForm from "../../components/profiler-forms/basic-details";
import WorkExperienceForm from "../../components/profiler-forms/work-experience";
import UndergraduateDegreeForm from "../../components/profiler-forms/graduate-form";
import CommunityServiceForm from "../../components/profiler-forms/community-service-form";
import HobbiesForm from "../../components/profiler-forms/hobbies-form";
import { ProfilerPageStyled } from "./style";
import NatureOfWorkForm from "../../components/profiler-forms/work-experience/nature-of-work";

const ProfilerPage = () => {
  const { TabPane } = Tabs;
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  const formRef3 = useRef(null);
  const formRef4 = useRef(null);
  const formRef5 = useRef(null);

  const [activeKey, setActiveKey] = useState("1");
  const [completedForms, setCompletedForms] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleTabChange = (key) => {
    if (unsavedChanges) {
      message.warning("Please save changes before moving to another form.");
    } else {
      setActiveKey(key);
    }
  };

  const handleSubmitBasicDetails = () => {
    formRef1.current
      .validateFields()
      .then(() => {
        // message.success("Basic Details form submitted!");
        setCompletedForms((prev) => [...prev, "1"]);
        setActiveKey("2");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmitWorkExperience = () => {
    formRef2.current
      .validateFields()
      .then(() => {
        // message.success("Work Experience form submitted!");
        setCompletedForms((prev) => [...prev, "2"]);
        setActiveKey("3");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmitNatureOfExperience = () => {
    formRef3.current
      .validateFields()
      .then(() => {
        // message.success("Work Experience form submitted!");
        setCompletedForms((prev) => [...prev, "3"]);
        setActiveKey("4");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmitGraduate = () => {
    formRef4.current
      .validateFields()
      .then(() => {
        // message.success("Graduate degree form submitted!");
        setCompletedForms((prev) => [...prev, "4"]);
        setActiveKey("5");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmitService = () => {
    formRef5.current
      .validateFields()
      .then(() => {
        // message.success("Community Service form submitted!");
        setCompletedForms((prev) => [...prev, "5"]);
        setActiveKey("6");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleFormChange = () => {
    setUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    message.success("Changes saved!");
    setUnsavedChanges(false);
  };

  return (
    <>
      <ProfilerPageStyled>
        <div className={`${activeKey === "1" ? "background-container" : ""}`}>
          <NavBar />
          <img
            src={
              "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1700885900/hihviyhqjhupwqeqr8gr.png"
            }
            alt=""
            style={{
              width: "50%",
              position: "absolute",
              left: "0",
              bottom: "0",
              display: `${activeKey === "1" ? "none" : "block"}`,
            }}
          />
          <div className="container">
            <div
              className="vh-100 container col-12"
              style={{
                paddingTop: "100px",
                display: "grid",
                alignContent: "center",
                justifyContent: "start",
              }}
            >
              <div>
                <div
                  style={{
                    textAlign: `${activeKey === "1" ? "left" : "center"}`,
                    display: `${activeKey === "1" ? "block" : "none"}`,
                  }}
                  class="section-title pb-0 "
                >
                  <h2>
                    {" "}
                    {activeKey === "1"
                      ? "Get started filling your basic details"
                      : "Describe the Company"}{" "}
                  </h2>
                </div>

                <Tabs
                  tabBarStyle={{ display: "none" }}
                  activeKey={activeKey}
                  centered
                  onChange={handleTabChange}
                  animated={false} // Disable Ant Design default animation
                >
                  <TabPane
                    className="display"
                    tab="Your Basic Details"
                    key="1"
                    style={{ transition: "opacity 0.3s ease-in-out" }}
                  >
                    <BasicDetailsForm
                      formRef={formRef1}
                      onSubmit={handleSubmitBasicDetails}
                      onChange={handleFormChange}
                      onSaveChanges={handleSaveChanges}
                    />
                  </TabPane>
                  <TabPane
                    tab="Your Work Experience"
                    key="2"
                    disabled={!completedForms.includes("1")}
                  >
                    <div
                      className={`tab-content ${
                        activeKey !== "2" ? "tab-content-hidden" : ""
                      }`}
                    >
                      <WorkExperienceForm
                        formRef={formRef2}
                        onSubmit={handleSubmitWorkExperience}
                        onChange={handleFormChange}
                        onSaveChanges={handleSaveChanges}
                      />
                    </div>
                  </TabPane>
                  <TabPane
                    tab="Nature of Experience"
                    key="3"
                    disabled={!completedForms.includes("2")}
                  >
                    <div
                      className={`tab-content ${
                        activeKey !== "3" ? "tab-content-hidden" : ""
                      }`}
                    >
                      <NatureOfWorkForm
                        formRef={formRef3}
                        onSubmit={handleSubmitNatureOfExperience}
                        onChange={handleFormChange}
                        onSaveChanges={handleSaveChanges}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab="Your Undergraduate Degree"
                    key="4"
                    disabled={!completedForms.includes("3")}
                  >
                    <UndergraduateDegreeForm
                      formRef={formRef4}
                      onSubmit={handleSubmitGraduate}
                      onChange={handleFormChange}
                      onSaveChanges={handleSaveChanges}
                    />
                  </TabPane>
                  <TabPane
                    tab="Community Service"
                    key="5"
                    disabled={!completedForms.includes("4")}
                  >
                    <CommunityServiceForm
                      formRef={formRef5}
                      onSubmit={handleSubmitService}
                      onChange={handleFormChange}
                      onSaveChanges={handleSaveChanges}
                    />
                  </TabPane>
                  <TabPane
                    tab="Hobbies"
                    key="6"
                    disabled={!completedForms.includes("4")}
                  >
                    <HobbiesForm />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </ProfilerPageStyled>
    </>
  );
};

export default ProfilerPage;
