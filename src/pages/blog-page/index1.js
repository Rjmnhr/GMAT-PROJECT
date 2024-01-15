import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../../components/nav-bar";
import blog2Image from "../../icons/blog2-image.jpg";
import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";
const BlogsPage1 = () => {
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
          <strong>
            Building a Strong MBA Resume: What Business Schools Look For{" "}
          </strong>
        </h2>
        {isMobile ? (
          <div className="col-lg-6">
            <img
              width={"100%"}
              className="mb-3"
              src={blog2Image}
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
                Crafting an effective MBA resume goes beyond listing
                achievements. Here's what business schools value most
              </h4>
              <section className="p-0">
                <h4>1. Numbers that Matter:</h4>
                <p>
                  Showcase achievements with tangible results. Numbers speak
                  volumes and demonstrate your impact
                </p>
              </section>

              <section className="p-0 mb-3">
                <h4>2.Leadership Stories:</h4>
                <p>
                  Highlight experiences where you led or played a key role.
                  Business schools want candidates with leadership potential.
                </p>
              </section>
              <section className="p-0 mb-3">
                <h4>2.Professional Impact:</h4>
                <p>
                  Share your professional journey, emphasizing growth and the
                  positive changes you've made
                </p>
              </section>

              <section className="p-0 mb-3">
                <h4>4. Community Involvement:</h4>
                <p>
                  Mention your community service or extracurricular activities.
                  Business schools appreciate candidates who contribute beyond
                  work.
                </p>
              </section>

              <section className="p-0 mb-3">
                <h4>5. Innovative Contributions:</h4>
                <p>
                  Showcase instances where your innovative thinking led to
                  solutions. Business schools seek fresh perspectives
                </p>
              </section>
              <section className="p-0 mb-3">
                <h4>6. Global Perspective:</h4>
                <p>
                  If relevant, mention experiences that reflect your global
                  exposure. Adaptability is a key trait
                </p>
              </section>
              <section className="p-0 mb-3">
                <h4>6. Clear and Concise Style:</h4>
                <p>
                  Keep it clear and concise. Business schools prefer resumes
                  that are easy to read, focusing on key accomplishments
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
                src={blog2Image}
                alt="job compensation"
              />
            </div>
          )}
        </div>
        <div className="container">
          <p className="mb-3" style={{ fontWeight: "bold" }}>
            Craft your MBA resume with these elements to tell a compelling story
            of your professional journey, showcasing not just what you've
            achieved but the potential you bring to the MBA experience.
          </p>

          <a className="mb-5 pb-5" href="/profiler">
            <button className="btn btn-lg btn-primary">
              Use Free Profile Evaluator
            </button>
          </a>
        </div>
        <div class="col-12 d-flex justify-content-center mt-8">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                style={{ fontSize: "30px" }}
                class="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                href="https://www.facebook.com/profile.php?id=61555040602683"
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

export default BlogsPage1;
