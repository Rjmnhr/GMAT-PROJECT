// HobbiesForm.jsx
import React from "react";
import { Button, Form, Select } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";
import { useNavigate } from "react-router-dom";

const HobbiesForm = () => {
  const navigate = useNavigate();
  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Received values:", values);
    sessionStorage.setItem("hobbies", JSON.stringify(values));
    navigate("/selection-chance");
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
              <Option value="teaching">
                Teaching/consulting and entrepreneurship
              </Option>
              <Option value="selfLearning">
                Self learning and implementation (share market etc)
              </Option>
              <Option value="theatre">Theatre and expressive arts</Option>
              <Option value="sportsMusicArts">Sports or music or arts</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Your Level of Expertise"
            name="levelOfExpertise"
            rules={[
              {
                required: true,
                message: "Please select Your Level of Expertise",
              },
            ]}
          >
            <Select
              className="text-left"
              placeholder="Select Your Level of Expertise"
            >
              <Option value="international">International level</Option>
              <Option value="national">National level</Option>
              <Option value="state">State level</Option>
              <Option value="smallGroups">
                Small groups or district or local regions
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
              Continue
            </Button>
          </div>
        </Form>
      </BasicDetailsFormStyled>
    </>
  );
};

export default HobbiesForm;
