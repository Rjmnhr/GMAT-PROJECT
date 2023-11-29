import React, { useEffect, useState } from "react";
import { Form, Card } from "antd";
import { BasicDetailsFormStyled } from "./style";
import maleIcon from "../../../icons/man.png";
import femaleIcon from "../../../icons/woman.png";

const BasicDetailsForm = ({ formRef, onSubmit, onChange, onSaveChanges }) => {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGMAT, setSelectedGMAT] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    formRef.current = form;
  }, [form, formRef]);

  const handleFormChange = (changedValues, allValues) => {
    if (onChange) {
      onChange(changedValues, allValues);
    }
  };

  const handleSave = (values) => {
    const finalObject = {
      ...selectedGMAT,
      ...values,
    };
    if (onSaveChanges) {
      onSaveChanges(finalObject);
    }
    if (onSubmit) {
      onSubmit(finalObject);
    }

    // Store values in sessionStorage
    sessionStorage.setItem("basic-details", JSON.stringify(finalObject));
  };

  const { Meta } = Card;

  const handleAgeCardClick = (age) => {
    form.setFieldsValue({ age });
    setSelectedAge(age);
  };

  const handleGenderOptionClick = (gender) => {
    form.setFieldsValue({ gender });
    setSelectedGender(gender);
  };

  const handleGMATCardClick = (gmat) => {
    setSelectedGMAT(gmat);
  };

  const gmatOptions = ["≥750", "≥720", "≥700", "≥680", "≥650", "≥620", "<620"];

  return (
    <BasicDetailsFormStyled>
      <div
        className="col-lg-8 parent-container"
        style={{
          padding: "20px",
        }}
      >
        <div class="section-title pb-0 text-left">
          <h2>Get started with basic details</h2>
        </div>
        <Form
          name="basicDetailsForm"
          onValuesChange={handleFormChange}
          onFinish={handleSave}
        >
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
                    selectedGMAT?.gmat === gmat ? "selected-card" : ""
                  }`}
                  onClick={() => handleGMATCardClick({ gmat: gmat })}
                >
                  <Meta title={gmat} />
                </Card>
              ))}
            </div>
          </div>

          <div className="my-3 text-left" style={{ width: "100%" }}>
            <button htmlType="submit" className="btn btn-lg btn-primary w-50">
              Start
            </button>
          </div>
        </Form>
      </div>
    </BasicDetailsFormStyled>
  );
};

export default BasicDetailsForm;
