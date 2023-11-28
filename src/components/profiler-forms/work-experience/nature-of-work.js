import React, { useEffect } from "react";
import { Form, Select, Table } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

// const tipFormatter = (value) => marks[value];

// const tipFormatter = (value) => (
//   <div style={{ fontSize: `${12 + value}px`, textAlign: "center" }}>
//     {marks[value]}
//   </div>
// );
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

  const handleInputChange = (key, field, value) => {
    form.setFieldsValue({
      [`${key}_${field}`]: value,
    });
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <div className={`container-fluid`}>
          <div class="section-title pb-0 text-left">
            <h2>Nature of Experience </h2>
          </div>
          <Form
            form={form}
            name="natureOfExperience"
            onValuesChange={handleFormChange}
            onFinish={handleSave}
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 16 }}
          >
            <Table
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
                  natureOfExperience: "Commercial technical (Sales, Marketing)",
                },
                {
                  key: "4",
                  natureOfExperience:
                    "Commercial generalist (Strategy, Consulting, Supply Chain, Operations)",
                },
              ]}
              columns={columns}
              pagination={false}
            />

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

export default NatureOfWorkForm;
