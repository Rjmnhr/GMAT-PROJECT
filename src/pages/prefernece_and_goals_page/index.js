import React, { useState } from "react";
import { Form, Card, Tooltip, Tabs } from "antd";

import { PreferenceAndGoalsPageStyled } from "./style";
import CollegeInformationOutput from "../../components/college-information-output";

const PreferenceForm = ({ onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCardClick = (label, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [label]: value,
    });
  };

  const onFinish = (values) => {
    console.log("🚀 ~ file: index.js:17 ~ onFinish ~ values:", values);
    console.log(selectedOptions);
    onSubmit();
  };

  const options = [
    { value: 4, text: "Most important", label: "Most Important" },
    { value: 3, text: "Important", label: "Important" },
    { value: 2, text: "Important but can do without", label: "Can Do" },
    { value: 1, text: "Not important at all ", label: "Not Important" },
  ];

  const renderCardOptions = (label) => {
    return (
      <div className="college-cards">
        {options.map((option) => (
          <Tooltip title={option.text} key={option.label}>
            <Card
              className="college-card"
              key={option.label}
              onClick={() => handleCardClick(label, option.value)}
              style={{
                border:
                  selectedOptions[label] === option.value
                    ? "2px solid #1890ff"
                    : "2px solid #d9d9d9",
              }}
            >
              <p>{option.value}</p>
            </Card>
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PreferenceAndGoalsPageStyled>
        <h5>Select which of the following matters the most to you</h5>
        <div
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-around",
          }}
          className="mb-3 mt-3"
        >
          <p>4 - Most important and deal breaker</p>
          <p>3 - Important and preferable</p>
          <p>2 - Important but can do without</p>
          <p>1 - Not important at all</p>
        </div>
        <Form onFinish={onFinish}>
          <div className=" d-lg-flex container-fluid">
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
              }}
              className="col-lg-4"
            >
              <Form.Item name="tuitionFee">
                <p className="text-left">Tuition Fee</p>
                {renderCardOptions("tuitionFee")}
              </Form.Item>

              <Form.Item name="internationalMBA">
                <p className="text-left">International MBA</p>
                {renderCardOptions("internationalMBA")}
              </Form.Item>

              <Form.Item name="scholarship">
                <p className="text-left">Scholarship</p>
                {renderCardOptions("scholarship")}
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
              }}
              className="col-lg-4"
            >
              <Form.Item name="weather">
                <p className="text-left">Weather</p>
                {renderCardOptions("weather")}
              </Form.Item>

              <Form.Item name="englishSpeaking">
                <p className="text-left">English speaking</p>
                {renderCardOptions("englishSpeaking")}
              </Form.Item>
              <Form.Item name="livingCountry">
                <p className="text-left">Living (at least 7-10 years)</p>
                {renderCardOptions("livingCountry")}
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
              }}
              className="col-lg-4"
            >
              <Form.Item name="choiceOfCourses">
                <p className="text-left">Choice of courses</p>
                {renderCardOptions("choiceOfCourses")}
              </Form.Item>

              <Form.Item name="internship">
                <p className="text-left">Internship</p>
                {renderCardOptions("internship")}
              </Form.Item>
              <Form.Item name="schoolRanking">
                <p className="text-left">Ranking of school (FT Rankings)</p>
                {renderCardOptions("schoolRanking")}
              </Form.Item>
            </div>
          </div>

          <div className="my-3 text-center" style={{ width: "100%" }}>
            <button htmlType="submit" className="btn btn-lg btn-primary w-25">
              Next
            </button>
          </div>
        </Form>
      </PreferenceAndGoalsPageStyled>
    </div>
  );
};

const AfterMBAForm = ({ onNext, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCardClick = (label, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [label]: value,
    });
  };

  const onFinish = (values) => {
    console.log("🚀 ~ file: index.js:17 ~ onFinish ~ values:", values);
    console.log(selectedOptions);
    onNext();
  };

  const options = [
    { value: 0, text: "Yes", label: "Yes" },
    { value: 0.5, text: "Possibly", label: "Possibly" },
    { value: 1, text: "No", label: "No" },
    { value: 1, text: "Unsure ", label: "Unsure" },
  ];

  const renderCardOptions = (label) => {
    return (
      <div className="college-cards">
        {options.map((option) => (
          <Card
            className="college-card"
            key={option.label}
            onClick={() => handleCardClick(label, option.label)}
            style={{
              border:
                selectedOptions[label] === option.label
                  ? "2px solid #1890ff"
                  : "2px solid #d9d9d9",
            }}
          >
            <p>{option.label}</p>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PreferenceAndGoalsPageStyled>
        <h5 className="mb-3 mt-3">
          After your MBA, compared to where you are now, which of these changes
          apply to you (select all that apply)
        </h5>

        <Form onFinish={onFinish}>
          <div className=" d-lg-flex container-fluid">
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
              }}
              className="col-lg-12"
            >
              <Form.Item name="location">
                <p className="text-left">Change of location</p>
                {renderCardOptions("location")}
              </Form.Item>

              <Form.Item name="industry">
                <p className="text-left"> Change of industry</p>
                {renderCardOptions("industry")}
              </Form.Item>

              <Form.Item name="function">
                <p className="text-left">Change of function</p>
                {renderCardOptions("function")}
              </Form.Item>
            </div>
          </div>

          <div
            className="my-3 text-center d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <button
              onClick={onBack}
              className="btn btn-lg border"
              style={{ marginRight: 8 }}
            >
              Back
            </button>
            <button htmlType="submit" className="btn btn-lg btn-primary w-25">
              Next
            </button>
          </div>
        </Form>
      </PreferenceAndGoalsPageStyled>
    </div>
  );
};

const PreferenceAndGoalsPage = () => {
  const [currentStep, setCurrentStep] = useState("1");
  const { TabPane } = Tabs;
  const handleNext = () => {
    setCurrentStep(() => {
      const updated = parseInt(currentStep) + 1;
      return updated.toString();
    });
  };

  const handleBack = () => {
    setCurrentStep(() => {
      const updated = parseInt(currentStep) - 1;
      return updated.toString();
    });
  };

  return (
    <div className="container-fluid">
      <Tabs
        tabBarStyle={{
          display: "none",
        }}
        activeKey={currentStep}
        centered
      >
        <TabPane className="display" tab="Preference" key="1">
          <PreferenceForm onSubmit={handleNext} />
        </TabPane>
        <TabPane className="display" tab="after MBA" key="2">
          <AfterMBAForm onNext={handleNext} onBack={handleBack} />
        </TabPane>
        <TabPane className="display" tab="output" key="3">
          <CollegeInformationOutput />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PreferenceAndGoalsPage;
