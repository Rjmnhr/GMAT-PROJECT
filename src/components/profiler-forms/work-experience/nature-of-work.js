import React, { useState, useEffect } from "react";
import { Form, Select, Table, Tooltip, Button } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

import { Tabs, Tab } from "@mui/material";

import accountingIcon from "../../../icons/economics.png";
import salesIcon from "../../../icons/profit.png";
import generalistIcon from "../../../icons/product-management.png";

const { Option } = Select;
const NatureOfWorkForm = ({ formRef, onChange }) => {
  const [selectedNature, setSelectedNature] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = [
    {
      title: "Non-commercial technical",
      icon: "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701448809/zcdenthewcmww1elbmx7.png",
      tooltip: "Engineering, Science, IT, Technology",
    },
    {
      title: "Non-commercial technical",
      icon: accountingIcon,
      tooltip: "Accounting, Finance, HR",
    },
    {
      title: "Commercial technical",
      icon: salesIcon,
      tooltip: "Sales, Marketing",
    },
    {
      title: "Commercial generalist",
      icon: generalistIcon,
      tooltip: "Strategy, Consulting, Supply Chain, Operations",
    },
  ];

  const initialValues = {};

  steps.forEach((step, index) => {
    initialValues[`individualContributor_${index}`] = "N/A";
    initialValues[`supervisory_${index}`] = "N/A";
    initialValues[`leadershipManagerial_${index}`] = "N/A";
  });

  useEffect(() => {
    const defaultValues = initialValues;
    sessionStorage.setItem("natureExperience", JSON.stringify(defaultValues));
    //eslint-disable-next-line
  }, []);

  const handleInputChange = (key, field, value) => {
    form.setFieldsValue({
      [`${key}_${field}`]: value,
    });
  };

  const handleFormChange = (changedValues, allValues) => {
    if (onChange) {
      onChange(changedValues, allValues);
    }
  };

  const handleSave = (values) => {
    sessionStorage.setItem("natureExperience", JSON.stringify(values));
  };

  const handleNatureSelection = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedNature(index);
      setCurrentStep(1);
      setIsTransitioning(false);
    }, 500); // Adjust the duration of the transition
  };
  const renderStepContent = (stepIndex) => (
    <Table
      dataSource={[steps[stepIndex]]}
      columns={[
        {
          title: "Nature of Experience",
          dataIndex: "title",
          key: "title",
          render: (text, record) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                gap: "8px",
              }}
            >
              {record.icon && (
                <img
                  height={60}
                  width={60}
                  className="icon-labels"
                  alt=""
                  src={record.icon}
                />
              )}
              <Tooltip title={record.tooltip}></Tooltip>
            </div>
          ),
        },
        {
          title: "Individual Contributor",
          dataIndex: "individualContributor",
          key: "individualContributor",
          render: (text, record) => (
            <Select
              style={{ width: "100%" }}
              className="text-left"
              placeholder="Select an option"
              onChange={(value) =>
                handleInputChange(stepIndex, "individualContributor", value)
              }
              defaultValue="N/A"
            >
              {record.options?.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          ),
        },
        {
          title: "Supervisory",
          dataIndex: "supervisory",
          key: "supervisory",
          render: (text, record) => (
            <Select
              style={{ width: "100%" }}
              className="text-left"
              placeholder="Select an option"
              onChange={(value) =>
                handleInputChange(stepIndex, "supervisory", value)
              }
              defaultValue="N/A"
            >
              {record.options?.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          ),
        },
        {
          title: "Leadership/Managerial",
          dataIndex: "leadershipManagerial",
          key: "leadershipManagerial",
          render: (text, record) => (
            <Select
              style={{ width: "100%" }}
              className="text-left"
              placeholder="Select an option"
              onChange={(value) =>
                handleInputChange(stepIndex, "leadershipManagerial", value)
              }
              defaultValue="N/A"
            >
              {record.options?.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          ),
        },
      ]}
      pagination={false}
    />
  );
  return (
    <BasicDetailsFormStyled>
      <div className={`container-fluid`}>
        <Form
          form={form}
          name="natureOfExperience"
          onValuesChange={handleFormChange}
          onFinish={handleSave}
          initialValues={initialValues}
          labelCol={{ span: 15 }}
          wrapperCol={{ span: 16 }}
        >
          {currentStep === 0 && (
            <div style={{ display: "flex", gap: "16px", overflow: "hidden" }}>
              {steps?.map((step, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    opacity: isTransitioning ? 0 : 1,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                  onClick={() => handleNatureSelection(index)}
                >
                  <img
                    height={60}
                    width={60}
                    className="icon-labels"
                    alt=""
                    src={step.icon}
                    style={{ marginBottom: 8 }}
                  />
                  <p>{step.title}</p>
                </div>
              ))}
            </div>
          )}
          {selectedNature !== null && currentStep === 1 && (
            <div style={{ display: "flex", gap: "16px", overflow: "hidden" }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedNature}
                onChange={(event, newValue) => handleNatureSelection(newValue)}
                sx={{ width: 120 }}
              >
                {steps?.map((step, index) => (
                  <Tab label={step.title} key={index} />
                ))}
              </Tabs>
              <div style={{ flex: 1 }}>{renderStepContent(selectedNature)}</div>
            </div>
          )}
          {currentStep > 0 && (
            <Button
              style={{ margin: "16px 0" }}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}
          {currentStep === 1 && (
            <Button type="primary" onClick={form.submit}>
              Finish
            </Button>
          )}
        </Form>
      </div>
    </BasicDetailsFormStyled>
  );
};

export default NatureOfWorkForm;
