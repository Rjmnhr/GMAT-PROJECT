import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AxiosInstance from "../axios";
import { useApplicationContext } from "../../app-context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const Location = useLocation();
  const { setIsSignIn } = useApplicationContext();
  const [messageApi, contextHolder] = message.useMessage();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleSwitch = () => {
    setIsSignIn(false);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    AxiosInstance.post("/api/user/login", formData, {
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const data = await response.data;
        console.log("🚀 ~ file: sign-in.js:41 ~ .then ~ data:", data);
        setIsLoading(false);

        if (!data === "Wrong username or password") {
          document.querySelector("#signupSrPassword").style.border =
            "1px solid red";
          console.log("1");
          document.querySelector("#signinSrEmail").style.border =
            "1px solid red";
          setEmail("");
          setPassword("");
          return;
        }

        // success();

        const accessToken = data.accessToken;
        const id = data.id;

        if (!accessToken) return error(data);

        const userType = data.user_type;

        localStorage.setItem("userType", userType);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_name", data.first_name);
        localStorage.setItem("email", data.email);

        sessionStorage.setItem("info", "");

        if (userType === "admin") {
          localStorage.setItem("isAdmin", "true");
        } else {
          localStorage.setItem("isAdmin", "false");
        }

        setEmail("");
        setPassword("");
        if (Location.pathname === "/login-app") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        error("Something wrong");
        console.log(err);
      });
  };

  // const success = () => {
  //   messageApi.open({
  //     type: "success",
  //     content: "Login successfully",
  //   });
  // };

  const error = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        error("Check your internet connection");
      }, 15000);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <>
      {contextHolder}

      <div className="container mt-3 mt-lg-0 mb-5 ">
        <div className="mx-lg-auto" style={{ maxWidth: "55rem" }}>
          <div className="d-flex justify-content-center align-items-center flex-column min-vh-lg-100">
            <div className="position-relative">
              <div className="card card-shadow card-login">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-body">
                      <form
                        className="js-validate needs-validation"
                        novalidate
                        onSubmit={handleSubmit}
                      >
                        <div className="text-center">
                          <div className="mb-5">
                            <h4 className="card-title">
                              Login to Adeft Education
                            </h4>
                          </div>
                        </div>

                        <div className="mb-4">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            id="signinSrEmail"
                            tabindex="1"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <span className="invalid-feedback">
                            Please enter a valid email address.
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="input-group-merge">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              className="js-toggle-password form-control form-control-lg"
                              name="password"
                              id="signupSrPassword"
                              placeholder="Password"
                              required
                              data-hs-toggle-password-options='{
                                   "target": "#changePassTarget",
                                   "defaultClass": "bi-eye-slash",
                                   "showClass": "bi-eye",
                                   "classChangeTarget": "#changePassIcon"
                                 }'
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <p
                              id="changePassTarget"
                              className="input-group-append input-group-text "
                              onClick={togglePasswordVisibility}
                              style={{ cursor: "pointer" }}
                            >
                              <i id="changePassIcon" className="bi-eye"></i>
                            </p>

                            <span className="invalid-feedback">
                              Please enter a valid password.
                            </span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end mb-4">
                          <a
                            className="form-label-link"
                            href="/forgot-password"
                          >
                            Forgot Password?
                          </a>
                        </div>

                        <div className="d-grid gap-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            {isLoading ? <LoadingOutlined /> : "Sign in"}
                          </button>
                          <p className="card-text text-muted">
                            Don't have an account yet?{" "}
                            <p
                              className="link"
                              style={{ cursor: "pointer" }}
                              onClick={handleSwitch}
                            >
                              Sign up here
                            </p>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
