import React, { useEffect, useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const CollegeTypeOptions = [
  {
    value: "premier",
    label: "Premier",
    description: "Top 10-15 in your field of specialization",
  },
  {
    value: "selective",
    label: "Selective",
    description: "Selective/hard to get into",
  },
  {
    value: "recognized",
    label: "Recognized",
    description: "Recognized within the state and entry is restrictive",
  },
  {
    value: "new",
    label: "New",
    description: "New/relatively easy to get in/significant quotas in place",
  },
];

const PerformanceOptions = [
  {
    value: "top5",
    label: "Top 5%",
    description: "High Distinction",
  },
  {
    value: "top10",
    label: "Top 10%",
    description: "Distinction",
  },
  {
    value: "top30",
    label: "Top 30%",
    description: "Credit",
  },
  {
    value: "average",
    label: "Average",
    description: "Average",
  },
  {
    value: "bottom50",
    label: "Bottom 50%",
    description: "Below Average",
  },
];

const UndergraduateDegreeForm = ({
  formRef,
  onSubmit,
  onChange,
  onSaveChanges,
}) => {
  const [selectedCollegeType, setSelectedCollegeType] = useState(null);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
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
      ...selectedCollegeType,
      ...selectedPerformance,
      ...values,
    };

    if (onSaveChanges) {
      onSaveChanges(finalObject);
    }
    if (onSubmit) {
      onSubmit(finalObject);
    }

    // Store values in sessionStorage
    sessionStorage.setItem("graduate", JSON.stringify(finalObject));
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <div
          style={{ display: "flex" }}
          className="graduate-container container-fluid"
        >
          <div className="graduate-image-container invisible">
            <img
              src={
                "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1700885900/hihviyhqjhupwqeqr8gr.png"
              }
              className="work-background"
              alt=""
            />
          </div>
          <div className="form-graduate">
            <div class="section-title pb-0 text-left ">
              <h2>Undergraduate</h2>
            </div>
            <Form
              onValuesChange={handleFormChange}
              onFinish={handleSave}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
            >
              <h5 className="text-left mb-2">College type </h5>
              <div className="college-cards">
                {CollegeTypeOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedCollegeType?.collegeType === option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedCollegeType({ collegeType: option.value })
                      }
                    >
                      <p>{option.label}</p>
                    </Card>
                  </Tooltip>
                ))}
              </div>

              <h5 className="text-left mb-2">Your performance </h5>
              <div className="college-cards">
                {PerformanceOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedPerformance?.yourPerformance === option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedPerformance({
                          yourPerformance: option.value,
                        })
                      }
                    >
                      <p>{option.label}</p>
                    </Card>
                  </Tooltip>
                ))}
              </div>

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

export default UndergraduateDegreeForm;
