import React, { useEffect, useRef, useState } from "react";
import { Form, Carousel } from "antd";

import { StarFilled, StarOutlined } from "@ant-design/icons";

import ApplicationStrategyOutput from "../../components/application-strategy-output";

const PreferenceForm = ({ onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [allInputsSelected, setAllInputsSelected] = useState(false);

  useEffect(() => {
    // Check if all options have been selected
    const areAllInputsSelected = options.every(
      (option) => selectedOptions[option.label] !== undefined
    );

    setAllInputsSelected(areAllInputsSelected);
    //eslint-disable-next-line
  }, [selectedOptions]);

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
  const handleStarClick = (label, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [label]: value,
    });
  };

  const onFinish = (values) => {
    console.log("🚀 ~ file: index.js:17 ~ onFinish ~ values:", values);
    console.log(selectedOptions);
    sessionStorage.setItem(
      "applicationSkillInputObject",
      JSON.stringify(selectedOptions)
    );
    onSubmit();
  };

  const options = [
    { label: "innovativeThinking", text: "Innovative Thinking" },
    { label: "problemSolving", text: "Problem Solving" },
    { label: "selfMotivated", text: "Self Motivated" },
    { label: "multiTasking", text: "Multi-tasking" },
    {
      label: "seniorStakeholderManagement",
      text: "Senior Stakeholder Management",
    },
    { label: "teamWork", text: "Team Work" },
    { label: "reportWriting", text: "Report Writing/Board Papers" },
    { label: "excel", text: "Excel" },
    { label: "strategy", text: "Strategy" },
    { label: "marketing", text: "Marketing" },
    { label: "finance", text: "Finance" },
    { label: "technology", text: "Technology" },
    { label: "hr", text: "HR" },
    { label: "operations", text: "Operations" },
  ];

  const renderStarOptions = (label) => {
    const maxRating = 4;

    return (
      <div style={{ gap: "8px" }} className="d-flex star-ratings">
        {[...Array(maxRating)].map((_, index) => {
          const ratingValue = index + 1; // Change here to reverse the order

          return (
            <div
              className="star-icon "
              key={index}
              onClick={() => handleStarClick(label, ratingValue)}
              style={{
                color:
                  selectedOptions[label] >= ratingValue ? "#FFD700" : "#d9d9d9",
                transition: "color 0.3s ease-in-out",
                marginLeft: "5px", // Adjust as needed
              }}
            >
              {selectedOptions[label] >= ratingValue ? (
                <img
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701664950/yme8l5iqy91jan3oc5lk.png"
                  alt=""
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701938737/qunal5unjsxk9soqg5ze.png"
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h3>Select the following to rate yourself</h3>
      {isMobile ? (
        ""
      ) : (
        <div
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          className="mb-3 mt-3"
        >
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <span style={{ marginLeft: "8px" }}>Highly Skilled</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>Skilled</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>Developing the skill</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>No idea</span>
          </div>
        </div>
      )}

      <Form onFinish={onFinish}>
        <div
          style={{ height: "60vh", overflowY: "scroll" }}
          className="container-fluid scrollable-container"
        >
          {options.map((option) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyConte: "center",
                alignItems: "center",
              }}
              key={option.label}
              className="star-rating-container w-100"
            >
              <div
                style={{
                  padding: "0.575rem 1rem",
                  boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className={`d-flex ${
                  isMobile ? "w-100" : "w-75"
                }  mb-2 justify-content-between align-items-center `}
              >
                {" "}
                <h6 className="text-left">{option.text}</h6>
                {renderStarOptions(option.label)}
              </div>
            </div>
          ))}
        </div>
        <div className="my-3 text-center" style={{ width: "100%" }}>
          <button
            htmlType="submit"
            className={`btn btn-lg btn-primary ${isMobile ? "w-75" : "w-25"}  `}
            disabled={!allInputsSelected}
          >
            Next
          </button>
        </div>
      </Form>
    </div>
  );
};

const ApplicationStrategyPage = () => {
  const formFilled = sessionStorage.getItem("form-filled-application");
  const [currentStep, setCurrentStep] = useState(formFilled === "true" ? 1 : 0);

  const carouselRef = useRef(null);

  useEffect(() => {
    if (formFilled === "true" && carouselRef.current) {
      carouselRef.current.goTo(1);
    }
  }, [formFilled]);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handleTryAgain = () => {
    sessionStorage.setItem("form-filled-application", false);
    carouselRef.current.goTo(0);
    setCurrentStep(0);
  };

  return (
    <div className="container-fluid">
      <Carousel
        ref={carouselRef}
        dotPosition="bottom"
        afterChange={(index) => setCurrentStep(index)}
        beforeChange={() => {}}
        current={currentStep}
        dots={null}
      >
        <div>
          <PreferenceForm onSubmit={handleNext} />
        </div>

        <div>
          {currentStep === 1 && <ApplicationStrategyOutput />}
          {currentStep === 1 && (
            <div className="mb-3  mb-lg-0">
              <button
                className="btn-primary btn btn-lg mb-5 mt-lg-3 mb-lg-3"
                onClick={handleTryAgain}
              >
                Try filling form again
              </button>
            </div>
          )}
        </div>
      </Carousel>
    </div>
  );
};
export default ApplicationStrategyPage;
