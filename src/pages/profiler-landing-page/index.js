import React from "react";
import NavBar from "../../components/nav-bar";
import { ProfilerLandingPageStyled } from "./style";

const ProfilerLandingPage = () => {
  return (
    <div className="profiler-landing-page">
      <NavBar />
      <ProfilerLandingPageStyled>
        <section
          style={{ marginTop: "100px" }}
          className="d-flex align-items-center"
        >
          <div className="container" data-aos="zoom-out" data-aos-delay="100">
            <div className="d-lg-flex ">
              <div className="col-xl-6 text-left">
                <h1 className="mb-3 text-primary">MBA Success with Profiler</h1>
                <h2>
                  Revolutionize your MBA journey with our Profiler tool,
                  offering guidance in key areas such as{" "}
                  <span className="highlight">MBA college selection</span>,{" "}
                  <span className="highlight">Profile evaluation</span>, and{" "}
                  <span className="highlight">MBA application assistance</span>.
                </h2>
                <a href="/profiler" className="btn-get-started scrollto">
                  <button class="cta btn-primary mt-3">
                    <span>Get Started with Profiler</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </a>

                <br />
                <a
                  href="/gmat"
                  className="btn-get-started "
                  style={{ background: "transparent" }}
                >
                  <button
                    style={{ background: "#b1dae7" }}
                    className="btn btn-lg mt-3 rounded-0"
                  >
                    {" "}
                    Explore GMAT Prep
                  </button>
                </a>
              </div>
              <div className="col-xl-6 text-left">
                <img
                  width={"100%"}
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1705053979/gdvpl9xike3vjg4hdeia.jpg"
                  alt="Profile Evaluation"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about col-md-12 bg-light ">
          <div className="col-xl-12 d-flex align-items-stretch ">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="section-title">
                <h2>Benefits of Profiler</h2>
                <p>
                  Discover the advantages of using Profiler for your MBA
                  admissions journey.
                </p>
              </div>
              <div className="d-lg-flex justify-content-center flex-wrap">
                <div
                  className="col-md-4  p-3 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h4 className="text-primary">Personalized Insights</h4>
                  <p>
                    Receive tailored recommendations and insights based on your
                    unique profile, guiding you towards successful MBA
                    applications.
                  </p>
                </div>
                <div
                  className="col-md-4 p-3 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h4 className="text-primary">Optimized College Selection</h4>
                  <p>
                    Utilize our AI-driven Profiler tool to identify the best-fit
                    business schools based on your background, preferences, and
                    career goa
                  </p>
                </div>

                <div
                  className="col-md-4 p-3    icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <h4 className="text-primary">
                    Efficient Application Assistance
                  </h4>
                  <p>
                    Streamline your MBA application process with expert
                    assistance at every step. From essay writing to resume
                    building, our Profiler tool provides efficient support for a
                    compelling application.
                  </p>
                </div>

                <div
                  className="col-md-4 p-3 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <h4 className="text-primary">Enhanced GMAT Preparation</h4>
                  <p>
                    Elevate your GMAT preparation with targeted mock tests and
                    customized coaching suggestions. The Profiler tool assists
                    you in optimizing your GMAT performance for successful
                    business school admissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="about col-md-12 ">
          <div className="col-xl-12 d-flex align-items-stretch ">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="section-title">
                <h2> Key Features of Profiler</h2>
                <p>
                  Empowering your journey through personalized insights and
                  expert assistance in various aspects of MBA admissions.
                </p>
              </div>
              <div className="row">
                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-chart"></i>
                  <h4>Profile Evaluation</h4>
                  <p>
                    Leverage Profiler's sophisticated algorithms for a thorough{" "}
                    <span className="highlight">profile evaluation</span>,
                    ensuring a strategic approach to business school admissions.
                  </p>
                </div>
                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bx bx-cube-alt"></i>
                  <h4>College Selection Guidance</h4>
                  <p>
                    Make informed decisions with Profiler's guidance on choosing
                    the right business school. Tailor your{" "}
                    <span className="highlight">college selection</span> based
                    on your preferences and goals.
                  </p>
                </div>

                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bx bx-shield"></i>
                  <h4>Targeted GMAT Coaching</h4>
                  <p>
                    Excel in the GMAT with personalized coaching strategies that
                    focus on your specific strengths and weaknesses, maximizing
                    your chances of success in{" "}
                    <span className="highlight">GMAT</span>.
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
        <section id="about" className="about col-md-12 ">
          <div className="col-xl-12 d-flex align-items-stretch ">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="section-title">
                <h2> How it works</h2>
                <p>Explore the simple steps to make the most of Profiler.</p>
              </div>
              <div className="row">
                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-pen"></i>
                  <h4>Step 1: Sign Up</h4>
                  <p>
                    Create your account on Profiler and kickstart your journey.
                  </p>
                </div>
                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bx bx-receipt"></i>
                  <h4>Step 2: Profile Assessment</h4>
                  <p>
                    Complete a comprehensive profile assessment to uncover your
                    strengths and areas for improvement.
                  </p>
                </div>

                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bx bx-circle"></i>
                  <h4>Step 3: Personalized Insights</h4>
                  <p>
                    Receive personalized insights based on your profile
                    assessment, tailored to enhance your MBA application
                    journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ProfilerLandingPageStyled>
    </div>
  );
};

export default ProfilerLandingPage;
