import React, { useState } from "react";
import { ResumeBuilderStyled } from "./style";
import ResumeComponent from "./resume";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@mui/icons-material";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("Untitled");

  return (
    <div>
      <div>
        <div className="py-2 py-lg-3 bg-primary d-flex justify-content-between px-5">
          <button
            onClick={() => navigate("/")}
            className="btn border-light text-light "
          >
            <ArrowLeftOutlined /> Resumes
          </button>
          <div className="col">
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                textAlign: "center",
                color: "white",
                fontWeight: "bolder",
              }}
            />
          </div>
          <button className="btn btn-light col-2">
            Download <DownloadOutlined />
          </button>
        </div>
        <ResumeBuilderStyled>
          <div className="d-lg-flex">
            <div className="col-lg-6 text-left p-2 p-lg-3">
              <h5 className="pl-3">Personal Details</h5>

              <div id="contact" className="resume-input mt-4">
                <div className="container" data-aos="fade-up">
                  <div className="row" data-aos="fade-up" data-aos-delay="100">
                    <div className="col">
                      <form action="forms/contact.php" method="post">
                        <div className="row">
                          <div className="col form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control "
                              id="name"
                              data-rule="minlen:4"
                              data-msg="Please enter at least 4 chars"
                            />
                          </div>

                          <div className="col form-group">
                            <label>Surname</label>
                            <input
                              type="text"
                              name="surname"
                              className="form-control "
                              id="surname"
                              data-rule="minlen:4"
                              data-msg="Please enter at least 4 chars"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              data-rule="email"
                              data-msg="Please enter a valid email"
                            />
                          </div>
                          <div className="col form-group">
                            <label>Phone</label>
                            <input
                              type="phone"
                              className="form-control"
                              name="phone"
                              id="phone"
                              data-rule="phone"
                              data-msg="Please enter a valid phone"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            data-rule="minlen:4"
                            data-msg="Please enter at least 8 chars of address"
                          />
                        </div>

                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            name="message"
                            rows="5"
                            data-rule="required"
                            data-msg="Please write something for us"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="resume-preview col-lg-6 border-left p-2 p-lg-3 ">
              {/* <img
                src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1712309085/h5imtgngprvngav5llyv.jpg"
                alt="resume"
              /> */}
              <ResumeComponent />
            </div>
          </div>
        </ResumeBuilderStyled>
      </div>
    </div>
  );
};

export default ResumeBuilder;
