import { Avatar, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const isLoggedIn = localStorage.getItem("adefteducation_isLoggedIn");
  const storedUserName = localStorage.getItem("adefteducation_user_name");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (storedUserName) {
      // Split the full name into an array of words
      const nameArray = storedUserName.split(" ");

      // Get the first element of the array, which is the first name
      const firstName = nameArray[0];

      setUserName(firstName);
    }
  }, [storedUserName]);

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("adefteducation_accessToken", "");
    localStorage.setItem("adefteducation_isLoggedIn", false);
  };
  const items = [
    // {
    //   key: "1",
    //   label: <a href="/account">My Account</a>,
    // },
    {
      key: "1",
      label: (
        <a href="#eq" onClick={handleLogOut}>
          Log out
        </a>
      ),
    },
  ];
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
              <li class="active">
                <a href="/#header">Home</a>
              </li>
              <li>
                <a href="/profiler">Profiler</a>
              </li>
              <li>
                <a href="/dashboard">GMAT</a>
              </li>

              <li>
                <a href="/#about">About</a>
              </li>
              <li>
                <a href="/practice-questions">Practice questions</a>
              </li>

              <li>
                <a href="/videos">Videos</a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
              {isLoggedIn === "true" ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                    arrow
                  >
                    <li
                      style={{
                        paddingTop: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {" "}
                      <a href="?#">{userName}</a>
                      <Avatar
                        size="small"
                        style={{
                          background: "#049494",
                        }}
                        icon={<UserOutlined />}
                      />
                    </li>
                  </Dropdown>
                </>
              ) : (
                <li>
                  <a href="/login">Log in</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </body>
  );
};

export default NavBar;
