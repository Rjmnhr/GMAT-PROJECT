import React, { useEffect, useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const ActivityOptions = [
  {
    value: "international",
    label: "International",
    description: "International community service",
  },
  {
    value: "national",
    label: "National",
    description: "National community service",
  },
  {
    value: "stateWide",
    label: "State",
    description: "State-wide community service",
  },
  {
    value: "localised",
    label: "Localised",
    description: "Localised community service",
  },
];

const ContributionOptions = [
  {
    value: "leading",
    label: "Leading",
    description: "Leading activities/groups",
  },
  {
    value: "regular",
    label: "Regular",
    description: "Regularly part of a team doing activities",
  },
  {
    value: "sometimes",
    label: "Sometimes",
    description: "Sometimes being involved in some activities",
  },
  {
    value: "rarely",
    label: "Rarely",
    description: "Rarely being involved in any activity",
  },
];

const YearsOptions = [
  { value: "<1", label: "< 1", description: "Less than 1 year" },
  { value: "<2", label: "< 2", description: "Less than 2 years" },
  { value: "<3", label: "< 3", description: "Less than 3 years" },
  { value: "<5", label: "< 5", description: "Less than 5 years" },
  { value: ">=5", label: ">= 5", description: "5 years or more" },
];

const CommunityServiceForm = ({ onUpdateProgress, onFormValidation }) => {
  const [selectedActivity, setSelectedActivity] = useState(
    JSON.parse(sessionStorage.getItem("service"))?.natureOfActivity
  );
  const [selectedContribution, setSelectedContribution] = useState(
    JSON.parse(sessionStorage.getItem("service"))?.levelOfContribution
  );
  const [selectedYears, setSelectedYears] = useState(
    JSON.parse(sessionStorage.getItem("service"))?.yearsOfInvolvement
  );

  const handleCardClick = (key, value) => {
    if (key === "natureOfActivity") {
      setSelectedActivity(value);
    } else if (key === "levelOfContribution") {
      setSelectedContribution(value);
    } else if (key === "yearsOfInvolvement") {
      setSelectedYears(value);
    }
  };

  useEffect(
    () => {
      // Store default values in sessionStorage when the component is rendered for the first time
      const defaultValues = {
        natureOfActivity: ActivityOptions[0].value,
        levelOfContribution: ContributionOptions[0].value,
        yearsOfInvolvement: YearsOptions[0].value,
      };
      sessionStorage.setItem("service-default", JSON.stringify(defaultValues));

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
      levelOfContribution: selectedContribution,
      yearsOfInvolvement: selectedYears,
    };
    sessionStorage.setItem("service", JSON.stringify(formValues));
    const nonEmptyCount = [
      selectedActivity,
      selectedContribution,
      selectedYears,
    ].filter(Boolean).length;

    onUpdateProgress("service", nonEmptyCount);
    onFormValidation("service", 5);
    //eslint-disable-next-line
  }, [selectedActivity, selectedContribution, selectedYears]);

  return (
    <>
      <BasicDetailsFormStyled>
        <div className=" container-fluid">
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
            <h5 className="text-left mb-2">Nature of activity </h5>
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

            <h5 className="text-left mb-2">Contribution level</h5>
            <div className="college-cards">
              {ContributionOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedContribution === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() =>
                      handleCardClick("levelOfContribution", option.value)
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

export default CommunityServiceForm;
