import React, { useEffect, useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "./style";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const ActivityOptions = [
  {
    value: "teaching",
    label: "Teaching",
    description: "Teaching/consulting and entrepreneurship",
  },
  {
    value: "selfLearning",
    label: "Self Learning",
    description: "Self learning and implementation (share market etc)",
  },
  {
    value: "theatre",
    label: "Theatre",
    description: "Theatre and expressive arts",
  },
  {
    value: "sportsMusicArts",
    label: "Others",
    description: "Sports or music or arts",
  },
];

const ExpertiseOptions = [
  {
    value: "international",
    label: "International",
    description: "International level",
  },
  { value: "national", label: "National", description: "National level" },
  { value: "state", label: "State", description: "State level" },
  {
    value: "smallGroups",
    label: "Small",
    description: "Small groups or district or local regions",
  },
];

const YearsOptions = [
  { value: "<1", label: "< 1 ", description: "Less than 1 year" },
  { value: "<2", label: "< 2 ", description: "Less than 2 years" },
  { value: "<3", label: "< 3 ", description: "Less than 3 years" },
  { value: "<5", label: "< 5 ", description: "Less than 5 years" },
  { value: ">=5", label: ">= 5 ", description: "5 years or more" },
];

const HobbiesForm = ({
  onUpdateProgress,
  onFormValidation,
  nextTabMobile,
  prevTabMobile,
}) => {
  const [selectedActivity, setSelectedActivity] = useState(
    JSON.parse(sessionStorage.getItem("hobbies"))?.natureOfActivity
  );
  const [selectedExpertise, setSelectedExpertise] = useState(
    JSON.parse(sessionStorage.getItem("hobbies"))?.levelOfExpertise
  );
  const [selectedYears, setSelectedYears] = useState(
    JSON.parse(sessionStorage.getItem("hobbies"))?.yearsOfInvolvement
  );
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
  useEffect(
    () => {
      // Store default values in sessionStorage when the component is rendered for the first time
      const defaultValues = {
        natureOfActivity: ActivityOptions[0].value,
        levelOfExpertise: ExpertiseOptions[0].value,
        yearsOfInvolvement: YearsOptions[0].value,
      };
      sessionStorage.setItem("hobbies-default", JSON.stringify(defaultValues));

      // Set form values based on the default values
      // You may need to replace this with the actual form library's method to set form values
      // For example, if you are using Ant Design Form, it would be form.setFieldsValue(defaultValues);
    },
    [
      /* Add dependencies if needed */
    ]
  );

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      natureOfActivity: selectedActivity,
      levelOfExpertise: selectedExpertise,
      yearsOfInvolvement: selectedYears,
    };
    sessionStorage.setItem("hobbies", JSON.stringify(formValues));
    const nonEmptyCount = [
      selectedActivity,
      selectedExpertise,
      selectedYears,
    ].filter(Boolean).length;

    onUpdateProgress("hobbies", nonEmptyCount);
    onFormValidation("hobbies", 5);
    //eslint-disable-next-line
  }, [selectedActivity, selectedExpertise, selectedYears]);
  const handleCardClick = (key, value) => {
    if (key === "natureOfActivity") {
      setSelectedActivity(value);
    } else if (key === "levelOfExpertise") {
      setSelectedExpertise(value);
    } else if (key === "yearsOfInvolvement") {
      setSelectedYears(value);
    }
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <div className=" container-fluid">
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
            <h6 className="text-left mb-2">Nature of activity</h6>
            <div className="college-cards">
              {ActivityOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedActivity === option.value ? "selected-card" : ""
                    }`}
                    onClick={() =>
                      handleCardClick("natureOfActivity", option.value)
                    }
                  >
                    <p>{option.label}</p>
                  </Card>
                </Tooltip>
              ))}
            </div>

            <h6 className="text-left mb-2">Expertise level</h6>
            <div className="college-cards">
              {ExpertiseOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedExpertise === option.value ? "selected-card" : ""
                    }`}
                    onClick={() =>
                      handleCardClick("levelOfExpertise", option.value)
                    }
                  >
                    <p>{option.label}</p>
                  </Card>
                </Tooltip>
              ))}
            </div>

            <h6 className="text-left mb-2">Years involved</h6>
            <div className="college-cards">
              {YearsOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedYears === option.value ? "selected-card" : ""
                    }`}
                    onClick={() =>
                      handleCardClick("yearsOfInvolvement", option.value)
                    }
                  >
                    <p>{option.label}</p>
                  </Card>
                </Tooltip>
              ))}
            </div>
          </Form>
          {isMobile ? (
            <div className=" mt-5 ">
              {selectedActivity && selectedExpertise && selectedYears ? (
                <button
                  onClick={nextTabMobile}
                  className="btn btn-lg btn-primary  w-50 d-flex w-100  mb-3 justify-content-between align-items-center"
                >
                  Next <ArrowRightOutlined />{" "}
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-lg btn-primary w-50 d-flex w-100 mb-3  justify-content-between  align-items-center"
                >
                  Next <ArrowRightOutlined />
                </button>
              )}
              <button
                className="btn border btn-lg w-50 d-flex justify-content-between w-100   align-items-center"
                onClick={prevTabMobile}
              >
                <ArrowLeftOutlined /> Back
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </BasicDetailsFormStyled>
    </>
  );
};

export default HobbiesForm;
