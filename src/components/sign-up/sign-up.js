import React, { useState } from "react";
// import InfoModal from "../modals/info-modal";

import { LoadingOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios";
import { useEffect } from "react";
import { message } from "antd";

import { useApplicationContext } from "../../app-context";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setIsSignIn } = useApplicationContext();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Passwords does not match",
    });
  };

  const handleSwitch = () => {
    setIsSignIn(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (confirmPassword !== password) {
      error();
      return;
    }

    const lowerCasedEmail = email.toLowerCase();
    console.log(lowerCasedEmail);

    AxiosInstance.post("/api/otp/send-otp", {
      email: lowerCasedEmail,
    })
      .then(async (response) => {
        const data = await response.data;
        // Handle successful OTP request
        console.log(data);

        localStorage.setItem("email", lowerCasedEmail);
        localStorage.setItem("first_name", firstName);
        localStorage.setItem("last_name", lastName);
        localStorage.setItem("password", password);
        navigate("/otp-validation");
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    if (password && confirmPassword)
      if (password === confirmPassword) {
        setIsPasswordSame(true);
      } else {
        setIsPasswordSame(false);
      }
    // eslint-disable-next-line
  }, [password, confirmPassword]);
  return (
    <>
      {contextHolder}
      <div
        style={{ transform: "scale(0.9", transition: "all 0.3s ease" }}
        class="container content-space-b-2 h-100 "
      >
        <div class="mx-lg-auto" style={{ maxWidth: "55rem" }}>
          <div class="d-flex justify-content-center align-items-center flex-column ">
            <div class="position-relative">
              <div class="card card-shadow card-login">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      style={{ padding: "1.75rem 2.75rem" }}
                      class="card-body "
                    >
                      <form
                        onSubmit={handleSubmit}
                        class="js-validate needs-validation"
                        novalidate
                      >
                        <div class="text-center">
                          <div class="mb-5">
                            <h3 class="card-title">Create your account</h3>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-6">
                            <div class="mb-4">
                              <input
                                type="text"
                                class="form-control form-control-lg"
                                name="fullName"
                                id="fullNameSrEmail"
                                placeholder="First name"
                                aria-label="Mark"
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                              <span class="invalid-feedback">
                                Please enter your first name.
                              </span>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="mb-4">
                              <input
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Last name"
                                aria-label="Williams"
                                required
                                onChange={(e) => setLastName(e.target.value)}
                              />
                              <span class="invalid-feedback">
                                Please enter your last name.
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="mb-4">
                          <input
                            type="email"
                            class="form-control form-control-lg"
                            name="email"
                            id="signupSrEmail"
                            placeholder="Email"
                            aria-label="Markwilliams@site.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <span class="invalid-feedback">
                            Please enter a valid email address.
                          </span>
                        </div>

                        <div class="mb-4">
                          <div class="input-group-merge">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              class="js-toggle-password form-control form-control-lg"
                              name="password"
                              id="signupSrPassword"
                              placeholder="Password"
                              aria-label="8+ characters required"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                              data-hs-toggle-password-options='{
                                   "target": [".js-toggle-password-target-1", ".js-toggle-password-target-2"],
                                   "defaultClass": "bi-eye-slash",
                                   "showClass": "bi-eye",
                                   "classChangeTarget": ".js-toggle-password-show-icon-1"
                                 }'
                            />
                            <p
                              class="js-toggle-password-target-1 input-group-append input-group-text"
                              onClick={togglePasswordVisibility}
                              style={{ cursor: "pointer" }}
                            >
                              <i class="js-toggle-password-show-icon-1 bi-eye"></i>
                            </p>

                            <span class="invalid-feedback">
                              Your password is invalid. Please try again.
                            </span>
                          </div>
                        </div>

                        <div class="mb-4">
                          <div class="input-group-merge">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              class="js-toggle-password form-control form-control-lg"
                              name="confirmPassword"
                              id="signupSrConfirmPassword"
                              placeholder="Confirm password"
                              aria-label="8+ characters required"
                              required
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              data-hs-toggle-password-options='{
                                   "target": [".js-toggle-password-target-1", ".js-toggle-password-target-2"],
                                   "defaultClass": "bi-eye-slash",
                                   "showClass": "bi-eye",
                                   "classChangeTarget": ".js-toggle-password-show-icon-2"
                                 }'
                            />
                            <p
                              class="js-toggle-password-target-2 input-group-append input-group-text"
                              onClick={togglePasswordVisibility}
                              style={{ cursor: "pointer" }}
                            >
                              <i class="js-toggle-password-show-icon-2 bi-eye"></i>
                            </p>

                            {isPasswordSame === false ? (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  margin: "0",
                                  paddingLeft: "15px",
                                }}
                              >
                                Password does not match the confirm password.
                              </p>
                            ) : (
                              ""
                            )}

                            <span class="feedback"></span>
                          </div>
                        </div>

                        <div class="form-check mb-4">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="termsCheckbox"
                            required
                          />
                          <label class="form-check-label" for="termsCheckbox">
                            I accept the <a href="/">Terms and Conditions</a>
                          </label>
                          <span class="invalid-feedback">
                            Please accept our Terms and Conditions.
                          </span>
                        </div>

                        <div class="d-grid gap-4">
                          <button type="submit" class="btn btn-primary btn-lg">
                            {isLoading ? (
                              <LoadingOutlined />
                            ) : (
                              "Create an account"
                            )}
                          </button>
                          <p class="card-text text-muted">
                            Remember your password?{" "}
                            <p
                              class="link"
                              style={{ cursor: "pointer" }}
                              onClick={handleSwitch}
                            >
                              Log in
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
export default SignUp;
