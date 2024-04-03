import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  gmat_landing_path,
  practice_questions_path,
  profiler_landing_path,
} from "../Config/config";
import { useApplicationContext } from "../Context/app-context";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { userData, setUserData } = useApplicationContext();
  const [initials, setInitials] = useState("");

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("accessToken", "");
    setUserData(null);
  };

  const productMenuItems = [
    {
      key: "1",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("1")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(gmat_landing_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-book text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            GMAT
          </h6>
          {hoveredItem === "1" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
    {
      key: "2",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("2")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(profiler_landing_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-business-man-alt-1 text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            Profiler
          </h6>
          {hoveredItem === "2" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
    {
      key: "3",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("3")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(practice_questions_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-question-circle text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            Practice questions
          </h6>
          {hoveredItem === "3" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
    // {
    //   key: "4",
    //   title: (
    //     <div
    //       className="p-2 d-flex justify-content-between"
    //       onMouseEnter={() => setHoveredItem("4")}
    //       onMouseLeave={() => setHoveredItem(null)}
    //       style={{ width: "200px" }}
    //       onClick={() => navigate(videos_path)}
    //     >
    //       <h6>
    //         {" "}
    //         <i
    //           className="icofont-video-clapper text-primary mr-2"
    //           style={{ fontSize: "20px" }}
    //         ></i>
    //         Videos
    //       </h6>
    //       {hoveredItem === "4" && (
    //         <ArrowRightOutlined className="text-primary" />
    //       )}
    //     </div>
    //   ),
    // },
  ];
  const profileMenuItems = [
    {
      key: "1",
      title: (
        <div
          onClick={() => navigate("/account")}
          className="d-flex justify-content-between align-items-center pb-2 text-start  "
          style={{ width: "100px" }}
        >
          {" "}
          <p className="m-0">{userData?.first_name}</p>
          <Avatar
            style={{
              backgroundColor: "#007bff",
              verticalAlign: "middle",
              marginLeft: "10px",
            }}
            size="small"
          >
            {initials}
          </Avatar>
        </div>
      ),
    },
    {
      key: "2",
      //eslint-disable-next-line
      title: <a onClick={handleLogOut}>Log out</a>,
    },
  ];
  useEffect(() => {
    if (userData) {
      const sanitizedFirstName = String(userData?.first_name);
      console.log("🚀 ~ useEffect ~ sanitizedFirstName:", sanitizedFirstName);

      const sanitizedLastName = String(userData?.last_name);

      // Extracting the first letters only if both first and last names have values
      const initialsValue =
        sanitizedFirstName && sanitizedLastName
          ? (sanitizedFirstName[0] + sanitizedLastName[0]).toUpperCase()
          : "";

      setInitials(initialsValue);
    }
    // Ensure firstName and lastName are strings
  }, [userData]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <body className={`${menuOpen ? "mobile-nav-active" : ""} `}>
      <button
        type="button"
        class="mobile-nav-toggle d-lg-none"
        onClick={handleMenuToggle}
      >
        <i
          style={{ color: "black" }}
          class={`${menuOpen ? "icofont-close" : " icofont-navigation-menu"} `}
        ></i>
      </button>
      <header
        style={{ boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)" }}
        id="header"
        className="fixed-top"
      >
        <button type="button" class="mobile-nav-toggle d-lg-none">
          <i class="icofont-navigation-menu"></i>
        </button>
        <div class="container d-flex justify-content-between align-items-center">
          <h1 class="logo me-auto">
            <a href="/">
              Adeft<span>.</span>
            </a>
          </h1>

          <a href="/" class="logo me-auto">
            <img src="assets/img/logo.png" alt="" />
          </a>
          <nav
            class={`${
              menuOpen ? "mobile-nav d-lg-none" : " nav-menu d-none d-lg-block"
            } `}
          >
            <ul>
              <Dropdown
                overlay={
                  <Menu className="p-3">
                    {productMenuItems.map((item) => (
                      <Menu.Item key={item.key}>{item.title}</Menu.Item>
                    ))}
                  </Menu>
                }
                placement="bottomLeft"
              >
                <li>
                  {/*eslint-disable-next-line*/}
                  <a style={{ fontSize: "16px", cursor: "pointer" }}>
                    Products
                  </a>
                </li>
              </Dropdown>
              <li>
                <a href="/#about">About</a>
              </li>

              <li>
                <a href="/#contact">Contact</a>
              </li>
              <li>
                <a href="/blogs">Blog</a>
              </li>
              {userData ? (
                <>
                  <Dropdown
                    overlay={
                      <Menu className="p-2">
                        {profileMenuItems.map((item) => (
                          <Menu.Item key={item.key}>{item.title}</Menu.Item>
                        ))}
                      </Menu>
                    }
                    placement="bottomLeft"
                  >
                    <li style={{ cursor: "pointer" }} className={` pt-2 pb-0`}>
                      {/*eslint-disable-next-line*/}
                      <a>
                        <Avatar
                          style={{
                            backgroundColor: "#007bff",
                            verticalAlign: "middle",
                          }}
                          size="medium"
                        >
                          <UserOutlined />
                        </Avatar>
                      </a>
                    </li>
                  </Dropdown>
                </>
              ) : (
                ""
              )}
            </ul>
          </nav>
        </div>
      </header>
    </body>
  );
};

export default NavBar;
