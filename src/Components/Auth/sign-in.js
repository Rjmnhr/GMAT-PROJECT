import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplicationContext } from "../../Context/app-context";
import { Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import AxiosInstance from "../../Config/axios";
import { lms_path } from "../../Config/config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useApplicationContext();
  const navigate = useNavigate();
  const Location = useLocation();
  const { setIsSignIn } = useApplicationContext();
  const [messageApi, contextHolder] = message.useMessage();
  const searchParams = new URLSearchParams(Location.search);
  const path = searchParams.has("p") ? searchParams.get("p") : lms_path;

  const handleSwitch = () => {
    setIsSignIn(false);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await AxiosInstance.post("/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.data;
      console.log("🚀 ~ handleSubmit ~ data:", data);

      setIsLoading(false);

      if (data.status !== 200) {
        error("Wrong password or username");
        document.querySelector(".ant-input-affix-wrapper").style.border =
          "1px solid red";
        document.querySelector("#email-login").style.border = "1px solid red";
        return;
      }

      success();

      const accessToken = data.accessToken;
      setUserData(data);
      if (!accessToken) return error(data);

      localStorage.setItem("accessToken", accessToken);

      setEmail("");
      setPassword("");
      navigate(path);
    } catch (err) {
      error("Something Wrong");
      console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successfully",
    });
  };

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
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      {contextHolder}
      <div class="container card col-12  p-5" data-aos="fade-up">
        <div class="section-title">
          <h2>Login to Adeft Education</h2>
        </div>
        <p style={{ fontSize: "12px" }} className="container mb-3">
          By signing in to Adeft education, I agree to the{" "}
          {/* <a href="/conditions-of-use" target="blank">
                    Conditions of use
                  </a>{" "}
                  and{" "} */}
          <a href="/privacy-policy" target="blank">
            Privacy policy
          </a>
        </p>
        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-12">
            <form class="php-email-form" onSubmit={handleSubmit}>
              <div class="col form-group">
                <Input
                  style={{ borderRadius: "0", height: "50px" }}
                  type="email"
                  name="email"
                  id="email-login"
                  Password
                  placeholder="Email"
                  data-rule="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="validate"></div>
              </div>
              <div className="mb-3 col-12 col-lg-12">
                <Input.Password
                  style={{ height: "50px", borderRadius: "0" }}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="text-start"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-end mb-4">
                <a className="form-label-link" href="/forgot-password">
                  Forgot Password?
                </a>
              </div>

              <div class="text-center">
                <button className="btn btn-primary w-75 mb-3" type="submit">
                  {isLoading ? <LoadingOutlined /> : "Log in"}
                </button>
                {/* <GoogleLoginComponent element={"Log in with Google"} /> */}
                <p class="card-text text-muted">
                  Don't have an account yet?
                  <span
                    class="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={handleSwitch}
                  >
                    {" "}
                    Sign up here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;