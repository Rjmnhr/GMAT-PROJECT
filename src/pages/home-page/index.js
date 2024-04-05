import React, { useEffect, useRef, useState } from "react";
import { Carousel, Collapse } from "antd";
import { animateScroll as scroll } from "react-scroll";
import FooterComponent from "../../Layout/footer";
import AxiosInstance from "../../Config/axios";
import NavBar from "../../Layout/nav-bar";
import { gmat_landing_path, profiler_landing_path } from "../../Config/config";
import { useApplicationContext } from "../../Context/app-context";
import "./style.css";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = window.location.href;
  const { trigger } = useApplicationContext();
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

  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const serviceRef = useRef(null);
  const testimonialRef = useRef(null);
  const faqRef = useRef(null);

  function scrollToFunction(ref) {
    if (ref.current) {
      scroll.scrollTo(ref.current.offsetTop, {
        duration: 2000,
        smooth: "easeInOutQuart",
      });
    }
  }
  const path = window.location.hash;

  useEffect(() => {
    switch (path) {
      case "#about":
        scrollToFunction(aboutRef);
        break;
      case "#contact":
        scrollToFunction(contactRef);
        break;
      case "#services":
        scrollToFunction(serviceRef);
        break;
      case "#testimonials":
        scrollToFunction(testimonialRef);
        break;
      case "#faq":
        scrollToFunction(faqRef);
        break;

      default:
        break;
    }
  }, [path, trigger]);

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
      <NavBar />
      <section id="hero" class="d-flex align-items-center">
        <div class="container" data-aos="zoom-out" data-aos-delay="100">
          <div class="row">
            <div class="col-xl-6 text-left">
              <h1>MBA Admissions Consulting based on real-life experience</h1>
              <h2>
                Our advice is based by more than 3 decades of real-life post MBA
                experience coupled with 20 years of assisting students get in
                the top 50 MBA schools
              </h2>
              <a href={profiler_landing_path} class="btn-get-started scrollto">
                Use Free Profile Evaluator
              </a>
              <br />
              <a
                href={gmat_landing_path}
                class="btn-get-started "
                style={{ background: "transparent" }}
              >
                Take a GMAT Practice Test
              </a>
              {isMobile ? <br /> : ""}
            </div>
          </div>
        </div>
      </section>

      <section id="clients" class="clients">
        <div class="container" data-aos="zoom-in">
          <div class="row">
            <div class="col-md-12">
              <img
                src="assets/img/clients/All colleges.png"
                alt=""
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      <section ref={aboutRef} id="about" class="about section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row no-gutters">
            <div class="content col-xl-5 d-flex align-items-stretch">
              <div class="content">
                <div class="section-title">
                  <h2>About Us </h2>
                  <h1 style={{ fontSize: "16px" }}>
                    MBA Admissions Consulting Experts
                  </h1>
                </div>

                <h3>
                  We don't only look at your GMAT scores; we help you present
                  your best self
                </h3>
                <p>
                  We believe each student has a unique life story and if told
                  properly, each story can be articulated as a story of
                  leadership, failure, learning and demonstrate great
                  experience. Our consultants with their rich industry
                  experience and global network will help you frame your story
                  which puts you in the best light
                </p>
              </div>
            </div>
            <div class="col-xl-7 d-flex align-items-stretch">
              <div class="icon-boxes d-flex flex-column justify-content-center">
                <div class="row">
                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i class="bx bx-receipt"></i>
                    <h4>Our team</h4>
                    <p>
                      Each consultant has a minimum of ten years of experience
                      post their MBA and they have an MBA from world's top 50
                      schools
                    </p>
                  </div>
                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i class="bx bx-cube-alt"></i>
                    <h4>Our focus</h4>
                    <p>
                      Our relentless focus is to work with you and understand
                      your life journey, your future career aspirations and how
                      to help you get there
                    </p>
                  </div>
                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i class="bx bx-images"></i>
                    <h4>Our differentiation</h4>
                    <p>
                      - Unlike other consultants, we have 15 years of corporate
                      experience post the MBA. So, we know what it means to be
                      in your shoes
                    </p>
                  </div>
                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i class="bx bx-shield"></i>
                    <h4>Our approach</h4>
                    <p>
                      We provide more face time to our students, use various
                      management frameworks to articulate your goals and life
                      stories and will not stop till you make it
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="counts" class="counts">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="count-box">
                <i class="icofont-simple-smile"></i>
                <span data-toggle="counter-up">100</span>
                <p>
                  Schools our students have gone in Business School Admissions
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 mt-5 mt-md-0">
              <div class="count-box">
                <i class="icofont-document-folder"></i>
                <span data-toggle="counter-up">50</span>
                <p>+ Years of Experience among our consultants</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div class="count-box">
                <i class="icofont-live-support"></i>
                <span data-toggle="counter-up">1000</span>
                <p>Students pursuing MBA worldwide</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div class="count-box">
                <i class="icofont-users-alt-5"></i>
                <span data-toggle="counter-up">10</span>
                <p>Senior Consultant hours per application</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section ref={serviceRef} id="services" class="services section-bg ">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Services</h2>
            <p>
              Whether you have a very unique profile (literature student), a
              very common profile (Indian IT male) or a business profile
              (consultant, entrepreneur) we know how to make your stories stand
              out
            </p>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                <i class="icofont-computer"></i>
                <h4>
                  <a href="/#">College selection</a>
                </h4>
                <p className="text-left">
                  Our proprietary AI software, Profiler has been built using
                  more than 1,000 data points of actual students and is the
                  backbone of our college selection process. It considers your
                  background, your profile and your career goals to identify the
                  best college for you
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                <i class="icofont-chart-bar-graph"></i>
                <h4>
                  <a href="/#">Strengths and weakness</a>
                </h4>
                <p className="text-left">
                  Identifying strengths and addressing weaknesses is key to MBA
                  success. Ensuring a solid foundation for your preferred{" "}
                  <span className="highlight">
                    short-term and long-term goals
                  </span>
                  <span className="highlight"> MBA application journey</span>.
                  At the core of our methodology is a commitment to sculpting a
                  well-rounded profile for a successful{" "}
                  <span className="highlight">MBA application</span> journey.{" "}
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="500">
                <i class="icofont-earth"></i>
                <h4>
                  <a href="/#">Profile Evaluation</a>
                </h4>
                <p className="text-left">
                  Elevate your MBA journey with Profiler, our advanced AI tool
                  for profile evaluation and MBA application assistance.
                  Tailored for college selection, it analyzes data points to
                  guide your path to top business schools. Beyond GMAT coaching,
                  Profiler enhances strengths, addresses weaknesses, and crafts
                  compelling MBA application resumes. Transform your profile
                  with Profiler for a successful MBA admissions experience.
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                <i class="icofont-image"></i>
                <h4>
                  <a href="/#">GMAT preparation</a>
                </h4>
                <p className="text-left">
                  Elevate <span className="highlight">GMAT preparation</span>{" "}
                  with our comprehensive coaching. Our expert guidance goes
                  beyond traditional coaching, employing tailored strategies for
                  peak performance. Hone skills, boost confidence, and excel in
                  the GMAT for a spot in top-tier{" "}
                  <span className="highlight">business school admissions</span>.
                  Start your journey to success with our specialized GMAT
                  assistance.
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
                <i class="icofont-settings"></i>
                <h4>
                  <a href="/#">Application essays</a>
                </h4>
                <p className="text-left">
                  We have successfully assisted 1,000s of students get in their
                  college of choice - articulating your life stories and your
                  career goals is the most important part of the application; we
                  know how to structure your thinking and present yourself in
                  the best way
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="500">
                <i class="icofont-earth"></i>
                <h4>
                  <a href="/#">Profile building</a>
                </h4>
                <p className="text-left">
                  It all starts with your profile evaluation - if you have a
                  stellar profile, writing essays and preparing your application
                  is that much simpler; you can't change the past but you can
                  most certainly improve your chances of selection by working on
                  your profile
                </p>
              </div>
            </div>

            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="600">
                <i class="icofont-tasks-alt"></i>
                <h4>
                  <a href="/#">Video essays</a>
                </h4>
                <p className="text-left">
                  Video essays are an integral part of many college applications
                  and more so in the current scenario. Learn from our
                  consultants on how to improve your confidence, your
                  enunciation and how to focus on content
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="600">
                <i class="icofont-tasks-alt"></i>
                <h4>
                  <a href="/#">Application resume writing</a>
                </h4>
                <p className="text-left">
                  We ensure your application stands out with our personalized
                  resume writing assistance, setting you on the path to success
                  in{" "}
                  <span className="highlight">business school admissions.</span>
                  {""} We focus on presenting a compelling narrative that
                  resonates with{" "}
                  <span className="highlight">MBA admissions</span> committees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={testimonialRef} id="testimonials" class="testimonials">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Testimonials</h2>
            <p>Following are some of our student testimonials</p>
          </div>

          <Carousel autoplay>
            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3>​HARRIS M</h3>

                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>{" "}
                  <strong>Primary reason for joining:</strong> To acquire
                  directions for higher studies. To prepare for GMAT, for proper
                  Techniques and proper direction to handle Management Aptitude
                  tests.
                  <br />
                  <strong>Was that satisfied?</strong> Yes
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <div className="d-lg-flex justify-content-center align-items-center container mt-4">
                  <table className="table text-left col-lg-6">
                    <thead>
                      <tr>
                        <th>Aspect</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Faculty knowledge:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty presentation:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty punctuality:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quality of peer students:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Individual attention:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Self improvement observed:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Overall impression:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-lg-6 text-left">
                    <p className="mt-1">
                      <strong>
                        Would you like to continue with the college short
                        listing and essay editing services?
                      </strong>{" "}
                      Yes
                    </p>

                    <p>
                      <strong>Any other feedback?</strong> Your techniques are
                      excellent. I myself improved a lot after coming to class
                      and still improving. And I am assuring that anyone can
                      reach their target score with hard work and directions and
                      encouragement from you. If a very lazy guy like me can
                      improve this much without any hard work, you can make your
                      students to reach any heights with a bit of more
                      competition and motivation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3>Gaurav V. S.</h3>

                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>{" "}
                  <strong>Primary reason for joining:</strong> I joined your
                  class because I wanted to learn under a tutor who has a very
                  good teaching experience and pays personal attention to
                  students and provides personal guidance to the student until
                  he/she gets an admission in the intended college.
                  <br />
                  <strong>Was that satisfied?</strong> Yes, it satisfies all the
                  requirements that I was looking for. I am very satisfied with
                  the class and services.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <div className="d-lg-flex justify-content-center align-items-center container mt-4">
                  <table className="table text-left col-lg-6">
                    <thead>
                      <tr>
                        <th>Aspect</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Faculty knowledge:</strong>
                        </td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty presentation:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty punctuality:</strong>
                        </td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quality of peer students:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Individual attention:</strong>
                        </td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Self improvement observed:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Overall impression:</strong>
                        </td>
                        <td>10</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-lg-6 text-left">
                    <p className="mt-1">
                      <strong>
                        Would you like to continue with the college short
                        listing and essay editing services?
                      </strong>{" "}
                      Yes
                    </p>

                    <p>
                      <strong>Any other feedback?</strong> I think the class is
                      really good.I can’t think of any major aspects for
                      improvement as most of it is perfectly done. I don't see
                      much that needs changing because everything seems to be
                      going well.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3> TRISHA MAZUMDER</h3>

                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>{" "}
                  <strong>Primary reason for joining:</strong> To improve verbal
                  and keep me focused.
                  <br />
                  <strong>Was that satisfied?</strong> Yes, knowledge gained,
                  application needs improvement but that would be more of a
                  personal focus
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <div className="d-lg-flex justify-content-center align-items-center container mt-4">
                  <table className="table text-left col-lg-6">
                    <thead>
                      <tr>
                        <th>Aspect</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Faculty knowledge:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty presentation:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty punctuality:</strong>
                        </td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quality of peer students:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Individual attention:</strong>
                        </td>
                        <td>7</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Self improvement observed:</strong>
                        </td>
                        <td>7</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Overall impression:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-lg-6 text-left">
                    <p className="mt-1">
                      <strong>
                        Would you like to continue with the college short
                        listing and essay editing services?
                      </strong>{" "}
                      Yes
                    </p>

                    <p>
                      <strong>Any other feedback?</strong> The classes were good
                      , and I don't have any major suggestions for improvements.
                      Everything was fine, and I appreciate the effort put in by
                      the instructors. The teaching methods were effective, and
                      the atmosphere was good for learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3>Rohit Mantri</h3>

                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>{" "}
                  <strong>Primary reason for joining:</strong> To get guidance
                  for preparation of GMAT and ultimately get admission in a good
                  B School.
                  <br />
                  <strong>Was that satisfied?</strong> Yes for the most part.
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <div className="d-lg-flex justify-content-center align-items-center container mt-4">
                  <table className="table text-left col-lg-6">
                    <thead>
                      <tr>
                        <th>Aspect</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Faculty knowledge:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty presentation:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Faculty punctuality:</strong>
                        </td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quality of peer students:</strong>
                        </td>
                        <td>7</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Individual attention:</strong>
                        </td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Self improvement observed:</strong>
                        </td>
                        <td>6.5</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Overall impression:</strong>
                        </td>
                        <td>9</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-lg-6 text-left">
                    <p className="mt-2">
                      <strong>
                        Would you like to continue with the college short
                        listing and essay editing services?
                      </strong>{" "}
                      Yes
                    </p>

                    <p>
                      <strong>Any other feedback?</strong> Overall, the class is
                      doing an excellent job. I can't think of any significant
                      areas for improvement as most aspects are well-managed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </section>
      <div ref={faqRef}>
        <FAQSection />
      </div>
      {/* <section id="faq" class="faq">
        <div class="container text-left" data-aos="fade-up">
          <div class="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>

          <ul class="faq-list accordion" data-aos="fade-up">
            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
                class="collapsed"
                href="/"
              >
                Do I really need an admission consultant?
                <i class="bx bx-chevron-down icon-show"></i>
                <i class="bx bx-x icon-close"></i>
              </a>
              <div id="faq5" class="collapse" data-bs-parent=".faq-list">
                <p>
                  That is a very good question - the short answer is no; if you
                  have enough time on your hand, strong database of past
                  students and which colleges are more likely to accept students
                  like you and a good structured thinking that demonstrates
                  retrospection, introspection and clarity of thoughts, then you
                  don't need assistance; however if you don't, speak with us and
                  let us explain what the process is for you to then see if you
                  actually need help or not
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                class="collapsed"
                href="/"
                data-bs-target="#faq1"
              >
                How does the admissions consulting process work?
                <i class="bx bx-chevron-down icon-show"></i>
                <i class="bx bx-x icon-close"></i>
              </a>
              <div id="faq1" class="collapse" data-bs-parent=".faq-list">
                <p>
                  There is an initial free 30 minute consultation with one of
                  our consultants. Based on your needs, we identify which
                  service is relevant to you. Following that, we start our
                  consulting process to understand your profile, your career
                  aspirations and apply our frameworks
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
                class="collapsed"
                href="/"
              >
                Do you help students prepare for specific colleges (e.g. ISB)?
                <i class="bx bx-chevron-down icon-show"></i>
                <i class="bx bx-x icon-close"></i>
              </a>
              <div id="faq2" class="collapse" data-bs-parent=".faq-list">
                <p>
                  We have helped more than 100 students prepare for and gain
                  admission in ISB over the last 10 years - each school is
                  different and using our large database we know how to appeal
                  to specific B school adcoms and aligning each candidate with
                  the school values, strengths and success profiles
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
                class="collapsed"
                href="/"
              >
                How can I differentiate my background? How can I justify doing
                an MBA now? How do I articulate my goals?
                <i class="bx bx-chevron-down icon-show"></i>
                <i class="bx bx-x icon-close"></i>
              </a>
              <div id="faq3" class="collapse" data-bs-parent=".faq-list">
                <p>
                  These are all great questions and these are also the right
                  questions to ask - unfortunately the answers to these
                  questions are much more complex and requires us to work with
                  you, understand who you are, your life journey, your career
                  aspirations, validate your career goals and then work out an
                  application startegy for you
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
                class="collapsed"
                href="/"
              >
                I want to know more about your background. Do you have any
                videos?<i class="bx bx-chevron-down icon-show"></i>
                <i class="bx bx-x icon-close"></i>
              </a>
              <div id="faq4" class="collapse" data-bs-parent=".faq-list">
                <p>
                  Apart from the team section below, if you are looking for more
                  information, feel free to view my LinkedIn profile -
                  https://www.linkedin.com/in/indradeepmazumdar/ I have recorded
                  many videos on how to answer specific question type - you can
                  view those in my youtube channel indradeep.mazumdar
                </p>
              </div>
            </li>

            <li>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq6"
                class="collapsed"
                href="/"
              >
                I want to know a bit more about your frameworks and approaches.
                How is it different from other admissions firms?
                <i class="bx bx-chevron-down icon-show"></i>
                <i class="bx bx-x icon-close"></i>
              </a>
              <div id="faq6" class="collapse" data-bs-parent=".faq-list">
                <p>
                  Our biggest differentiator is that our team all have advanced
                  business degrees and come with a minimum of 10 years
                  experience. They all bring their own experience to the role;
                  however, we have used our own experience to determine
                  frameworks and models that work best for different students.
                  We understand how every student is different and our
                  customised solution is never the same for two students
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section> */}

      <section id="team" class="team section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Team</h2>
            <p>
              Our team of experienced and senior consultants has been
              hand-selected. The most relevant consultants are selected to work
              with you based on your selected college, background and desired
              post MBA work. Please contact us if you need details about our
              consultants
            </p>
          </div>

          <div class="row">
            <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div class="member" data-aos="fade-up" data-aos-delay="100">
                <div class="member-img">
                  <img
                    src="assets/img/team/Indradeep.jpeg"
                    class="img-fluid"
                    alt=""
                  />
                  <div class="social">
                    <a href="/">
                      <i class="icofont-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/Adeft-Consulting-101269558666723/">
                      <i class="icofont-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com/adeftconsulting/">
                      <i class="icofont-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/adeft-consulting/?viewAsMember=true">
                      <i class="icofont-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div class="member-info">
                  <h4>Adeft Education</h4>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 d-flex align-items-stretch">
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                We have more than 15 years experience as a consultant and in a
                corporate environment within India, US and Australia. We have
                worked in areas of strategy consulting, product management,
                technology and innovation and in HR and corporate governance.
                Our experience spans across start-ups, small to medium
                businesses and with the largest multinational and listed
                corporates. We also works with founders, CEOs, General Managers
                and Board on numerous matters and helps organisations manage
                growth
                <br />
                We are able to combine his life experience with your goals so
                that your essays appear to be well thought of, achieveable given
                your career so far and the school you are applying to
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contact" class="contact">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Contact</h2>
            <p>
              We work with students across the globe as most of our discussions
              happen on the phone or through web meetings
            </p>
          </div>

          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="info-box">
                    <i class="bx bx-map"></i>
                    <h3>Our Address</h3>
                    <p>Bangalore, India</p>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info-box mt-4">
                    <i class="bx bx-envelope"></i>
                    <h3>Email Us</h3>
                    <p>team@adefteducation.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <form
                action="forms/contact.php"
                method="post"
                class="php-email-form"
              >
                <div class="row">
                  <div class="col form-group">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                    />
                    <div class="validate"></div>
                  </div>
                  <div class="col form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                    />
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of subject"
                  />
                  <div class="validate"></div>
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    name="message"
                    rows="5"
                    data-rule="required"
                    data-msg="Please write something for us"
                    placeholder="Message"
                  ></textarea>
                  <div class="validate"></div>
                </div>
                <div class="mb-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent />
    </>
  );
};

export default HomePage;
const { Panel } = Collapse;
const FAQSection = () => {
  return (
    <section id="faq" className="faq">
      <div className="container text-left" data-aos="fade-up">
        <div className="section-title">
          <h2>Frequently Asked Questions</h2>
        </div>

        <Collapse
          accordion
          ghost
          bordered={false}
          defaultActiveKey={["0"]} // Set the default active key (index starts from 0)
          expandIconPosition="right"
        >
          <Panel
            style={{ borderBottom: "1px solid  #eee" }}
            header={
              <h1 style={{ fontSize: "18px" }}>
                Do I really need an admission consultant?
              </h1>
            }
            key="0"
          >
            <p style={{ fontSize: "16px" }}>
              That is a very good question - the short answer is no; if you have
              enough time on your hand, strong database of past students and
              which colleges are more likely to accept students like you and a
              good structured thinking that demonstrates retrospection,
              introspection and clarity of thoughts, then you don't need
              assistance; however if you don't, speak with us and let us explain
              what the process is for you to then see if you actually need help
              or not
            </p>
          </Panel>

          <Panel
            style={{ borderBottom: "1px solid  #eee" }}
            header={
              <h1 style={{ fontSize: "18px" }}>
                How does the admissions consulting process work?
              </h1>
            }
            key="1"
          >
            <p style={{ fontSize: "16px" }}>
              There is an initial free 30 minute consultation with one of our
              consultants. Based on your needs, we identify which service is
              relevant to you. Following that, we start our consulting process
              to understand your profile, your career aspirations and apply our
              frameworks
            </p>
          </Panel>

          <Panel
            style={{ borderBottom: "1px solid  #eee" }}
            header={
              <h1 style={{ fontSize: "18px" }}>
                Do you help students prepare for specific colleges (e.g. ISB)?
              </h1>
            }
            key="2"
          >
            <p style={{ fontSize: "16px" }}>
              We have helped more than 100 students prepare for and gain
              admission in ISB over the last 10 years - each school is different
              and using our large database we know how to appeal to specific B
              school adcoms and aligning each candidate with the school values,
              strengths and success profiles
            </p>
          </Panel>

          <Panel
            style={{ borderBottom: "1px solid  #eee" }}
            header={
              <h1 style={{ fontSize: "18px" }}>
                How can I differentiate my background? How can I justify doing
                an MBA now? How do I articulate my goals?
              </h1>
            }
            key="3"
          >
            <p style={{ fontSize: "16px" }}>
              These are all great questions and these are also the right
              questions to ask - unfortunately the answers to these questions
              are much more complex and requires us to work with you, understand
              who you are, your life journey, your career aspirations, validate
              your career goals and then work out an application startegy for
              you
            </p>
          </Panel>

          <Panel
            style={{ borderBottom: "1px solid  #eee" }}
            header={
              <h1 style={{ fontSize: "18px" }}>
                I want to know a bit more about your frameworks and approaches.
                How is it different from other admissions firms?
              </h1>
            }
            key="5"
          >
            <p style={{ fontSize: "16px" }}>
              Our biggest differentiator is that our team all have advanced
              business degrees and come with a minimum of 10 years experience.
              They all bring their own experience to the role; however, we have
              used our own experience to determine frameworks and models that
              work best for different students. We understand how every student
              is different and our customised solution is never the same for two
              students
            </p>
          </Panel>
        </Collapse>
      </div>
    </section>
  );
};
