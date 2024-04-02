import React, { useEffect, useState } from "react";
import { Form, Card, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "./style";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const companySizeOptions = [
  {
    value: "<1000",
    label: "<1000",
    description: "Less than 1000",
    url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702002190/fnyy5cx0b5lwtjrafvow.png",
  },
  {
    value: "<5000",
    label: "5000",
    description: "Less than 5000",
    url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702003180/lv4v2rci23fuvf0guh5i.png",
  },
  {
    value: "<10000",
    label: "<10000",
    description: "Less than 10000",
    url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702003087/lb73i0ewboauc4zrn98m.png",
  },
  {
    value: "≥10000",
    label: "≥10000",
    description: "Greater than or equal to 10000",
    url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702003231/cm6n9q3amoalxhjcqikk.png",
  },
];

const WorkExperienceForm = ({
  onUpdateProgress,
  onFormValidation,
  nextTabMobile,
  prevTabMobile,
}) => {
  const [isMobile, setIsMobile] = useState(false);
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
      url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701939881/v2eovelvggqkk5r8fuox.png",
    },
    {
      value: "multipleLocations",
      label: "Multiple Locations",
      description: "Company operates in multiple locations across a continent",
      url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701941485/fzzhoxaktikctv7qp7qh.png",
    },
    {
      value: "multipleContinents",
      label: "Multiple Continents",
      description: "Company operates in multiple continents",
      url: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701941588/fpqtfv6dw8vlyejifo6b.png",
    },
  ];

  return (
    <>
      <BasicDetailsFormStyled>
        <div
          className={` p-0 p-lg-3 col-lg-10  container`}
          data-aos="fade-left"
        >
          <Form className="p-0" name="workExperienceForm">
            <div className="d-lg-flex align-items-start justify-content-between">
              <div>
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

                <h5 className="text-left mb-2">
                  Company's geographical reach{" "}
                </h5>
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
                        <img src={option.url} alt="" />
                      </Card>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-left mb-2">Company size </h5>
                <div className="d-flex mt-2">
                  {companySizeOptions.map((option) => (
                    <Tooltip title={option.description} key={option.value}>
                      <Card
                        style={{ height: "auto" }}
                        className={`college-card ${
                          selectedCompanySize === option.value
                            ? "selected-card"
                            : ""
                        }`}
                        onClick={() => handleCompanySizeCardClick(option.value)}
                      >
                        <img src={option.url} alt="" />
                      </Card>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </Form>
          {isMobile ? (
            <div className=" mt-5 ">
              {selectedCompanySize &&
              selectedGeographicalReach &&
              selectedType ? (
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

export default WorkExperienceForm;
