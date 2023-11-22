import React from "react";
import NavBar from "../../components/nav-bar";
const ProfilerPage = () => {
  return (
    <div>
      <NavBar />
      <div className="vh-100" style={{ display: "grid", placeItems: "center" }}>
        <div>
          <h1>
            We are Available <span className="text-primary">soon!</span>{" "}
          </h1>
          <h5>
            Currently we are working on our products and will be launching soon.
            Do not miss it
          </h5>
          <section id="contact" class="contact">
            <div class="container" data-aos="fade-up">
              <h2>
                Are you excited about the products?{" "}
                <a href="/contact">Contact us now</a>
              </h2>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilerPage;
