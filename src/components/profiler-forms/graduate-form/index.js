// UndergraduateDegreeForm.jsx
import React from "react";
import { Button, Form, Select } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

const UndergraduateDegreeForm = ({ formRef, onSubmit }) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Received values:", values);
    sessionStorage.setItem("graduate", JSON.stringify(values));
    formRef.current = form;
    onSubmit();
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="College Type"
            name="collegeType"
            rules={[{ required: true, message: "Please select College Type" }]}
          >
            <Select className="text-left" placeholder="Select College Type">
              <Option value="premier">
                Premier (top 10-15 in your field of specialisation)
              </Option>
              <Option value="selective">Selective/hard to get into</Option>
              <Option value="recognized">
                Recognised within the state and entry is restrictive
              </Option>
              <Option value="new">
                New/relatively easy to get in/significant quotas in place
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Your Performance"
            name="yourPerformance"
            rules={[
              { required: true, message: "Please select Your Performance" },
            ]}
          >
            <Select className="text-left" placeholder="Select Your Performance">
              <Option value="top5">
                Top 5% of your class (High Distinction)
              </Option>
              <Option value="top10">Top 10% of your class (Distinction)</Option>
              <Option value="top30">Top 30% of your class (Credit)</Option>
              <Option value="average">Average</Option>
              <Option value="bottom50">
                Bottom 50% of your class (Average)
              </Option>
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

export default UndergraduateDegreeForm;
