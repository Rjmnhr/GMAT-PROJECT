import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { BasicDetailsFormStyled } from "./style";
import maleIcon from "../../../icons/man.png";
import femaleIcon from "../../../icons/woman.png";

const BasicDetailsForm = ({ formRef, onSubmit, onChange, onSaveChanges }) => {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
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
    if (onSaveChanges) {
      onSaveChanges(values);
    }
    if (onSubmit) {
      onSubmit(values);
    }

    // Store values in sessionStorage
    sessionStorage.setItem("basic-details", JSON.stringify(values));
  };
  const { Option } = Select;

  const handleAgeCardClick = (age) => {
    form.setFieldsValue({ age }); // Set the form value
    setSelectedAge(age);
  };

  const handleGenderOptionClick = (gender) => {
    form.setFieldsValue({ gender }); // Set the form value
    setSelectedGender(gender);
  };

  return (
    <BasicDetailsFormStyled>
      <div
        className="col-lg-8 parent-container"
        style={{
          padding: "20px",
        }}
      >
        <Form
          name="basicDetailsForm"
          onValuesChange={handleFormChange}
          onFinish={handleSave}
        >
          <h5 className="text-left mb-2">Choose your age </h5>
          {/* <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please select your age!" }]}
          >
          
             <Select className="text-left" placeholder="Select your age">
              <Option value="<26">&lt;26</Option>
              <Option value="<30">&lt;30</Option>
              <Option value="<32">&lt;32</Option>
              <Option value="<35">&lt;35</Option>
              <Option value="&ge;35">≥35</Option>
            </Select> 
          </Form.Item> */}
          <div className="age-cards mt-2">
            {["<26", "<30", "<32", "<35", "≥35"].map((age) => (
              <div
                style={{
                  marginRight: "12px",
                  marginTop: "8px",
                  marginLeft: "0",
                }}
                key={age}
                className={`age-card     ${
                  selectedAge === age ? "selected-card" : ""
                }`}
                onClick={() => handleAgeCardClick(age)}
              >
                {age}
              </div>
            ))}
          </div>
          {/* <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select className="text-left" placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item> */}
          <div>
            <h5 className="text-left" style={{ marginRight: "8px" }}>
              Choose your gender
            </h5>
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

          <div className="col-10" style={{ textAlign: "left", padding: "0" }}>
            <Form.Item
              name="gmat"
              rules={[
                { required: true, message: "Please select your GMAT score!" },
              ]}
            >
              <Select
                className="text-left"
                placeholder="Select your GMAT score"
              >
                <Option value=">=750">≥750</Option>
                <Option value=">=720">≥720</Option>
                <Option value=">=700">≥700</Option>
                <Option value=">=680">≥680</Option>
                <Option value=">=650">≥650</Option>
                <Option value=">=620">≥620</Option>
                <Option value="<620">&lt;620</Option>
              </Select>
            </Form.Item>
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
