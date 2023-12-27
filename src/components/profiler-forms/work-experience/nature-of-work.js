import React, { useEffect, useState } from "react";
import { Form, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

import { Card, Collapse } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const initialValues = {};
const keys = [1, 2, 3, 4];

keys.forEach((key) => {
  initialValues[`${key}_individualContributor`] = "N/A";
  initialValues[`${key}_supervisory`] = "N/A";
  initialValues[`${key}_leadershipManagerial`] = "N/A";
});

const NatureOfWorkForm = ({
  onUpdateProgress,
  onFormValidation,
  prevTabMobile,
  nextTabMobile,
}) => {
  const [expanded, setExpanded] = useState(Array(keys.length).fill(false));
  const [fieldsValue, setFieldsValue] = useState(
    JSON.parse(sessionStorage.getItem("natureExperience")) || {}
  );
const numberOfPairs = Object.keys(fieldsValue).length
  const [isMobile, setIsMobile] = useState(false);
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
    sessionStorage.setItem("natureExperience", JSON.stringify(fieldsValue));
    // Calculate non-empty count for progress
    const nonEmptyCount = Object.values(fieldsValue).filter(Boolean).length;

    // Update progress
    onUpdateProgress("natureExperience", nonEmptyCount);
    onFormValidation("natureExperience", 3);
    //eslint-disable-next-line
  }, [fieldsValue]);
  useEffect(() => {
    sessionStorage.setItem(
      "natureExperience-default",
      JSON.stringify(initialValues)
    );
  }, []);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) =>
      prevExpanded.map((value, i) => (i === index ? !value : value))
    );
  };

  const columns = [
    {
      title: "Individual Contributor",
      dataIndex: "individualContributor",
      key: "individualContributor",
      render: (record) => (
        <Form.Item
          style={{ margin: "0" }}
          name={`${record.key}_individualContributor`}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-lg-center justify-content-start">
            {["<1", "1-3", "3-5", ">=5", "N/A"].map((option) => (
              <Tooltip title={` ${option} year(s)`} key={option}>
                <Card
                  className={`college-card ${
                    fieldsValue[`${record.key}_individualContributor`] ===
                    option
                      ? "selected-card"
                      : ""
                  }`}
                  style={{ padding: "0.575rem 1rem" }}
                  onClick={() =>
                    handleInputChange(
                      record.key,
                      "individualContributor",
                      option
                    )
                  }
                >
                  <p>{option}</p>
                </Card>
              </Tooltip>
            ))}
          </div>
        </Form.Item>
      ),
    },
    {
      title: "Supervisory",
      dataIndex: "supervisory",
      key: "supervisory",
      render: (record) => (
        <Form.Item style={{ margin: "0" }} name={`${record.key}_supervisory`}>
          <div className="d-flex flex-wrap align-items-center justify-content-lg-center justify-content-start">
            {["<1", "1-2", "2-3", ">=3", "N/A"].map((option) => (
              <Tooltip title={`${option} year(s)`} key={option}>
                <Card
                  style={{ padding: "0.575rem 1rem" }}
                  className={`college-card ${
                    fieldsValue[`${record.key}_supervisory`] === option
                      ? "selected-card"
                      : ""
                  }`}
                  onClick={() =>
                    handleInputChange(record.key, "supervisory", option)
                  }
                >
                  <p>{option}</p>
                </Card>
              </Tooltip>
            ))}
          </div>
        </Form.Item>
      ),
    },
    {
      title: "Leadership/Managerial",
      dataIndex: "leadershipManagerial",
      key: "leadershipManagerial",
      render: (record) => (
        <Form.Item
          style={{ margin: "0" }}
          name={`${record.key}_leadershipManagerial`}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-lg-center justify-content-start">
            {["<1", "1-2", "2-3", ">=3", "N/A"].map((option) => (
              <Tooltip title={`${option} year(s)`} key={option}>
                <Card
                  style={{ padding: "0.575rem 1rem" }}
                  className={`college-card ${
                    fieldsValue[`${record.key}_leadershipManagerial`] === option
                      ? "selected-card"
                      : ""
                  }`}
                  onClick={() =>
                    handleInputChange(
                      record.key,
                      "leadershipManagerial",
                      option
                    )
                  }
                >
                  <p>{option}</p>
                </Card>
              </Tooltip>
            ))}
          </div>
        </Form.Item>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      title: "Non-commercial technical (Engineering, Science, IT, Technology)",
      title_mobile: "Technical (IT)",
      natureOfExperience: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            gap: "8px",
          }}
        >
          <img
            className="icon-labels"
            alt=""
            src={
              "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701635178/l73gy7y4omwaccdwrpsb.png"
            }
          />
        </div>
      ),
    },
    {
      key: "2",
      title: "Non-commercial technical (Accounting, Finance, HR)",
      title_mobile: "Business Tech ",
      natureOfExperience: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            gap: "8px",
          }}
        >
          <img
            className="icon-labels"
            alt=""
            src={
              "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701635859/b8obzoxbksuh4ucmfyre.png"
            }
          />
        </div>
      ),
    },
    {
      key: "3",
      title: "Commercial technical (Sales, Marketing)",
      title_mobile: "Commercial technical",
      natureOfExperience: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            gap: "8px",
          }}
        >
          <img
            className="icon-labels"
            alt=""
            src={
              "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701636376/triir2nwwkmlnlrlbqis.png"
            }
          />
        </div>
      ),
    },
    {
      key: "4",
      title:
        "Commercial generalist (Strategy, Consulting, Supply Chain, Operations)",
      title_mobile: "Commercial generalist ",
      natureOfExperience: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            gap: "8px",
          }}
        >
          <img
            className="icon-labels"
            alt=""
            src={
              "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701636951/tjlpv2hpxcczwzrgxakp.png"
            }
          />
        </div>
      ),
    },
  ];

  const handleInputChange = (key, field, value) => {
    setFieldsValue((prevFieldsValue) => ({
      ...prevFieldsValue,
      [`${key}_${field}`]: value,
    }));
  };

  return (
    <BasicDetailsFormStyled>
      <div className={`container-fluid`} data-aos="fade-left">
        <Form name="natureOfExperience" initialValues={initialValues}></Form>
        {dataSource.map((item, index) => (
          <Card className="mb-3" key={index}>
            <CardActions disableSpacing>
              <div
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.natureOfExperience}
                  {""}
                  <span className="ml-3">
                    {isMobile ? item.title_mobile : item.title}
                  </span>
                </div>

                <div>
                  {expanded[index] ? (
                    <IconButton
                      onClick={() => handleExpandClick(index)}
                      aria-label="show less"
                    >
                      <RemoveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleExpandClick(index)}
                      aria-label="show more"
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </CardActions>
            <Collapse
              in={expanded[index] || false}
              timeout="auto"
              unmountOnExit
            >
              <div
                style={{ borderTop: "1px solid #049494" }}
                className="text-left"
              >
                {columns.map((content, colIndex) => {
                  return (
                    <div
                      className={`d-lg-flex align-items-center mb-2 px-3 py-2 ${
                        isMobile ? "w-100" : "w-75"
                      } justify-content-between`}
                      key={colIndex}
                    >
                      <div>
                        <p>{content.title}</p>
                      </div>
                      <div>{content.render({ key: index + 1 })}</div>
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </Card>
        ))}

        {isMobile ? (
          <div className=" mt-5 ">
            {numberOfPairs > 0 ? (
              <button
                onClick={nextTabMobile}
                className="btn btn-lg btn-primary  w-50 d-flex w-100  mb-3 justify-content-between align-items-center"
              >
                Next <ArrowRightOutlined />{" "}
              </button>
            ) : (
              <button
                disabled
                onClick={nextTabMobile}
                className="btn btn-lg btn-primary  w-50 d-flex w-100  mb-3 justify-content-between align-items-center"
              >
                Next <ArrowRightOutlined />{" "}
              </button>
            )}

            <button
              className="btn border btn-lg w-50 d-flex justify-content-between w-100   align-items-center"
              onClick={prevTabMobile}
            >
              <ArrowLeftOutlined /> Back
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </BasicDetailsFormStyled>
  );
};

export default NatureOfWorkForm;
