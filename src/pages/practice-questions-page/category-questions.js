import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Layout/nav-bar";
import AxiosInstance from "../../Config/axios";
import { questions } from "../../Components/GMAT/questions";

const CategoryQuestions = () => {
  const location = useLocation();
  const categoryName = new URLSearchParams(location.search).get("q");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [showAnswers, setShowAnswers] = useState([]);
  const [categoryHeading, setCategoryHeading] = useState("");
  const navigate = useNavigate();
  const locationURL = window.location.href;
  const userID = localStorage.getItem("adefteducation_user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: locationURL, id: userID },
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
        { path: locationURL, id: userID, timeSpent: timeSpentInSeconds },
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

  useEffect(() => {
    // Map categoryName to the appropriate Category value
    let categoryValue;
    if (categoryName === "quantitative-reasoning-questions") {
      categoryValue = "Quant";
    } else if (categoryName === "verbal-reasoning-questions") {
      categoryValue = "Verbal";
    } else if (categoryName === "integrated-reasoning-questions") {
      categoryValue = "Integrated reasoning";
    }

    let categoryHeadingValue;
    if (categoryName === "quantitative-reasoning-questions") {
      categoryHeadingValue = "GMAT Quant Reasoning";
    } else if (categoryName === "verbal-reasoning-questions") {
      categoryHeadingValue = "GMAT Verbal Reasoning";
    } else if (categoryName === "integrated-reasoning-questions") {
      categoryHeadingValue = "GMAT Integrated reasoning";
    }

    setCategoryHeading(categoryHeadingValue);
    // Filter questions based on the selected category
    const filtered = questions.filter(
      (question) => question.Category === categoryValue
    );

    // Extract unique csubcategories from the filtered questions
    const uniqueSubCategories = [
      ...new Set(filtered.map((question) => question.SubCategory)),
    ];

    // Set default subcategory to the first one in the list
    const defaultSubCategory = uniqueSubCategories[0];

    setFilteredQuestions(filtered);
    setSubCategories(uniqueSubCategories);
    setCurrentSubCategory(defaultSubCategory);
  }, [categoryName]);

  const handleSubCategoryChange = (subCategory) => {
    setCurrentSubCategory(subCategory);
  };

  const handleShowAnswer = (index) => {
    // Toggle the showAnswers state for the clicked question
    setShowAnswers((prevShowAnswers) => {
      const newShowAnswers = [...prevShowAnswers];
      newShowAnswers[index] = !newShowAnswers[index];
      return newShowAnswers;
    });
  };

  return (
    <>
      <NavBar />
      <>
        <div
          style={{ marginTop: "87px" }}
          className="d-flex p-0 text-left container-fluid"
        >
          {/* Sidebar with SubCategory tabs */}

          <div
            className="col-2 p-0 side-bar "
            style={{ background: "#f5f5f4" }}
          >
            <h3 style={{ fontWeight: "bold" }} className="py-3 px-2">
              ADEFT GMAT
            </h3>
            <div
              className="scrollable-container"
              style={{ height: "80vh,", overflowY: "scroll" }}
            >
              {subCategories.map((subCategory) => (
                <p
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #c9c8c7",
                  }}
                  key={subCategory}
                  onClick={() => handleSubCategoryChange(subCategory)}
                  className={`p-2 w-100 m-0 cursor-pointer tab ${
                    currentSubCategory === subCategory ? "active" : ""
                  }`}
                >
                  {subCategory}
                </p>
              ))}
            </div>
          </div>

          {/* List of questions based on the selected subcategory */}
          <div className="col-10 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="py-3">{categoryHeading}</h3>
              <button
                onClick={() => navigate("/gmat")}
                className="btn btn-primary mr-2"
              >
                Take a practice test
              </button>
            </div>

            <div
              style={{ height: "70vh", overflowY: "scroll" }}
              className="scrollable-container"
            >
              {filteredQuestions
                .filter(
                  (question) => question.SubCategory === currentSubCategory
                )
                .map((question, index) => (
                  <div className="p-2 border mb-2" key={question.id}>
                    <p className="mb-3">
                      {" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {index + 1}
                        {")"}
                      </span>{" "}
                      {question.main_question_stem}
                    </p>
                    {question.img_url ? (
                      <img
                        className="mb-3"
                        src={question.img_url}
                        alt="not available"
                      />
                    ) : (
                      ""
                    )}
                    <ul>
                      {question.answer_1 ? (
                        <li>{`A. ${question.answer_1}`}</li>
                      ) : (
                        ""
                      )}

                      {question.answer_2 ? (
                        <li>{`B. ${question.answer_2}`}</li>
                      ) : (
                        ""
                      )}

                      {question.answer_3 ? (
                        <li>{`C. ${question.answer_3}`}</li>
                      ) : (
                        ""
                      )}

                      {question.answer_4 ? (
                        <li>{`D. ${question.answer_4}`}</li>
                      ) : (
                        ""
                      )}

                      {question.answer_5 ? (
                        <li>{`E. ${question.answer_5}`}</li>
                      ) : (
                        ""
                      )}
                    </ul>
                    <p
                      className="text-primary"
                      onClick={() => handleShowAnswer(index)}
                    >
                      {showAnswers[index] ? "Hide Answer" : "See Answer"}
                    </p>
                    {showAnswers[index] && (
                      <p>{`Correct Answer: ${question.correct_answer}`}</p>
                    )}
                    {/* Add rendering logic for answer options and other details */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CategoryQuestions;
