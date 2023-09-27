import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user_name = localStorage.getItem("user_name");

  const handleLogOut = () => {
    navigate("https://www.adefteducation.com");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
  };
  return (
    <div className="container-fluid  d-flex justify-content-between align-items-center border-bottom">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ">
          <img
            src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695818576/ichnuzqxvbetqcymqti4.svg"
            alt=""
            width={60}
            height={60}
          />
          <p
            className="fs-3 pb-1"
            onClick={() => navigate("https://www.adefteducation.com")}
          >
            ADEFT EDUCATION
          </p>
        </div>

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
