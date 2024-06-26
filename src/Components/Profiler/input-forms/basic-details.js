import React, { useEffect, useState } from "react";
import { Form, Card } from "antd";
import { BasicDetailsFormStyled } from "./style";
import maleIcon from "../../../Icons/man.png";
import femaleIcon from "../../../Icons/woman.png";
import { ArrowRightOutlined } from "@ant-design/icons";

const BasicDetailsForm = ({
  onUpdateProgress,
  onFormValidation,
  nextTabMobile,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAge, setSelectedAge] = useState(
    JSON.parse(sessionStorage.getItem("basic-details"))?.age
  );
  const [selectedGender, setSelectedGender] = useState(
    JSON.parse(sessionStorage.getItem("basic-details"))?.gender
  );
  const [selectedGMAT, setSelectedGMAT] = useState(
    JSON.parse(sessionStorage.getItem("basic-details"))?.gmat
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
      age: "<26",
      gender: "male",
      gmat: "<620",
    };
    sessionStorage.setItem(
      "basic-details-default",
      JSON.stringify(defaultValues)
    );

    // Set form values based on the default values
  }, []);

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      age: selectedAge,
      gender: selectedGender,
      gmat: selectedGMAT,
    };
    sessionStorage.setItem("basic-details", JSON.stringify(formValues));
    const nonEmptyCount = [selectedAge, selectedGender, selectedGMAT].filter(
      Boolean
    ).length;

    onUpdateProgress("basic-details", nonEmptyCount);

    sessionStorage.setItem("basic-details", JSON.stringify(formValues));

    onFormValidation("basic-details", 1);
    //eslint-disable-next-line
  }, [selectedAge, selectedGender, selectedGMAT]);

  const { Meta } = Card;

  const handleAgeCardClick = (age) => {
    setSelectedAge(age);
  };

  const handleGenderOptionClick = (gender) => {
    setSelectedGender(gender);
  };

  const handleGMATCardClick = (gmat) => {
    setSelectedGMAT(gmat);
  };

  const gmatOptions = ["<620", "≥620", "≥650", "≥680", "≥700", "≥720", "≥750"];

  return (
    <BasicDetailsFormStyled>
      <div className="col-lg-10 p-0 p-lg-3 " data-aos="fade-left">
        <Form className="p-0" name="basicDetailsForm">
          <div className="d-lg-flex align-items-center justify-content-between">
            <div>
              <h5 className="text-left mb-2">Choose your age </h5>
              <div className="age-cards mt-2">
                {["<26", "<30", "<32", "<35", "≥35"].map((age) => (
                  <div
                    style={{
                      marginRight: "12px",
                      marginTop: "8px",
                      marginLeft: "0",
                    }}
                    key={age}
                    className={`age-card ${
                      selectedAge === age ? "selected-card" : ""
                    }`}
                    onClick={() => handleAgeCardClick(age)}
                  >
                    {age}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-left mb-2">Choose your gender</h5>
              <div className="gender-options">
                <div
                  className={`gender-option ${
                    selectedGender === "male" ? "selected-option" : ""
                  }`}
                  onClick={() => handleGenderOptionClick("male")}
                >
                  <img
                    width={50}
                    height={50}
                    src={maleIcon}
                    alt=""
                    className="gender-icon"
                  />
                </div>
                <div
                  className={`gender-option ${
                    selectedGender === "female" ? "selected-option" : ""
                  }`}
                  onClick={() => handleGenderOptionClick("female")}
                >
                  <img
                    width={50}
                    height={50}
                    src={femaleIcon}
                    alt=""
                    className="gender-icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-10" style={{ textAlign: "left", padding: "0" }}>
            <h5 className="text-left mb-2">Choose your GMAT score</h5>
            <div className="age-cards mt-2">
              {gmatOptions.map((gmat) => (
                <Card
                  style={{
                    padding: "0",
                    marginRight: "12px",
                    marginTop: "8px",
                    marginLeft: "0",
                  }}
                  key={gmat}
                  className={`age-card ${
                    selectedGMAT === gmat ? "selected-card" : ""
                  }`}
                  onClick={() => handleGMATCardClick(gmat)}
                >
                  <Meta title={gmat} />
                </Card>
              ))}
            </div>
          </div>
          {isMobile ? (
            selectedAge && selectedGMAT && selectedGender ? (
              <button
                onClick={nextTabMobile}
                className="btn btn-lg btn-primary mt-5 mb-3 w-100 d-flex justify-content-between"
              >
                Next <ArrowRightOutlined />{" "}
              </button>
            ) : (
              <button
                disabled
                className="btn btn-lg btn-primary w-100 d-flex justify-content-between mt-5 mb-3"
              >
                Next <ArrowRightOutlined />
              </button>
            )
          ) : (
            ""
          )}
        </Form>
      </div>
    </BasicDetailsFormStyled>
  );
};

export default BasicDetailsForm;
