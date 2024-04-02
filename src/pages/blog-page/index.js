import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BlogContentArr } from "./blogs-content-array";
import NavBar from "../../Layout/nav-bar";
import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";

const BlogsPage = () => {
  const location = useLocation();
  const [selectedBlog, setSelectedBlog] = useState(null);
  useEffect(() => {
    // Get the blog name from the query parameter
    const blogName = location.search.replace("?blog=", "");

    if (blogName) {
      // Find the blog object in the array based on the blog name
      const decodedBlogName = decodeURIComponent(blogName);
      const blog = BlogContentArr.find((item) => item.main === decodedBlogName);

      if (blog) {
        setSelectedBlog(blog);
      }
    }
    //eslint-disable-next-line
  }, []);

  if (!selectedBlog) {
    // Handle case where the blog is not found
    return <div>Blog not found!</div>;
  }

  return (
    <>
      <Helmet>
        <title>Blogs | Adeft Education</title>

        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />

      <div
        style={{ marginTop: "100px" }}
        class="container content-space-1 text-left "
        id="article"
      >
        <div class="row mb-5">
          <div class="col-12 ">
            <h2 className="mb-3 text-center">
              {" "}
              <strong>{selectedBlog.main}</strong>
            </h2>
          </div>
        </div>
        <div className="d-lg-flex justify-content-between align-items-center flex-row-reverse">
          <div class="row mb-5 col-12 col-lg-6">
            <div class="col-md-10 col-lg-12 ">{selectedBlog.mainImg}</div>
          </div>

          <div class="row mb-5 col-12 text-left col-lg-6">
            <div class="col-12">
              <div>
                <h4 className="mb-3">{selectedBlog.subMain}</h4>

                {selectedBlog.subContent.map((item) => {
                  return (
                    <section className="p-0 mb-3">
                      <h4>{item.subHeading}</h4>
                      {item.content.map((content) => (
                        <p>{content}</p>
                      ))}
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-10 offset-lg-1 mb-3">
          <figure class="blockquote-lg text-center mb-5">
            <h5>{selectedBlog.footer}</h5>
          </figure>
        </div>

        <div class="col-12 d-flex justify-content-center mb-3">
          {selectedBlog.footerButton}
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

export default BlogsPage;
