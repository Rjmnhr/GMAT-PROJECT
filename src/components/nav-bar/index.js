import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("adefteducation_accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const VerifyToken = async () => {
      try {
        const res = await fetch(
          "https://adeftbackend-z0bvyb2s.b4a.run/api/token/verify",
          // "http://localhost:8003/api/token/verify",
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
        // Handle the error here or return an error response if needed
        setIsAuthenticated(false);
      }
    };

    VerifyToken();

    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        // Redirect to the login page if not authenticated

        setIsLoggedIn(false);
      }
    }
  }, [isAuthenticated, accessToken]);

  // useEffect(() => {
  //   if (storedUserName) {
  //     // Split the full name into an array of words
  //     const nameArray = storedUserName.split(" ");

  //     // Get the first element of the array, which is the first name
  //     const firstName = nameArray[0];

  //     setUserName(firstName);
  //   }
  // }, [storedUserName]);

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
              <li>
                <a href="/#header">Home</a>
              </li>
              <li>
                <a href="/profiler">Profiler</a>
              </li>
              <li>
                <a href="/gmat">GMAT</a>
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
              <li>
                <a href="/blogs">Blog</a>
              </li>
              {isLoggedIn ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                    arrow
                  >
                    <li>
                      {" "}
                      <a href="?#">Account</a>
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
