import React, { useEffect } from "react";
import { Form, Select, Table, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";
import technologyIcon from "../../../icons/technology.png";
import accountingIcon from "../../../icons/economics.png";
import salesIcon from "../../../icons/profit.png";
import generalistIcon from "../../../icons/product-management.png";
import { InfoCircleFilled } from "@ant-design/icons";

// const tipFormatter = (value) => marks[value];

// const tipFormatter = (value) => (
//   <div style={{ fontSize: `${12 + value}px`, textAlign: "center" }}>
//     {marks[value]}
//   </div>
// );

const initialValues = {};
const keys = [1, 2, 3, 4]; // Adjust this array based on your keys

keys.forEach((key) => {
  initialValues[`${key}_individualContributor`] = "N/A";
  initialValues[`${key}_supervisory`] = "N/A";
  initialValues[`${key}_leadershipManagerial`] = "N/A";
});

const NatureOfWorkForm = ({ formRef, onSubmit, onChange, onSaveChanges }) => {
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
    sessionStorage.setItem("natureExperience", JSON.stringify(values));
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
        <Form.Item name={`${record.key}_individualContributor`}>
          <Select
            style={{ width: "100%" }}
            className="text-left"
            placeholder="Select an option"
            onChange={(value) =>
              handleInputChange(record.key, "individualContributor", value)
            }
            defaultValue="N/A"
          >
            <Option value="<1">&lt; 1</Option>
            <Option value="1-3">From 1 to 3</Option>
            <Option value="3-5">From 3 to 5</Option>
            <Option value=">=5">≥ 5</Option>
            <Option value="N/A">N/A</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Supervisory",
      dataIndex: "supervisory",
      key: "supervisory",
      render: (text, record) => (
        <Form.Item name={`${record.key}_supervisory`}>
          <Select
            style={{ width: "100%" }}
            className="text-left"
            placeholder="Select an option"
            onChange={(value) =>
              handleInputChange(record.key, "supervisory", value)
            }
            defaultValue="N/A"
          >
            <Option value="<1">&lt; 1</Option>
            <Option value="1-2">From 1 to 2</Option>
            <Option value="2-3">From 2 to 3</Option>
            <Option value=">=3">≥ 3</Option>
            <Option value="N/A">N/A</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Leadership/Managerial",
      dataIndex: "leadershipManagerial",
      key: "leadershipManagerial",
      render: (text, record) => (
        <Form.Item name={`${record.key}_leadershipManagerial`}>
          <Select
            style={{ width: "100%" }}
            className="text-left"
            placeholder="Select an option"
            onChange={(value) =>
              handleInputChange(record.key, "leadershipManagerial", value)
            }
            defaultValue="N/A"
          >
            <Option value="<1">&lt; 1</Option>
            <Option value="1-2">From 1 to 2</Option>
            <Option value="2-3">From 2 to 3</Option>
            <Option value=">=3">≥ 3</Option>
            <Option value="N/A">N/A</Option>
          </Select>
        </Form.Item>
      ),
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
        <div className={`container-fluid`}>
          {/* <div class="section-title pb-0 text-left">
            <h2>Nature of Experience </h2>
          </div> */}
          <Form
            form={form}
            name="natureOfExperience"
            onValuesChange={handleFormChange}
            onFinish={handleSave}
            initialValues={initialValues}
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 16 }}
          >
            <Table
              dataSource={[
                {
                  key: "1",
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
                        height={60}
                        width={60}
                        className="icon-labels"
                        alt=""
                        src={technologyIcon}
                      />
                      <Tooltip title="Non-commercial technical (Engineering, Science, IT, Technology)">
                        <InfoCircleFilled />
                      </Tooltip>
                    </div>
                  ),
                },
                {
                  key: "2",
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
                        height={60}
                        width={60}
                        className="icon-labels"
                        alt=""
                        src={accountingIcon}
                      />
                      <Tooltip title="Non-commercial technical (Accounting, Finance, HR)">
                        <InfoCircleFilled />
                      </Tooltip>
                    </div>
                  ),
                },
                {
                  key: "3",
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
                        height={60}
                        width={60}
                        className="icon-labels"
                        alt=""
                        src={salesIcon}
                      />
                      <Tooltip title="Commercial technical (Sales, Marketing)">
                        <InfoCircleFilled />
                      </Tooltip>
                    </div>
                  ),
                },
                {
                  key: "4",
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
                        height={60}
                        width={60}
                        className="icon-labels"
                        alt=""
                        src={generalistIcon}
                      />
                      <Tooltip title="Commercial generalist (Strategy, Consulting, Supply Chain, Operations)">
                        <InfoCircleFilled />
                      </Tooltip>
                    </div>
                  ),
                },
              ]}
              columns={columns}
              pagination={false}
            />

            {/* Add a Next button to move to the next section */}
            <div className="my-3 text-center" style={{ width: "100%" }}>
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

export default NatureOfWorkForm;
