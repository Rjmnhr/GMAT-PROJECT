import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import blogImage1 from "../../icons/gmat-blog-2.jpg";
import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";
import FooterComponent from "../../components/footer";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../components/axios";
import NavBar from "../../components/nav-bar";
const BlogsPage = () => {
  const navigate = useNavigate();
  const location = window.location.href;
  const userID = localStorage.getItem("adefteducation_user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

  return (
    <>
      <Helmet>
        <title>Blogs | Adeft Education</title>
        <meta
          name="description"
          content="Transform your MBA aspirations into reality with Adeft Education - a trusted consultancy with over three decades of post-MBA expertise"
        />
        <meta
          property="og:description"
          content="Transform your MBA aspirations into reality with Adeft Education - a trusted consultancy with over three decades of post-MBA expertise"
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />

      <div
        class="container content-space-2 content-space-lg-3 text-start "
        id="article"
        style={{ marginTop: "100px" }}
      >
        <div class="row mb-3">
          <div class="col-12 ">
            <figure class="blockquote-lg text-left mb-3">
              <h2 className="h1">
                Strategies for GMAT Success: Transforming Weaknesses into
                Strengths
              </h2>
            </figure>
          </div>
        </div>
        <div class="row mb-5 ">
          <div class="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <img class="img-fluid" src={blogImage1} alt="Description" />
          </div>
        </div>
        <div className="mb-3 text-left">
          <p style={{ fontSize: "18px" }} className="mb-3">
            Embarking on the challenging journey of GMAT preparation requires
            more than just showcasing strengths; it involves a strategic
            approach to convert weaknesses into opportunities. Recognizing and
            addressing these weaknesses is a crucial step toward achieving
            success on this standardized test
          </p>
          <p style={{ fontSize: "18px" }}>
            A holistic strategy involves a nuanced analysis of your profile,
            aiming not to conceal weaknesses but to understand and strategically
            present them. The goal is not evasion but proactive growth – turning
            vulnerabilities into strengths.{" "}
          </p>
        </div>

        <div class="col-12 p-0 mb-3 text-left ">
          <h4>So what are your weaknesses? Are you aware of them? </h4>
        </div>
        <div class="row  text-left mb-5">
          <div class="col-12 ">
            <p style={{ fontSize: "18px" }}>
              You can take our free GMAT diagnostic test and quickly detect your
              weaknesses.
            </p>

            <p style={{ fontSize: "18px" }}>
              Our proprietary methodology is based on actual adaptive test
              algorithm and reflects how the actual GMAT works.
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-10 offset-lg-2 mb-3">
          <figure class="blockquote-lg text-left mb-5">
            <h5>
              Login below and create a profile to test your skills and take your
              mock GMAT tests.
            </h5>
          </figure>
        </div>

        <div class="col-12 d-flex justify-content-center mb-3">
          <button
            onClick={() => navigate("/gmat")}
            className="btn btn-lg btn-primary"
          >
            Try Now!
          </button>
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
      <FooterComponent />
    </>
  );
};

export default BlogsPage;
