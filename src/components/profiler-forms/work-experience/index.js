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

const WorkExperienceForm = ({ formRef, onSubmit, onChange, onSaveChanges }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGeographicalReach, setSelectedGeographicalReach] =
    useState(null);
  const [selectedCompanySize, setSelectedCompanySize] = useState(null);

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
      ...selectedCompanySize,
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
        <div className={` container-fluid`}>
          {/* <div class="section-title pb-0 text-left">
            <h2>Describe the Company</h2>
          </div> */}
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
                  className={`age-card ${
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
            <div className="age-cards mt-2">
              {companySizeOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedCompanySize?.companySize === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCompanySize({ companySize: option.value });
                    }}
                  >
                    <p>{option.value}</p>
                  </Card>
                </Tooltip>
              ))}
            </div>

            {/* Add a Next button to move to the next section */}
            <div className="my-3 text-left" style={{ width: "100%" }}>
              <button htmlType="submit" className="btn btn-lg btn-primary w-50">
                Next
              </button>
            </div>
          </Form>
        </div>
      </BasicDetailsFormStyled>
    </>
  );
};

export default WorkExperienceForm;
