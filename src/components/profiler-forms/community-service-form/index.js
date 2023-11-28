import React, { useEffect, useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const CommunityServiceForm = ({
  formRef,
  onSubmit,
  onChange,
  onSaveChanges,
}) => {
  const [form] = Form.useForm();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [selectedYears, setSelectedYears] = useState(null);

  const ActivityOptions = [
    {
      value: "international",
      label: "International",
      description: "International community service",
    },
    {
      value: "national",
      label: "National",
      description: "National community service",
    },
    {
      value: "stateWide",
      label: "State",
      description: "State-wide community service",
    },
    {
      value: "localised",
      label: "Localised",
      description: "Localised community service",
    },
  ];

  const ContributionOptions = [
    {
      value: "leading",
      label: "Leading",
      description: "Leading activities/groups",
    },
    {
      value: "regular",
      label: "Regular",
      description: "Regularly part of a team doing activities",
    },
    {
      value: "sometimes",
      label: "Sometimes",
      description: "Sometimes being involved in some activities",
    },
    {
      value: "rarely",
      label: "Rarely",
      description: "Rarely being involved in any activity",
    },
  ];

  const YearsOptions = [
    { value: "<1", label: "< 1", description: "Less than 1 year" },
    { value: "<2", label: "< 2", description: "Less than 2 years" },
    { value: "<3", label: "< 3", description: "Less than 3 years" },
    { value: "<5", label: "< 5", description: "Less than 5 years" },
    { value: ">=5", label: ">= 5", description: "5 years or more" },
  ];

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
      ...selectedActivity,
      ...selectedContribution,
      ...selectedYears,
      ...values,
    };

    if (onSaveChanges) {
      onSaveChanges(finalObject);
    }
    if (onSubmit) {
      onSubmit(finalObject);
    }

    // Store values in sessionStorage
    sessionStorage.setItem("service", JSON.stringify(finalObject));
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <div className="other-container container-fluid">
          <div className="other-image-container invisible">
            <img
              src={
                "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1700885900/hihviyhqjhupwqeqr8gr.png"
              }
              className="other-background"
              alt=""
            />
          </div>
          <div className="form-other">
            <div class="section-title pb-0 text-left">
              <h2>Community Service</h2>
            </div>
            <Form
              onValuesChange={handleFormChange}
              onFinish={handleSave}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
            >
              <h5 className="text-left mb-2">Nature of activity </h5>
              <div className="college-cards">
                {ActivityOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedActivity?.natureOfActivity === option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedActivity({ natureOfActivity: option.value })
                      }
                    >
                      <p>{option.label}</p>
                    </Card>
                  </Tooltip>
                ))}
              </div>

              <h5 className="text-left mb-2">Contribution level</h5>
              <div className="college-cards">
                {ContributionOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedContribution?.levelOfContribution ===
                        option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedContribution({
                          levelOfContribution: option.value,
                        })
                      }
                    >
                      <p>{option.label}</p>
                    </Card>
                  </Tooltip>
                ))}
              </div>

              <h5 className="text-left mb-2">Years involved</h5>
              <div className="college-cards">
                {YearsOptions.map((option) => (
                  <Tooltip title={option.description} key={option.value}>
                    <Card
                      className={`college-card ${
                        selectedYears?.yearsOfInvolvement === option.value
                          ? "selected-card"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedYears({ yearsOfInvolvement: option.value })
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

export default CommunityServiceForm;
