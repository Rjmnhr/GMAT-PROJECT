import React, { useRef, useState } from "react";
import NavBar from "../../components/nav-bar";
import { Tabs, message } from "antd";
import BasicDetailsForm from "../../components/profiler-forms/basic-details";
import WorkExperienceForm from "../../components/profiler-forms/work-experience";
import UndergraduateDegreeForm from "../../components/profiler-forms/graduate-form";
import CommunityServiceForm from "../../components/profiler-forms/community-service-form";
import HobbiesForm from "../../components/profiler-forms/hobbies-form";

const ProfilerPage = () => {
  const { TabPane } = Tabs;
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  const formRef3 = useRef(null);
  const formRef4 = useRef(null);

  const [activeKey, setActiveKey] = useState("1");

  const handleSubmitBasicDetails = () => {
    formRef1.current
      .validateFields()
      .then(() => {
        message.success("Basic Details form submitted!");
        setActiveKey("2"); // Move to the next tab (Your Work Experience)
        if (formRef2.current) {
          formRef2.current.resetFields(); // Reset fields in the next tab
        }
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmitWorkExperience = () => {
    formRef2.current
      .validateFields()
      .then(() => {
        message.success("Work Experience form submitted!");
        setActiveKey("3");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleSubmitGraduate = () => {
    formRef3.current
      .validateFields()
      .then(() => {
        message.success("Graduate degree form submitted!");
        setActiveKey("4");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };
  const handleSubmitService = () => {
    formRef4.current
      .validateFields()
      .then(() => {
        message.success("Community Service form submitted!");
        setActiveKey("5");
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };
  return (
    <div>
      <NavBar />
      <div className="vh-100 container" style={{ marginTop: "100px" }}>
        <div>
          <div class="section-title pb-0">
            <h2>Your Profile </h2>
          </div>

          <Tabs
            activeKey={activeKey}
            centered
            onChange={(key) => setActiveKey(key)}
          >
            <TabPane tab="Your Basic Details" key="1">
              <BasicDetailsForm
                formRef={formRef1}
                onSubmit={handleSubmitBasicDetails}
              />
            </TabPane>
            <TabPane tab="Your Work Experience" key="2">
              <WorkExperienceForm
                formRef={formRef2}
                onSubmit={handleSubmitWorkExperience}
              />
            </TabPane>
            <TabPane tab="Your Undergraduate Degree" key="3">
              <UndergraduateDegreeForm
                formRef={formRef3}
                onSubmit={handleSubmitGraduate}
              />
            </TabPane>
            <TabPane tab="Community Service" key="4">
              <CommunityServiceForm
                formRef={formRef4}
                onSubmit={handleSubmitService}
              />
            </TabPane>
            <TabPane tab="Hobbies" key="5">
              <HobbiesForm />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilerPage;
