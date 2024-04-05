import React from "react";
import NavBar from "../../Layout/nav-bar";
import { BlogContentArr } from "./blogs-content-array";
import FooterComponent from "../../Layout/footer";

const BlogsMainPage = () => {
  return (
    <>
      <NavBar />

      <div style={{ marginTop: "100px" }} className="position-relative "></div>

      <div
        class="container content-space-2 content-space-lg-3 text-start "
        id="article"
      ></div>
      <div class="container content-space-1 content-space-lg-3 mt-5">
        <div class="row justify-content-lg-between">
          <div class="col-lg-12 p-0 p-lg-3 mb-10 mb-lg-0">
            <div class="d-grid gap-7 mb-7">
              {BlogContentArr.map((blog, index) => {
                return (
                  <div class="card p-lg-3 p-0 m-3 text-left card-flush card-stretched-vertical">
                    <div class="row">
                      <div class="col-sm-5">
                        <img
                          class="card-img border"
                          src={blog.imgPreview}
                          alt="Job compensation"
                        />
                      </div>

                      <div class="col-sm-7">
                        <div class="card-body p-1 p-lg-3">
                          <h4 class="card-title">
                            <strong>
                              <a
                                class="text-dark"
                                href={`/post?blog=${blog.main}`}
                              >
                                {blog.main}{" "}
                                <span>{blog.question_mark ? "?" : ""}</span>
                              </a>
                            </strong>
                          </h4>

                          <p class="card-text">{blog.previewText}</p>
                          <a href={`/post?blog=${blog.main}`}>
                            {" "}
                            <button className="btn  mt-3 mb-3 btn-primary ">
                              Read More
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div id="stickyBlockEndPoint"></div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default BlogsMainPage;
