import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user_name = localStorage.getItem("user_name");

  const handleLogOut = () => {
    navigate("/");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
  };
  return (
    <div className="container-fluid p-3 d-flex justify-content-between align-items-center border-bottom">
      <div className="d-flex justify-content-between align-items-center">
        <h3 onClick={() => navigate("/")}>ADEFT EDUCATION</h3>
        {/* <button className="btn border">Dashboard</button> */}
      </div>

      <div className="d-flex align-items-center gap-2">
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
        <p style={{ fontWeight: "bold", cursor: "pointer" }}>{user_name}</p>
        <p
          style={{ marginLeft: "5px", fontWeight: "bold", cursor: "pointer" }}
          onClick={handleLogOut}
        >
          Log out
        </p>
      </div>
    </div>
  );
};

export default NavBar;
