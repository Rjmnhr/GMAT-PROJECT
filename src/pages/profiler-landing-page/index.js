import React from "react";
import NavBar from "../../components/nav-bar";

const ProfilerLandingPage = () => {
  return (
    <div className="profiler-landing-page">
      <NavBar />
      <section style={{marginTop:"100px"}}  className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
          <div className="d-lg-flex jus">
            <div className="col-xl-6 text-left">
              <h1 className="mb-3">MBA Success with Profiler</h1>
              <h2>
                Revolutionize your MBA journey with our  Profiler tool,
                offering  guidance in key areas such as{" "}
                <span className="highlight">MBA college selection</span>,{" "}
                <span className="highlight">Profile evaluation</span>, and{" "}
                <span className="highlight">MBA application assistance</span>.
              </h2>
              <a href="/profiler" className="btn-get-started scrollto">
                Get Started with Profiler
              </a>
              <br />
              <a
                href="/gmat"
                className="btn-get-started "
                style={{ background: "transparent" }}
              >
                Explore GMAT Prep
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

      <section id="benefits" className="benefits section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Benefits of Profiler</h2>
            <p>
              Discover the advantages of using Profiler for your MBA admissions
              journey.
            </p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <i className="icofont-check"></i>
                <h4>Personalized Insights</h4>
                <p>
                  Receive tailored recommendations and insights based on your
                  unique profile, guiding you towards successful MBA
                  applications.
                </p>
              </div>
            </div>
            {/* Add more benefits here */}
          </div>
        </div>
      </section>

      <section id="features" className="features section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Key Features of Profiler</h2>
            <p>
              Empowering your journey through personalized insights and expert
              assistance in various aspects of MBA admissions.
            </p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <i className="icofont-computer"></i>
                <h4>
                  <a href="/#">Profile Evaluation</a>
                </h4>
                <p>
                  Leverage Profiler's sophisticated algorithms for a thorough{" "}
                  <span className="highlight">profile evaluation</span>,
                  ensuring a strategic approach to business school admissions.
                </p>
              </div>
            </div>
            {/* Add more features here */}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Explore the simple steps to make the most of Profiler.</p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                <i className="icofont-ui-message"></i>
                <h4>Step 1: Sign Up</h4>
                <p>
                  Create your account on Profiler and kickstart your journey.
                </p>
              </div>
            </div>
            {/* Add more steps here */}
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        {/* Testimonials section with relevant content */}
      </section>

      <section id="contact" className="contact">
        {/* Contact section with call-to-action for users to engage with Profiler */}
      </section>
    </div>
  );
};

export default ProfilerLandingPage;
