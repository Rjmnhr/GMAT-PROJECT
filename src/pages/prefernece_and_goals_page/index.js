import React, { useEffect, useState } from "react";
import { Form, Card, Tabs } from "antd";

import { PreferenceAndGoalsPageStyled } from "./style";
import CollegeInformationOutput from "../../components/college-information-output";
import { StarFilled, StarOutlined } from "@ant-design/icons";

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
      setIsMobile(window.innerWidth < 912);
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
    sessionStorage.setItem(
      "preferenceInputObject",
      JSON.stringify(selectedOptions)
    );
    onSubmit();
  };

  const options = [
    { label: "tuitionFee", text: "Tuition Fee" },
    { label: "internationalMBA", text: "International MBA" },
    { label: "scholarship", text: "Scholarship" },
    { label: "weather", text: "Weather" },
    { label: "englishSpeaking", text: "English speaking" },
    { label: "livingCountry", text: "Living (at least 7-10 years)" },
    { label: "choiceOfCourses", text: "Choice of courses" },
    { label: "internship", text: "Internship" },
    { label: "schoolRanking", text: "Ranking of school (FT Rankings)" },
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
      <h3>Select which of the following matters the most to you</h3>

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
            <span style={{ marginLeft: "8px" }}>
              Most important and deal breaker
            </span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>Important and preferable</span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>
              Important but can do without
            </span>
          </div>
          <div>
            <StarFilled style={{ color: "#FFD700" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <StarOutlined style={{ color: "#abb0ad" }} />
            <span style={{ marginLeft: "8px" }}>Not important at all</span>
          </div>
        </div>
      )}

      <Form onFinish={onFinish}>
        <div
          style={{ minHeight: "60vh" }}
          className="container-fluid p-0 mt-3 mt-lg-2 scrollable-container d-lg-flex align-items-center justify-content-between flex-wrap mt-5"
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
              className={`star-rating-container  ${
                isMobile ? "w-100" : "w-50"
              } `}
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
        <div
          className="mt-5 my-lg-3 text-center"
          style={{ width: "100%", marginBottom: "6rem" }}
        >
          <button
            disabled={!allInputsSelected}
            htmlType="submit"
            className={`btn btn-lg btn-primary ${isMobile ? "w-75" : "w-25"}  `}
          >
            Next
          </button>
        </div>
      </Form>
    </div>
  );
};

const AfterMBAForm = ({ onNext, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [allOptionsSelected, setAllOptionsSelected] = useState(false);
  useEffect(() => {
    // Check if all three options are selected
    setAllOptionsSelected(
      selectedOptions.location &&
        selectedOptions.industry &&
        selectedOptions.function
    );
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

  const handleCardClick = (label, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [label]: value,
    });
  };

  const onFinish = (values) => {
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
          apply to you
        </h5>

        <Form onFinish={onFinish}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              minHeight: `${isMobile ? "58vh" : "65vh"}`,
            }}
            className="  container-fluid scrollable-container"
          >
            <div>
              <div className="w-100">
                <h6 className="text-left w-100">Change of location</h6>
                {renderCardOptions("location")}
              </div>
              <div className=" w-100">
                <h5 className="text-left"> Change of industry</h5>
                {renderCardOptions("industry")}
              </div>
              <div className=" w-100">
                <h5 className="text-left">Change of function</h5>
                {renderCardOptions("function")}
              </div>
            </div>
          </div>

          <div
            className="mt-3 text-center d-flex justify-content-center align-items-center"
            style={{ width: "100%", marginBottom: "6rem" }}
          >
            {/* <button
              onClick={onBack}
              className="btn btn-lg border"
              style={{ marginRight: 8 }}
            >
              Back
            </button> */}
            <button
              style={{ width: `${isMobile ? "100%" : "25%"}` }}
              htmlType="submit"
              className="btn btn-lg btn-primary "
              disabled={!allOptionsSelected}
            >
              Next
            </button>
          </div>
        </Form>
      </PreferenceAndGoalsPageStyled>
    </div>
  );
};

const CountrySelectionForm = ({ onNext, onBack }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [allCountriesSelected, setAllCountriesSelected] = useState(false);

  useEffect(() => {
    // Check if all countries are selected
    setAllCountriesSelected(selectedCountries.length > 0);
  }, [selectedCountries]);

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

  const handleCardClick = (country) => {
    if (selectedCountries.includes(country)) {
      // Remove the country if already selected
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      // Add the country if not selected
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const onFinish = (values) => {
    sessionStorage.setItem(
      "selectedCountries",
      JSON.stringify(selectedCountries)
    );
    onNext();
  };

  const countryOptions = [
    "US",
    "France",
    "Singapore",
    "China",
    "UK",
    "Spain",
    "Switzerland",
    "India",
    "Italy",
    "South Korea",
    "Germany",
    "Netherlands",
    "Australia",
    "Portugal",
    "Canada",
    "Ireland",
  ];

  const renderCardOptions = (options) => {
    return (
      <div className="college-cards">
        {options.map((country) => (
          <Card
            className="college-card"
            key={country}
            onClick={() => handleCardClick(country)}
            style={{
              border: selectedCountries.includes(country)
                ? "2px solid #1890ff"
                : "2px solid #d9d9d9",
              width: `${isMobile ? "100%" : ""}`,
            }}
          >
            <p>{country}</p>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PreferenceAndGoalsPageStyled>
        <div>
          <Form onFinish={onFinish}>
            <div
              className="scrollable-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "65vh",
                overflowY: "scroll",
              }}
            >
              <h3 className="text-left w-100">Select countries to include</h3>
              {renderCardOptions(countryOptions)}
            </div>
            <div
              className="mt-5 my-lg-3 text-center d-flex justify-content-center align-items-center"
              style={{ width: "100%", marginBottom: "6rem" }}
            >
              <button
                style={{ width: `${isMobile ? "100%" : "25%"}` }}
                htmlType="submit"
                className="btn btn-lg btn-primary "
                disabled={!allCountriesSelected}
              >
                Next
              </button>
            </div>
          </Form>
        </div>
      </PreferenceAndGoalsPageStyled>
    </div>
  );
};
const { TabPane } = Tabs;
const PreferenceAndGoalsPage = () => {
  const formFilled = sessionStorage.getItem("form-filled");
  const [currentStep, setCurrentStep] = useState(
    formFilled === "true" ? "4" : "1"
  );

  const handleTabChange = (key) => {
    setCurrentStep(key);
  };

  const handleTryAgain = () => {
    sessionStorage.setItem("form-filled", "false");
    setCurrentStep("1");
  };

  return (
    <div className="container-fluid p-0">
      <Tabs
        tabBarStyle={{ display: "none" }}
        activeKey={currentStep}
        onChange={handleTabChange}
        tabBarGutter={15}
      >
        <TabPane tab= "Preference Form" key="1">
          <PreferenceForm onSubmit={() => setCurrentStep("2")} />
        </TabPane>
        <TabPane tab="After MBA Form" key="2">
          <AfterMBAForm
            onNext={() => setCurrentStep("3")}
            onBack={() => setCurrentStep("1")}
          />
        </TabPane>
        <TabPane tab="Country Selection Form" key="3">
          <CountrySelectionForm
            onNext={() => setCurrentStep("4")}
            onBack={() => setCurrentStep("2")}
          />
        </TabPane>
        <TabPane tab="College Information Output" key="4" forceRender={true}>
          <CollegeInformationOutput />
          <div className="mb-3 mb-lg-0" style={{ marginBottom: "5rem" }}>
            <button
              className="btn-primary btn btn-lg mb-lg-3"
              onClick={handleTryAgain}
            >
              Try filling form again
            </button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PreferenceAndGoalsPage;
