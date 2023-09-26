import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-3 d-flex justify-content-between align-items-center border-bottom">
      <div className="d-flex justify-content-between align-items-center">
        <h3 onClick={() => navigate("/")}>ADEFT EDUCATION</h3>
        {/* <button className="btn border">Dashboard</button> */}
      </div>

      <div>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </div>
    </div>
  );
};

export default NavBar;
