import React from "react";
import {
  gmat_landing_path,
  practice_questions_path,
  profiler_landing_path,
  videos_path,
} from "../Config/config";

const FooterComponent = () => {
  return (
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 footer-contact text-left">
              <h3>
                Adeft Education<span>.</span>
              </h3>

              <p>
                <strong>Indian Headquarter:</strong>
                <br />
                11th Main Road, HAL 2nd Stage <br />
                Indira Nagar, Bangalore,
                <br />
                Karnataka-560038
                <br />
                <strong>Email:</strong> team@adefteducation.com
                <br />
              </p>
            </div>

            <div class="col-lg-2 col-md-6 footer-links text-left">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i class="bx bx-chevron-right"></i> <a href="/#">Home</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="#about">About us</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="#services">Services</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i> <a href="#team">Team</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="#faq">Frequently Asked Questions</a>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 footer-links text-left">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={gmat_landing_path}>GMAT</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={profiler_landing_path}>Profiler</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={practice_questions_path}>Practice questions</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={videos_path}>Videos</a>
                </li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-6 footer-newsletter text-left">
              <h4>Join Our Newsletter</h4>
              <p>
                Please enter your email if you are interested to read about our
                regular work, live case studies, what's happening in businesses
                around and some interesting trends
              </p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="container d-md-flex py-4">
        <div class="me-md-auto text-center text-md-left"></div>
        <div class="social-links text-center text-md-right pt-3 pt-md-0">
          {/* <a href="/#" class="twitter">
          <i class="bx bxl-twitter"></i>
        </a> */}
          <a href="https://www.facebook.com/adefteducation" class="facebook">
            <i class="bx bxl-facebook"></i>
          </a>
          {/* <a href="/#" class="instagram">
          <i class="bx bxl-instagram"></i>
        </a>
        <a href="/#" class="google-plus">
          <i class="bx bxl-skype"></i>
        </a> */}
          <a
            href="https://www.linkedin.com/company/adefteducation"
            class="linkedin"
          >
            <i class="bx bxl-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
