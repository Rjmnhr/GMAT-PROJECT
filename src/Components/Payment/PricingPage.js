import React from "react";

import { Steps } from "antd";

import CheckoutComponent from "./Checkout";
import { registration_stripe_price_code } from "../../Config/config";
import { RightCircleTwoTone } from "@ant-design/icons";

const items = [
  {
    title: "Verification",
  },
  {
    title: "Payment",
  },
  // {
  //   title: "Payment",
  // },
];

const RegistrationPricing = () => {
  return (
    <>
      <div
        style={{
          transition: "all 0.3s ease",
        }}
        class="overflow-hidden p-3"
      >
        <div
          style={{ display: "grid", placeItems: "center" }}
          className="col-12"
        >
          <Steps
            className="col-8"
            current={1}
            size="small"
            labelPlacement="vertical"
            items={items}
          />
        </div>

        <div class="container content-space-1">
          <div class="w-lg-65 text-center mx-lg-auto mb-5 mb-sm-7 mb-lg-10"></div>
          <div className="text-center mb-5">
            <h3>Choose your plan to continue </h3>
          </div>

          <div class="d-lg-flex justify-content-center mb-5">
            <div class="col-lg-4 col-sm-12 mb-4 mb-lg-0">
              <div class="card card-lg card-shadow card-pinned  h-100">
                <div class="card-body">
                  <div class="mb-3">
                    <h2 class="mb-1 text-primary">BASIC</h2>
                  </div>

                  <div class="d-flex-center mb-5">
                    <div class="flex-shrink-0">
                      <p style={{ fontSize: "2.5rem", fontWeight: "500" }}>
                        ₹ 5,000
                      </p>{" "}
                    </div>
                    {/* <div class="flex-grow-1 align-self-end ms-3">
                      <span class="d-block">USD / monthly</span>
                    </div> */}
                  </div>

                  <div class="pricing text-left px-3 mb-5">
                    <div className="mb-3 row">
                      <RightCircleTwoTone
                        style={{ fontSize: "20px", marginRight: "8px" }}
                      />{" "}
                      <p className="m-0">GMAT Practice Tests</p>
                    </div>

                    <div className="mb-3 row">
                      <RightCircleTwoTone
                        style={{ fontSize: "20px", marginRight: "8px" }}
                      />{" "}
                      <p className="m-0">GMAT Focus Edition Practice Test</p>
                    </div>
                    <div className="mb-3 row">
                      <RightCircleTwoTone
                        style={{ fontSize: "20px", marginRight: "8px" }}
                      />{" "}
                      <p className="m-0">GMAT Practice Questions</p>
                    </div>

                    <div className="mb-3 row">
                      <RightCircleTwoTone
                        style={{ fontSize: "20px", marginRight: "8px" }}
                      />{" "}
                      <p className="m-0">GMAT Video Tutorials</p>
                    </div>
                    <div className="mb-3 row">
                      <RightCircleTwoTone
                        style={{ fontSize: "20px", marginRight: "8px" }}
                      />{" "}
                      <p className="m-0">Profiler</p>
                    </div>
                  </div>

                  <CheckoutComponent
                    className="mt-5"
                    text={"Pay now"}
                    price={registration_stripe_price_code}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPricing;
