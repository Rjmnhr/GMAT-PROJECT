import React, { useEffect } from "react";
import NavBar from "../../Layout/nav-bar";
import { GMATLandingPageStyled } from "./style";
import { gmat_dashboard_path, login_path } from "../../Config/config";
import FooterComponent from "../../Layout/footer";
import { useApplicationContext } from "../../Context/app-context";
import { useNavigate } from "react-router-dom";

const GMATLandingPage = () => {
  const { userData } = useApplicationContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      navigate(gmat_dashboard_path);
    }
  }, [userData, navigate]);
  return (
    <>
      <div className="profiler-landing-page">
        <NavBar />
        <GMATLandingPageStyled>
          <div
            style={{ marginTop: "150px" }}
            className="d-lg-flex align-items-center"
          >
            <div className="container" data-aos="zoom-out" data-aos-delay="100">
              <div className="d-lg-flex ">
                <div className="col-xl-6 text-left">
                  <h1 className="mb-3 text-primary">
                    Master the GMAT with Our Practice Test Tool
                  </h1>
                  <p className="lead">
                    Elevate your GMAT preparation to new heights with our
                    comprehensive practice test tool. Whether you're aiming for
                    top scores or aiming to improve your performance, our
                    intuitive interface, vast question bank, and detailed
                    analytics empower you to track your progress, identify areas
                    for improvement, and optimize your study strategy.
                  </p>

                  <button
                    onClick={() =>
                      navigate(`${login_path}?p=${gmat_dashboard_path}`)
                    }
                    class="custom-demo-btn shadow mt-5 mb-5"
                  >
                    <span>Login / Register to take test</span>
                  </button>

                  <br />
                </div>
                <div
                  className="col-lg-6"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  {/* <img
                      className="img-fluid"
                      src="./assets/img/mockups/img1.png"
                      alt="Img"
                    /> */}

                  <div className="col mb-5">
                    {/* eslint-disable-next-line*/}
                    <a className="card card-ghost card-transition-zoom h-100">
                      <div className="card-transition-zoom-item">
                        <div className="image-overlay">
                          <img
                            width={"100%"}
                            className="card-img"
                            src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1711537744/wijtkitnjovh294o75eh.jpg"
                            alt="Description"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="about" className="about col-md-12 ">
            <div className="col-xl-12 d-flex align-items-stretch ">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="section-title">
                  <h2> Key Features of GMAT Practice test</h2>
                </div>
                <div className="row">
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-chart"></i>
                    <h4>Adaptive GMAT Algorithm</h4>
                    <p>
                      Experience practice sessions with our adaptive algorithm,
                      which dynamically adjusts question difficulty based on
                      your performance.our algorithm ensures that your practice
                      sessions accurately reflect the challenges you'll face on
                      exam day
                    </p>
                  </div>
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="bx bx-cube-alt"></i>
                    <h4>Insights About Your Exam Results</h4>
                    <p>
                      Receive detailed insights into your exam results,
                      including a breakdown of your performance across different
                      sections and question types. Highlighting areas of
                      strength and areas for improvement, enabling you to focus
                      your study efforts more effectively.
                    </p>
                  </div>

                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="bx bx-shield"></i>
                    <h4>Official GMAT Test Structure</h4>
                    <p>
                      Practice under conditions that mirror the official GMAT
                      test format. From the layout and timing of each section to
                      the types of questions included, our tool replicates the
                      structure of the real exam, ensuring that you're fully
                      prepared and familiar with the test environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="about"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1705480579/zf6pa5mpsdx0hbaa1vwu.jpg)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "50vh",
              display: "grid",
              placeItems: "center",
            }}
            className="about container-fluid mb-5 "
          >
            <div style={{ width: "400px" }} className="content">
              <div
                className="col-md-12 icon-box"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img
                  width={50}
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1704954909/ce816moxqaisi49tgprk.png"
                  alt="Salary survey"
                />
                <h4 className="mt-3">
                  Your data is confidential and will be anonymized. We take
                  privacy seriously, and your information will not be shared.
                </h4>
              </div>
            </div>
          </section>
          <div className="section-title mt-5">
            <h2>INTRODUCING GMAT Focus Edition</h2>
          </div>
          <section className="d-lg-flex align-items-center">
            <div className="container" data-aos="zoom-out" data-aos-delay="100">
              <div className=" align-items-center ">
                <div className="col-xl-12 text-left">
                  <h3 className="mb-3 text-primary">
                    Timing of the Current GMAT exam vs GMAT Focus Edition
                  </h3>
                  <p className="mb-3">
                    The current GMAT has 65 minutes Verbal Reasoning, 62 minutes
                    Quantitative Reasoning, 30 minutes Integrated Reasoning and
                    30 minutes analytical writing assessment (essay section).
                    The total time is 3.1 hours.{" "}
                  </p>
                  <p className="mb-3">
                    The GMAT Focus Edition will have 45 minutes of Verbal
                    Reasoning, 45 minutes of Quantitative Reasoning and 45
                    minutes Data Insights. Total time is 2 hours and 15 minutes
                    with one optional 10-minute break.
                  </p>

                  <br />
                </div>
                <div className="col-xl-12 text-left">
                  <img
                    width={"100%"}
                    src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702484008/xtxkvh9scphlakk4nvw9.png"
                    alt="Profile Evaluation"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="d-lg-flex align-items-center">
            <div className="container" data-aos="zoom-out" data-aos-delay="100">
              <div className=" align-items-center ">
                <div className="col-xl-12 text-left">
                  <h3 className="mb-3 text-primary">
                    How are the current GMAT and the GMAT Focus scored?
                  </h3>
                  <p className="mb-3">
                    The current GMAT has a total score of between 200 and 800.
                    Verbal reasoning is scored between 6 and 51. Quantitative
                    Reasoning is scored between 6 and 51. There’s an Analytical
                    Writing score of 0-6 and an Integrated Reasoning score of
                    1-8. The GMAT Focus Edition has a single, unified score
                    gathered from the three sections. This gives business
                    schools an easier evaluation of the candidate’s ability,
                    making it an attractive option for students.
                  </p>

                  <br />
                </div>
                <div className="col-xl-12 text-left">
                  <img
                    width={"100%"}
                    src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702484235/awkqvf6pr9knfv6k1dtl.png"
                    alt="Profile Evaluation"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="d-lg-flex align-items-center">
            <div className="container" data-aos="zoom-out" data-aos-delay="100">
              <div className=" align-items-center ">
                <div className="col-xl-12 text-left">
                  <h3 className="mb-3 text-primary">
                    What sections do the GMAT and the GMAT Focus have?
                  </h3>
                  <p className="mb-3">
                    The current GMAT has Quantitative reasoning, Verbal
                    reasoning, Integrated Reasoning, and Analytical writing
                    assessment. The new GMAT Focus Edition has just three
                    sections: Quantitative reasoning, Verbal reasoning, and Data
                    insights. This means no more essay section which will be
                    welcome news to many students.
                  </p>
                  <p className="mb-3 ">
                    The current GMAT has multiple-choice questions plus an essay
                    section. The new GMAT Focus Edition removes the essay
                    section and has all multiple-choice questions.
                  </p>
                  <p className="mb-3">
                    The current GMAT has the order of the sections defined, but
                    the new GMAT Focus Edition allows you to complete sections
                    in any order you prefer.
                  </p>
                  <p className="mb-3">
                    The new GMAT Focus Edition is flexible. You can bookmark and
                    review as many questions as possible. Change up to 3 answers
                    per section. The current GMAT has no option to bookmark,
                    edit, or review questions and answers.
                  </p>
                  <p>
                    Score sending is improved with the GMAT Focus Edition. You
                    can send results to 5 schools for free after you know your
                    score in both the online and the test centers. The current
                    GMAT allows you to select five schools to send the score for
                    free before starting the exam.
                  </p>

                  <br />
                </div>
                <div className="col-xl-12 text-left">
                  <img
                    width={"100%"}
                    src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702484581/jcuszxrvwaidtx4x08aw.png"
                    alt="Profile Evaluation"
                  />
                </div>
              </div>
            </div>
          </section>
        </GMATLandingPageStyled>
        <FooterComponent />
      </div>
    </>
  );
};

export default GMATLandingPage;
