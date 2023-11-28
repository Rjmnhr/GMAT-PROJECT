import React, { useEffect, useState } from "react";
import { Form, Slider, Card, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const marks = {
  0: "<1000",
  33.33: "<5000",
  66.66: "<10000",
  100: "≥10000",
};
function tipFormatter(value) {
  const keys = Object.keys(marks);
  const index = Math.round(value / (100 / (keys.length - 1)));
  return marks[keys[index]];
}
// const tipFormatter = (value) => marks[value];

// const tipFormatter = (value) => (
//   <div style={{ fontSize: `${12 + value}px`, textAlign: "center" }}>
//     {marks[value]}
//   </div>
// );
const WorkExperienceForm = ({ formRef, onSubmit, onChange, onSaveChanges }) => {
  const [selectedType, setSelectedType] = useState(null);

  const [selectedGeographicalReach, setSelectedGeographicalReach] =
    useState(null);

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
      ...selectedType,
      ...selectedGeographicalReach,
      ...values,
    };

    if (onSaveChanges) {
      onSaveChanges(finalObject);
    }
    if (onSubmit) {
      onSubmit(finalObject);
    }

    // Store values in sessionStorage
    sessionStorage.setItem("experience", JSON.stringify(finalObject));
  };

  // eslint-disable-next-line

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
        <div className={`work-experience-container container-fluid`}>
          <div className="work-image-container invisible">
            <img
              src={
                "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1700885900/hihviyhqjhupwqeqr8gr.png"
              }
              className="work-background"
              alt=""
            />
          </div>
          <div className="form">
            <div class="section-title pb-0 text-left">
              <h2>Describe the Company</h2>
            </div>
            <Form
              form={form}
              name="workExperienceForm"
              onValuesChange={handleFormChange}
              onFinish={handleSave}
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 16 }}
            >
              <h5 className="text-left mb-2">Company type </h5>

              <div className="age-cards mt-2">
                {["Product", "Services"].map((type) => (
                  <div
                    style={{
                      marginRight: "12px",
                      marginTop: "8px",
                      marginLeft: "0",
                    }}
                    key={type}
                    className={`age-card     ${
                      selectedType?.productServices === type
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() => setSelectedType({ productServices: type })}
                  >
                    {type}
                  </div>
                ))}
              </div>

              <h5 className="text-left mb-2">Company's geographical reach </h5>

              <div className="age-cards mt-2">
                {geographicalReachOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedGeographicalReach?.multiNationalCompany ===
                        option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedGeographicalReach({
                          multiNationalCompany: option.value,
                        });
                      }}
                    >
                      <p>{option.label}</p>
                    </Card>
                  </Tooltip>
                ))}
              </div>

              <h5 className="text-left mb-2">Company size </h5>

              <div>
                <Form.Item
                  name="companySize"
                  rules={[
                    { required: true, message: "Please select an option" },
                  ]}
                >
                  <Slider
                    marks={marks}
                    step={null}
                    tooltipVisible={false} // Set tooltipVisible to false to hide the tooltip
                    tooltipPlacement="bottom"
                    tipFormatter={tipFormatter}
                    style={{ marginTop: "20px" }}
                  />
                </Form.Item>
              </div>

              {/* Add a Next button to move to the next section */}
              <div className="my-3 text-left" style={{ width: "100%" }}>
                <button
                  htmlType="submit"
                  className="btn btn-lg btn-primary w-50"
                >
                  Next
                </button>
              </div>
            </Form>
          </div>
        </div>
      </BasicDetailsFormStyled>
    </>
  );
};

export default WorkExperienceForm;
