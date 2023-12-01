import React, { useEffect, useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

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

const HobbiesForm = ({ formRef }) => {
  const [selectedActivity, setSelectedActivity] = useState(
    ActivityOptions[0].value
  );
  const [selectedExpertise, setSelectedExpertise] = useState(
    ExpertiseOptions[0].value
  );
  const [selectedYears, setSelectedYears] = useState(YearsOptions[0].value);

  useEffect(() => {
    // Store default values in sessionStorage when the component is rendered for the first time
    const defaultValues = {
      natureOfActivity: ActivityOptions[0].value,
      levelOfExpertise: ExpertiseOptions[0].value,
      yearsOfInvolvement: YearsOptions[0].value,
    };
    sessionStorage.setItem("hobbies", JSON.stringify(defaultValues));
  }, []);

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      natureOfActivity: selectedActivity,
      levelOfExpertise: selectedExpertise,
      yearsOfInvolvement: selectedYears,
    };
    sessionStorage.setItem("hobbies", JSON.stringify(formValues));
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
            <h5 className="text-left mb-2">Nature of activity</h5>
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

            <h5 className="text-left mb-2">Expertise level</h5>
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

            <h5 className="text-left mb-2">Years involved</h5>
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
        </div>
      </BasicDetailsFormStyled>
    </>
  );
};

export default HobbiesForm;
