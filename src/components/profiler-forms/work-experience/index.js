import React, { useEffect, useState } from "react";
import { Form, Card, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const companySizeOptions = [
  {
    value: "<1000",
    label: "<1000",
    description: "Less than 1000",
  },
  {
    value: "<5000",
    label: "5000",
    description: "Less than 5000",
  },
  {
    value: "<10000",
    label: "<10000",
    description: "Less than 10000",
  },
  {
    value: "≥10000",
    label: "≥10000",
    description: "Greater than or equal to 10000",
  },
];

const WorkExperienceForm = ({ onUpdateProgress, onFormValidation }) => {
  const [selectedType, setSelectedType] = useState(
    JSON.parse(sessionStorage.getItem("experience"))?.type
  );
  const [selectedGeographicalReach, setSelectedGeographicalReach] = useState(
    JSON.parse(sessionStorage.getItem("experience"))?.geographicalReach
  );
  const [selectedCompanySize, setSelectedCompanySize] = useState(
    JSON.parse(sessionStorage.getItem("experience"))?.companySize
  );

  useEffect(() => {
    // Store default values in session storage when the component is rendered for the first time
    const defaultValues = {
      type: "Product",
      geographicalReach: "oneLocation",
      companySize: "<1000",
    };
    sessionStorage.setItem("experience-default", JSON.stringify(defaultValues));
  }, []);

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      type: selectedType,
      geographicalReach: selectedGeographicalReach,
      companySize: selectedCompanySize,
    };
    sessionStorage.setItem("experience", JSON.stringify(formValues));
    const nonEmptyCount = [
      selectedType,
      selectedGeographicalReach,
      selectedCompanySize,
    ].filter(Boolean).length;

    onUpdateProgress("experience", nonEmptyCount);
    onFormValidation("experience", 2);
    //eslint-disable-next-line
  }, [selectedType, selectedGeographicalReach, selectedCompanySize]);

  const handleTypeCardClick = (type) => {
    setSelectedType(type);
  };

  const handleGeographicalReachOptionClick = (option) => {
    setSelectedGeographicalReach(option);
  };

  const handleCompanySizeCardClick = (size) => {
    setSelectedCompanySize(size);
  };

  const geographicalReachOptions = [
    {
      value: "oneLocation",
      label: "One Location",
      description: "Company operates in a single location",
    },
    {
      value: "multipleLocations",
      label: "Multiple Locations",
      description: "Company operates in multiple locations across a continent",
    },
    {
      value: "multipleContinents",
      label: "Multiple Continents",
      description: "Company operates in multiple continents",
    },
  ];

  return (
    <>
      <BasicDetailsFormStyled>
        <div className={`col-lg-8 p-0 p-lg-3  container`}>
          <Form
            className="p-0"
            name="workExperienceForm"
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 16 }}
          >
            <h5 className="text-left mb-2">Company type </h5>
            <div className="age-cards mt-2">
              {[
                {
                  label: "Product",
                  url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701443744/gakt7sccsbxjxdh1oqvf.png",
                },
                {
                  label: "Services",
                  url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701444050/gs2ttnhot7wyls3obcxh.png",
                },
              ].map((type) => (
                <Tooltip title={type.label} key={type.label}>
                  <div
                    style={{
                      marginRight: "12px",
                      marginTop: "8px",
                      marginLeft: "0",
                    }}
                    key={type.label}
                    className={`age-card ${
                      selectedType === type.label ? "selected-card" : ""
                    }`}
                    onClick={() => handleTypeCardClick(type.label)}
                  >
                    <img src={type.url} alt="" />
                  </div>
                </Tooltip>
              ))}
            </div>

            <h5 className="text-left mb-2">Company's geographical reach </h5>
            <div className="age-cards mt-2">
              {geographicalReachOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedGeographicalReach === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() =>
                      handleGeographicalReachOptionClick(option.value)
                    }
                  >
                    <p>{option.label}</p>
                  </Card>
                </Tooltip>
              ))}
            </div>

            <h5 className="text-left mb-2">Company size </h5>
            <div className="age-cards mt-2">
              {companySizeOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedCompanySize === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() => handleCompanySizeCardClick(option.value)}
                  >
                    <p>{option.value}</p>
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

export default WorkExperienceForm;
