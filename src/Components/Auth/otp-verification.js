import React from "react";
import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { OtpVerificationPageStyled } from "./style";

import { LoadingOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import AxiosInstance from "../../Config/axios";
import { registration_payment_path } from "../../Config/config";

const items = [
  {
    title: "Verification",
  },
  {
    title: "Plan",
  },
  // {
  //   title: "Payment",
  // },
];
const OtpVerification = () => {
  const [warning, setWarning] = useState("");

  const [otpPin, setOtpPin] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email = sessionStorage.getItem("email");

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index, event) => {
    const input = event.target.value;

    if (/^\d?$/.test(input)) {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index] = input;

      if (input && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      setOtpPin(updatedOtpPin);
    }

    //updating the postcodes as an array
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otpPin[index] === "") {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index - 1] = "";

      setOtpPin(updatedOtpPin);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (
      event.key === "ArrowRight" &&
      index < 5 &&
      otpPin[index] !== ""
    ) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const joinedOtpPin = otpPin.join("");

    AxiosInstance.post("/api/otp/verify-otp", {
      email: email,
      otp: joinedOtpPin,
    })
      .then(async (response) => {
        setIsLoading(false);

        if (!response.status === 200) {
          alert("something wrong");
          return;
        }

        navigate(registration_payment_path);
      })
      .catch((err) => {
        setIsLoading(false);
        setWarning("Invalid OTP");

        console.log(err);
      });
  };

  return (
    <>
      <OtpVerificationPageStyled>
        <div
          style={{
            marginTop: "100px",
            transition: "all 0.3s ease",
          }}
          class="overflow-hidden "
        >
          <div
            style={{ display: "grid", placeItems: "center" }}
            className="col-12 mb-5"
          >
            <Steps
              className="col-lg-8 col-12"
              current={0}
              size="small"
              items={items}
            />
          </div>

          <div
            style={{ display: "grid", placeItems: "center" }}
            class="container col-12 text-left"
          >
            <div className="col-lg-8 col-12">
              <div>
                <div>
                  <h3>Enter Verification Code</h3>
                </div>
                <p style={{ width: "80%" }}>
                  Please type in the <span>6-digit code</span>
                  sent to your email. If it does not appear in your Inbox,
                  please check your Updates, Quarantined or Spam folders.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                {otpPin.map((otp, index) => (
                  <input
                    style={{
                      width: "30px",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid black",
                      outline: "none",
                    }}
                    key={index}
                    type="number"
                    id={`otp-${index}`}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={otp}
                    onChange={(event) => handleInputChange(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    maxLength={1}
                  />
                ))}

                <p style={{ color: "red" }}>{warning}</p>
                <br />

                {otpPin.length > 5 ? (
                  <button
                    style={{ background: "black", color: "white" }}
                    className="btn"
                    type="submit"
                  >
                    {isLoading ? <LoadingOutlined /> : "Verify"}
                  </button>
                ) : (
                  <button
                    disabled
                    style={{ background: "black", color: "white" }}
                    className="btn"
                    type="submit"
                  >
                    {isLoading ? <LoadingOutlined /> : "Verify"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </OtpVerificationPageStyled>
    </>
  );
};

export default OtpVerification;
