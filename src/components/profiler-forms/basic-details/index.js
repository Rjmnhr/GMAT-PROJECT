import React from "react";
import { Form, Input, Button, Select } from "antd";
import { BasicDetailsFormStyled } from "./style";

const BasicDetailsForm = ({ formRef, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    sessionStorage.setItem("basic-details", JSON.stringify(values));
    formRef.current = form;
    onSubmit();
  };

  const { Option } = Select;

  return (
    <>
      <BasicDetailsFormStyled>
        <Form
          name="basicDetailsForm"
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please select your age!" }]}
          >
            <Select className="text-left" placeholder="Select your age">
              <Option value="<26">&lt;26</Option>
              <Option value="<30">&lt;30</Option>
              <Option value="<32">&lt;32</Option>
              <Option value="<35">&lt;35</Option>
              <Option value="&ge;35">≥35</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select className="text-left" placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="GMAT"
            name="gmat"
            rules={[
              { required: true, message: "Please select your GMAT score!" },
            ]}
          >
            <Select className="text-left" placeholder="Select your GMAT score">
              <Option value=">=750">≥750</Option>
              <Option value=">=720">≥720</Option>
              <Option value=">=700">≥700</Option>
              <Option value=">=680">≥680</Option>
              <Option value=">=650">≥650</Option>
              <Option value=">=620">≥620</Option>
              <Option value="<620">&lt;620</Option>
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

export default BasicDetailsForm;
