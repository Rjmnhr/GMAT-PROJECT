import React, { useEffect, useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const CollegeTypeOptions = [
  {
    value: "premier",
    label: "Premier",
    description: "Top 10-15 in your field of specialization",
  },
  {
    value: "selective",
    label: "Selective",
    description: "Selective/hard to get into",
  },
  {
    value: "recognized",
    label: "Recognized",
    description: "Recognized within the state and entry is restrictive",
  },
  {
    value: "new",
    label: "New",
    description: "New/relatively easy to get in/significant quotas in place",
  },
];

const PerformanceOptions = [
  {
    value: "top5",
    label: "Top 5%",
    description: "High Distinction",
  },
  {
    value: "top10",
    label: "Top 10%",
    description: "Distinction",
  },
  {
    value: "top30",
    label: "Top 30%",
    description: "Credit",
  },
  {
    value: "average",
    label: "Average",
    description: "Average",
  },
  {
    value: "bottom50",
    label: "Bottom 50%",
    description: "Below Average",
  },
];

const UndergraduateDegreeForm = ({ onUpdateProgress, onFormValidation }) => {
  const [selectedCollegeType, setSelectedCollegeType] = useState(
    JSON.parse(sessionStorage.getItem("graduate"))?.collegeType
  );
  const [selectedPerformance, setSelectedPerformance] = useState(
    JSON.parse(sessionStorage.getItem("graduate"))?.yourPerformance
  );

  useEffect(() => {
    // Store default values in session storage when the component is rendered for the first time
    const defaultValues = {
      collegeType: "premier",
      yourPerformance: "top5",
    };
    sessionStorage.setItem("graduate-default", JSON.stringify(defaultValues));

    // Set form values based on the default values
  }, []);

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      collegeType: selectedCollegeType,
      yourPerformance: selectedPerformance,
    };
    sessionStorage.setItem("graduate", JSON.stringify(formValues));
    const nonEmptyCount = [selectedCollegeType, selectedPerformance].filter(
      Boolean
    ).length;

    onUpdateProgress("graduate", nonEmptyCount);
    onFormValidation("graduate", 4);
    //eslint-disable-next-line
  }, [selectedCollegeType, selectedPerformance]);

  const handleCardClick = (key, value) => {
    if (key === "collegeType") {
      setSelectedCollegeType(value);
    } else if (key === "yourPerformance") {
      setSelectedPerformance(value);
    }
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <div style={{ display: "flex" }} className=" container-fluid">
          <Form labelCol={{ span: 10 }} wrapperCol={{ span: 16 }}>
            <h5 className="text-left mb-2">College type </h5>
            <div className="college-cards">
              {CollegeTypeOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedCollegeType === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() => handleCardClick("collegeType", option.value)}
                  >
                    <p>{option.label}</p>
                  </Card>
                </Tooltip>
              ))}
            </div>

            <h5 className="text-left mb-2">Your performance </h5>
            <div className="college-cards">
              {PerformanceOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedPerformance === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() =>
                      handleCardClick("yourPerformance", option.value)
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

export default UndergraduateDegreeForm;
