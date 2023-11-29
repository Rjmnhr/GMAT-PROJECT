import React, { useState } from "react";
import { Card, Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";
import { useNavigate } from "react-router-dom";

const HobbiesForm = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [selectedYears, setSelectedYears] = useState(null);

  const onFinish = (values) => {
    const finalObject = {
      ...selectedActivity,
      ...selectedExpertise,
      ...selectedYears,
      ...values,
    };

    sessionStorage.setItem("hobbies", JSON.stringify(finalObject));
    navigate("/selection-chance");
  };

  const ActivityOptions = [
    {
      value: "teaching",
      label: "Teaching",
      description: "Teaching/consulting and entrepreneurship",
    },
    {
      value: "selfLearning",
      label: "Self Learning",
      description: "Self learning and implementation (share market etc)",
    },
    {
      value: "theatre",
      label: "Theatre",
      description: "Theatre and expressive arts",
    },
    {
      value: "sportsMusicArts",
      label: "Others",
      description: "Sports or music or arts",
    },
  ];

  const ExpertiseOptions = [
    {
      value: "international",
      label: "International",
      description: "International level",
    },
    { value: "national", label: "National", description: "National level" },
    { value: "state", label: "State", description: "State level" },
    {
      value: "smallGroups",
      label: "Small",
      description: "Small groups or district or local regions",
    },
  ];

  const YearsOptions = [
    { value: "<1", label: "< 1 ", description: "Less than 1 year" },
    { value: "<2", label: "< 2 ", description: "Less than 2 years" },
    { value: "<3", label: "< 3 ", description: "Less than 3 years" },
    { value: "<5", label: "< 5 ", description: "Less than 5 years" },
    { value: ">=5", label: ">= 5 ", description: "5 years or more" },
  ];

  return (
    <>
      <BasicDetailsFormStyled>
        <div className=" container-fluid">
          {/* <div class="section-title pb-0 text-left">
              <h2>Hobbies</h2>
            </div> */}
          <Form
            onFinish={onFinish}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            <h5 className="text-left mb-2">Nature of activity</h5>
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

            <h5 className="text-left mb-2">Expertise level</h5>
            <div className="college-cards">
              {ExpertiseOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedExpertise?.levelOfExpertise === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedExpertise({ levelOfExpertise: option.value })
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

export default HobbiesForm;
