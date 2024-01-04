import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Carousel, Collapse, Dropdown } from "antd";

import { useNavigate } from "react-router-dom";
import FooterComponent from "../../components/footer";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("adefteducation_accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const VerifyToken = async () => {
      try {
        const res = await fetch(
          "https://adeftbackend-z0bvyb2s.b4a.run/api/token/verify",
          // "http://localhost:8003/api/token/verify",
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
        // Handle the error here or return an error response if needed
        setIsAuthenticated(false);
      }
    };
    VerifyToken();

    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        // Redirect to the login page if not authenticated

        setIsLoggedIn(false);
      }
    }
  }, [isAuthenticated, accessToken]);

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

  // useEffect(() => {
  //   if (storedUserName) {
  //     // Split the full name into an array of words
  //     const nameArray = storedUserName.split(" ");

  //     // Get the first element of the array, which is the first name
  //     const firstName = nameArray[0];

  //     setUserName(firstName);
  //   }
  // }, [storedUserName]);
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("adefteducation_accessToken");
    localStorage.setItem("adefteducation_isLoggedIn");
  };
  const items = [
    // {
    //   key: "1",
    //   label: <a href="/account">My Account</a>,
    // },
    {
      key: "1",
      label: (
        <a href="#eq" onClick={handleLogOut}>
          Log out
        </a>
      ),
    },
  ];
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <body className={`${menuOpen ? "mobile-nav-active" : ""} `}>
        <button
          type="button"
          class="mobile-nav-toggle d-lg-none"
          onClick={handleMenuToggle}
        >
          <i
            style={{ color: "black" }}
            class={`${
              menuOpen ? "icofont-close" : " icofont-navigation-menu"
            } `}
          ></i>
        </button>
        <header id="header" className="fixed-top">
          <button type="button" class="mobile-nav-toggle d-lg-none">
            <i class="icofont-navigation-menu"></i>
          </button>
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="logo me-auto">
              <a href="/">
                Adeft<span>.</span>
              </a>
            </h1>

            <a href="/" className="logo me-auto">
              <img src="assets/img/logo.png" alt="" />
            </a>

            <nav
              class={`${
                menuOpen
                  ? "mobile-nav d-lg-none"
                  : " nav-menu d-none d-lg-block"
              } `}
            >
              <ul>
                <li>
                  <a href="#header">Home</a>
                </li>
                <li>
                  <a href="/profiler">Profiler</a>
                </li>
                <li>
                  <a href="/gmat">GMAT</a>
                </li>

                <li>
                  <ScrollLink
                    style={{ padding: "0" }}
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1000} // Adjust this duration value
                    // Use the easeInOutQuart easing function
                    // For custom easing functions, you can use external libraries like bezier-easing
                    // See: https://github.com/gre/bezier-easing
                    // easing="cubicBezier(0.77, 0, 0.175, 1)"
                    easing="easeInOutQuart"
                  >
                    <a href="#about">About</a>
                  </ScrollLink>
                </li>
                <li>
                  <a href="/practice-questions">Practice questions</a>
                </li>

                <li>
                  <a href="/videos">Videos</a>
                </li>

                <li>
                  <ScrollLink
                    style={{ padding: "0" }}
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1000} // Adjust this duration value
                    // Use the easeInOutQuart easing function
                    // For custom easing functions, you can use external libraries like bezier-easing
                    // See: https://github.com/gre/bezier-easing
                    // easing="cubicBezier(0.77, 0, 0.175, 1)"
                    easing="easeInOutQuart"
                  >
                    <a href="#contact">Contact</a>
                  </ScrollLink>
                </li>
                <li>
                  <a href="/blogs">Blog</a>
                </li>
                {isLoggedIn ? (
                  <>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomRight"
                      arrow
                    >
                      <li>
                        <a href="?#">Account</a>
                      </li>
                    </Dropdown>
                  </>
                ) : (
                  <li>
                    <a href="/login">Log in</a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>
      </body>

      <section id="hero" class="d-flex align-items-center">
        <div class="container" data-aos="zoom-out" data-aos-delay="100">
          <div class="row">
            <div class="col-xl-6 text-left">
              <h1>MBA Admissions advice based on real-life experience</h1>
              <h2>
                Our advice is based by more than 3 decades of real-life post MBA
                experience coupled with 20 years of assisting students get in
                the top 50 MBA schools
              </h2>
              <a href="/profiler" class="btn-get-started scrollto">
                Use Free Profile Evaluator
              </a>
              <br />
              <a
                href="/gmat"
                class="btn-get-started "
                style={{ background: "transparent" }}
              >
                Take Free GMAT Test
              </a>
              {isMobile ? <br /> : ""}
              <a
                href="/videos"
                class="btn-get-started ml-lg-2 "
                style={{ background: "transparent" }}
              >
                Videos
              </a>
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
      <section id="about" class="about section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row no-gutters">
            <div class="content col-xl-5 d-flex align-items-stretch">
              <div class="content">
                <div class="section-title">
                  <h2>About Us</h2>
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
                <p>Schools our students have gone in</p>
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
      <section id="services" class="services section-bg ">
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
                <p>
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
                <p>“to meet your preferred short term and long-term goals” </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                <i class="icofont-image"></i>
                <h4>
                  <a href="/#">Resume writing</a>
                </h4>
                <p>
                  Writing a business resume requires a structured outcome
                  focused approach and our consultants are industry experts who
                  have worked with many corporates and helped them look for
                  work. We have also helped students draft their perfect
                  application resume.{" "}
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
                <i class="icofont-settings"></i>
                <h4>
                  <a href="/#">Application essays</a>
                </h4>
                <p>
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
                <p>
                  It all starts with your profile - if you have a stellar
                  profile, writing essays and preparing your application is that
                  much simpler; you can't change the past but you can most
                  certainly improve your chances of selection by working on your
                  profile
                </p>
              </div>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="600">
                <i class="icofont-tasks-alt"></i>
                <h4>
                  <a href="/#">Video essays</a>
                </h4>
                <p>
                  Video essays are an integral part of many college applications
                  and more so in the current scenario. Learn from our
                  consultants on how to improve your confidence, your
                  enunciation and how to focus on content
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" class="testimonials">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Testimonials</h2>
            <p>Following are some of our student testimonials</p>
          </div>

          <Carousel autoplay>
            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3>Kiran Shah </h3>
                <h4>Tuck University</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  From the first time I spoke, I have been provided great
                  guidance and practical advice helping me differentiate myself
                  from other similar applicants
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3>John Lennox</h3>
                <h4>CEO &amp; Founder, Brisbane</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>I found
                  the business plan consulting a great journey. Not only were
                  the consultants extremely patient and understood my business
                  problem, their hand holding and ultimately helping me write my
                  business plan. We were successful in raising money
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div class="testimonial-wrap">
              <div class="testimonial-item">
                <h3>Sara Jacobson</h3>
                <h4>Entreprenuer, Sydney</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  Partnering with them to design our sales incentive program was
                  a brilliant decision. They collaborated closely with us to
                  align incentives with our goals. Our sales team's performance
                  has soared since implementing their strategies
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </section>
      <FAQSection />
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

      <section id="contact" class="contact">
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
              <p style={{ fontSize: "18px" }}>
                Do I really need an admission consultant?
              </p>
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
            \
          </Panel>

          <Panel
            style={{ borderBottom: "1px solid  #eee" }}
            header={
              <p style={{ fontSize: "18px" }}>
                How does the admissions consulting process work?
              </p>
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
              <p style={{ fontSize: "18px" }}>
                Do you help students prepare for specific colleges (e.g. ISB)?
              </p>
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
              <p style={{ fontSize: "18px" }}>
                How can I differentiate my background? How can I justify doing
                an MBA now? How do I articulate my goals?
              </p>
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
              <p style={{ fontSize: "18px" }}>
                I want to know a bit more about your frameworks and approaches.
                How is it different from other admissions firms?
              </p>
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
