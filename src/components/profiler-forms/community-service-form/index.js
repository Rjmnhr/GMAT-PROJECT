// CommunityServiceForm.jsx
import React, { useEffect } from "react";
import { Button, Form, Select } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const CommunityServiceForm = ({
  formRef,
  onSubmit,
  onChange,
  onSaveChanges,
}) => {
  const [form] = Form.useForm();

  const { Option } = Select;

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
    sessionStorage.setItem("service", JSON.stringify(values));
  };
  return (
    <>
      <BasicDetailsFormStyled>
        <Form
          onValuesChange={handleFormChange}
          onFinish={handleSave}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Nature of Activity"
            name="natureOfActivity"
            rules={[
              { required: true, message: "Please select Nature of Activity" },
            ]}
          >
            <Select
              className="text-left"
              placeholder="Select Nature of Activity"
            >
              <Option value="international">
                International community service
              </Option>
              <Option value="national">National community service</Option>
              <Option value="stateWide">State wide community service</Option>
              <Option value="localised">Localised community service</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Your Level of Contribution"
            name="levelOfContribution"
            rules={[
              {
                required: true,
                message: "Please select Your Level of Contribution",
              },
            ]}
          >
            <Select
              className="text-left"
              placeholder="Select Your Level of Contribution"
            >
              <Option value="leading">Leading activities/groups</Option>
              <Option value="regular">
                Regularly part of a team doing activities
              </Option>
              <Option value="sometimes">
                Sometimes being involved in some activities
              </Option>
              <Option value="rarely">
                Rarely being involved in any activity
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Number of Years of Being Involved"
            name="yearsOfInvolvement"
            rules={[
              {
                required: true,
                message: "Please select Number of Years of Being Involved",
              },
            ]}
          >
            <Select
              className="text-left"
              placeholder="Select Number of Years of Being Involved"
            >
              <Option value="<1">{"< 1 year"}</Option>
              <Option value="<2">{"< 2 years"}</Option>
              <Option value="<3">{"< 3 years"}</Option>
              <Option value="<5">{"< 5 years"}</Option>
              <Option value=">=5">{">= 5 years"}</Option>
            </Select>
          </Form.Item>
          <div className="my-3" style={{ width: "100%" }}>
            <Button className="btn-primary w-25" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      </BasicDetailsFormStyled>
    </>
  );
};

export default CommunityServiceForm;
