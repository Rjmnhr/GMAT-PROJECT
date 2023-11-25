import React, { useEffect, useState } from "react";
import { Form, Select, Slider, Card, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const marks = {
  0: "<1000",
  33.33: "<5000",
  66.66: "<10000",
  100: "≥10000",
};

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
  const { Option } = Select;
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
    sessionStorage.setItem("experience", JSON.stringify(values));
  };

  const handleTypeCardClick = (age) => {
    form.setFieldsValue({ age }); // Set the form value
    setSelectedType(age);
  };
  // eslint-disable-next-line
  const columns = [
    {
      title: "Nature of Experience",
      dataIndex: "natureOfExperience",
      key: "natureOfExperience",
    },
    {
      title: "Individual Contributor",
      dataIndex: "individualContributor",
      key: "individualContributor",
      render: (text, record) => (
        <Form.Item
          name={`${record.key}_individualContributor`}
          rules={[
            {
              required: true,
              message: "Please select an option",
              className: "custom-error-message",
            },
          ]}
        >
          <Select
            className="text-left"
            placeholder="Select an option"
            onChange={(value) =>
              handleInputChange(record.key, "individualContributor", value)
            }
          >
            <Option value="<1">&lt; 1</Option>
            <Option value="1-3">From 1 to 3</Option>
            <Option value="3-5">From 3 to 5</Option>
            <Option value=">=5">≥ 5</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Supervisory",
      dataIndex: "supervisory",
      key: "supervisory",
      render: (text, record) => (
        <Form.Item
          name={`${record.key}_supervisory`}
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select
            className="text-left"
            placeholder="Select an option"
            onChange={(value) =>
              handleInputChange(record.key, "supervisory", value)
            }
          >
            <Option value="<1">&lt; 1</Option>
            <Option value="1-2">From 1 to 2</Option>
            <Option value="2-3">From 2 to 3</Option>
            <Option value=">=3">≥ 3</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Leadership/Managerial",
      dataIndex: "leadershipManagerial",
      key: "leadershipManagerial",
      render: (text, record) => (
        <Form.Item
          name={`${record.key}_leadershipManagerial`}
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select
            className="text-left"
            placeholder="Select an option"
            onChange={(value) =>
              handleInputChange(record.key, "leadershipManagerial", value)
            }
          >
            <Option value="<1">&lt; 1</Option>
            <Option value="1-2">From 1 to 2</Option>
            <Option value="2-3">From 2 to 3</Option>
            <Option value=">=3">≥ 3</Option>
          </Select>
        </Form.Item>
      ),
    },
  ];
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

  const handleInputChange = (key, field, value) => {
    form.setFieldsValue({
      [`${key}_${field}`]: value,
    });
  };

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
                {["Product", "Service"].map((type) => (
                  <div
                    style={{
                      marginRight: "12px",
                      marginTop: "8px",
                      marginLeft: "0",
                    }}
                    key={type}
                    className={`age-card     ${
                      selectedType === type ? "selected-card" : ""
                    }`}
                    onClick={() => handleTypeCardClick(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
              {/* <Form.Item
                name="productServices"
                label="Product/Services Company"
                rules={[{ required: true, message: "Please select an option" }]}
              >
                <Select className="text-left" placeholder="Select an option">
                  <Option value="product">Product</Option>
                  <Option value="services">Services</Option>
                </Select>
              </Form.Item> */}

              <h5 className="text-left mb-2">Company's geographical reach </h5>

              {/* <Form.Item
                name="multiNationalCompany"
                rules={[{ required: true, message: "Please select an option" }]}
              >
                <Select className="text-left" placeholder="Select an option">
                  <Option value="oneLocation">One Location</Option>
                  <Option value="multipleLocations">
                    Multiple Locations Across a Continent
                  </Option>
                  <Option value="multipleContinents">
                    Multiple Continents
                  </Option>
                </Select>
              </Form.Item> */}
              <div className="age-cards mt-2">
                {geographicalReachOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedGeographicalReach === option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() => setSelectedGeographicalReach(option.value)}
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
                    tipFormatter={null}
                    style={{ marginTop: "20px" }}
                  />
                </Form.Item>
              </div>
              {/* <p style={{ fontWeight: "bold" }} className="mb-3 ">
              Nature of Experience
            </p> */}

              {/* Table for Nature of Experience */}
              {/* <Table
                style={{ display: "none" }}
                dataSource={[
                  {
                    key: "1",
                    natureOfExperience:
                      "Non-commercial technical (Engineering, Science, IT, Technology)",
                  },
                  {
                    key: "2",
                    natureOfExperience:
                      "Non-commercial technical (Accounting, Finance, HR)",
                  },
                  {
                    key: "3",
                    natureOfExperience:
                      "Commercial technical (Sales, Marketing)",
                  },
                  {
                    key: "4",
                    natureOfExperience:
                      "Commercial generalist (Strategy, Consulting, Supply Chain, Operations)",
                  },
                ]}
                columns={columns}
                pagination={false}
              /> */}

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
