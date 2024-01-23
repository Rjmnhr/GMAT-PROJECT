import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../../components/nav-bar";

import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";
const BlogsPage2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Blogs | Adeft Education</title>

        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />

      <div
        style={{ marginTop: "100px", borderTop: "1px solid black pb-3" }}
        className="container-fluid p-0 p-lg-3  text-left text-lg-center"
      >
        <h2 className="mb-3">
          {" "}
          <strong>Confidence Boost: Mastering the Art of Video Essays</strong>
        </h2>
        {isMobile ? (
          <div className="col-lg-6">
            <img
              width={"100%"}
              className="mb-3"
              src={
                "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1706019198/ypsd6uhqf24i25uzp0jj.jpg"
              }
              alt="job compensation"
            />
          </div>
        ) : (
          ""
        )}
        <div className="d-lg-flex container align-items-center p-0 p-lg-2">
          <div className="container col-lg-6 p-2 p-lg-3 text-left mt-3">
            <div>
              <h4 className="mb-3">
                In the landscape of MBA applications, video essays play a
                pivotal role in showcasing your personality. Beyond the
                traditional written components, a well-crafted video essay can
                set you apart. Here's how our unique approach can assist you in
                mastering this art.
              </h4>
              <section className="p-0">
                <h4>1. Tailored Guidance::</h4>
                <p>
                  Video essays demand authenticity. Our tool offers personalized
                  guidance, helping you tailor your content to align seamlessly
                  with your overall application narrative.
                </p>
              </section>

              <section className="p-0 mb-3">
                <h4>2.Craft Compelling Narratives:</h4>
                <p>
                  Our platform empowers you to create narratives that resonate
                  with your strengths and aspirations. Leverage our tool to
                  identify and articulate key points that captivate your
                  audience.
                </p>
              </section>
              <section className="p-0 mb-3">
                <h4>3.Confidence-Boosting Techniques:</h4>
                <p>
                  Confidence is key. Our platform provides strategies to enhance
                  your confidence – refining your delivery style and helping you
                  articulate your achievements with conviction.
                </p>
              </section>

              <section className="p-0 mb-3">
                <h4>4. Technical Excellence Made Easy:</h4>
                <p>
                  Technical aspects shouldn’t be a hurdle. Our tool assists in
                  familiarizing you with platforms, testing equipment, and
                  optimizing your setup for a seamless and professional video
                  essay.
                </p>
              </section>

              <section className="p-0 mb-3">
                <h4>5. Mock Sessions for Real Preparedness:</h4>
                <p>
                  Practice makes perfect. Utilize our tool for mock video essay
                  sessions, simulating real scenarios. This hands-on experience
                  ensures you're well-prepared for the actual assessment.
                </p>
              </section>
              <section className="p-0 mb-3">
                <h4>6. Feedback-Driven Improvement:</h4>
                <p>
                  Receive valuable feedback from our platform. Iterative
                  improvement is the focus, refining your performance based on
                  insights and ensuring you present the best version of
                  yourself.
                </p>
              </section>
            </div>
          </div>
          {isMobile ? (
            ""
          ) : (
            <div className="col-lg-6">
              <img
                width={"100%"}
                className="mb-3"
                src={
                  "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1706019198/ypsd6uhqf24i25uzp0jj.jpg"
                }
                alt="job compensation"
              />
            </div>
          )}
        </div>
        <div className="container">
          <p className="mb-3" style={{ fontWeight: "bold" }}>
            Mastering video essays is not just about fulfilling a requirement;
            it's about gaining confidence in sharing your story. Elevate your
            application with our tool's support. Ready to boost your confidence?
            Check the tool now
          </p>

          <a className="mb-5 pb-5" href="/videos">
            <button className="btn btn-lg btn-primary">Click here</button>
          </a>
        </div>
        <div class="col-12 d-flex justify-content-center mt-8">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                style={{ fontSize: "30px" }}
                class="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                href="https://www.facebook.com/adefteducation"
              >
                <FacebookFilled />
              </a>
            </li>
            {/* <li class="list-inline-item">
                      <a
                        class="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                        href="/#"
                      >
                        <i class="bi-twitter"></i>
                      </a>
                    </li> */}
            {/* <li class="list-inline-item">
                      <a
                        class="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                        href="/#"
                      >
                        <i class="bi-instagram"></i>
                      </a>
                    </li> */}
            <li class="list-inline-item">
              <a
                style={{ fontSize: "30px" }}
                class="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                href="https://www.linkedin.com/company/adefteducation"
              >
                <LinkedinFilled />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BlogsPage2;
