import React, { useEffect, useState } from "react";
// import { Progress, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../components/axios";

const ResultPage = () => {
  const [score, setScore] = useState(0);
  // const scorePercentage = ((score / 800) * 100).toFixed(2);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const quant_score = sessionStorage.getItem("quant_score");
  const verbal_score = sessionStorage.getItem("verbal_score");
  const exam_no = localStorage.getItem("exam_no");
  const ir_score = sessionStorage.getItem("ir_score");
  const user_id = localStorage.getItem("adefteducation_user_id");
  const user_name = localStorage.getItem("adefteducation_user_name");
  const email = localStorage.getItem("email");
  const [notQualified, setNotQualified] = useState(false);

  useEffect(() => {
    if (
      quant_score < 27 ||
      verbal_score < 27 ||
      isNaN(verbal_score) ||
      isNaN(quant_score)
    )
      return;

    const formData = new FormData();
    formData.append("quant_score", quant_score);
    formData.append("verbal_score", verbal_score);
    AxiosInstance.post("/api/gmat/final-mark", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const resultData = await response.data;

        const score = resultData[0][verbal_score];
        storeData(score);
        setScore(score);
        setIsLoading(false);

        localStorage.setItem("GMAT_Score", score);

        // Set practice score based on exam_no (you can add this logic as needed)
        if (exam_no === "1") {
          localStorage.setItem("practice_score_1", score);
        } else if (exam_no === "2") {
          localStorage.setItem("practice_score_2", score);
        } else {
          localStorage.setItem("practice_score_1", score);
        }

        // setDataLinkedIn(resultData);
      })
      .catch((err) => console.log("error", err));

    // eslint-disable-next-line
  }, []);

  // const getCategory = (score) => {
  //   if (score >= 90) {
  //     return "Excellent";
  //   } else if (score >= 70) {
  //     return "Good";
  //   } else if (score >= 50) {
  //     return "Average";
  //   } else {
  //     return "Poor";
  //   }
  // };

  // const category = getCategory(score);

  const quant_wrong_questions = sessionStorage.getItem("quant_wrong_questions");

  const quant_correct_questions = sessionStorage.getItem(
    "quant_correct_questions"
  );
  const verbal_correct_questions = sessionStorage.getItem(
    "verbal_correct_questions"
  );

  const verbal_time_spend = sessionStorage.getItem("verbal_time_spend");
  const ir_correct_questions = sessionStorage.getItem("ir_correct_questions");
  const verbal_wrong_questions = sessionStorage.getItem(
    "verbal_wrong_questions"
  );
  const ir_time_spend = sessionStorage.getItem("ir_time_spend");
  const practice_exam_section = sessionStorage.getItem("practice_exam_section");
  const ir_wrong_questions = sessionStorage.getItem("ir_wrong_questions");
  const quant_time_spend = sessionStorage.getItem("quant_time_spend");

  console.log(
    "🚀 ~ file: index.js:101 ~ storeData ~ quant_score:",
    typeof quant_score
  );

  const clearStorage = () => {
    sessionStorage.removeItem("quant_wrong_questions");

    sessionStorage.removeItem("quant_correct_questions");
    sessionStorage.removeItem("verbal_correct_questions");

    sessionStorage.removeItem("verbal_time_spend");
    sessionStorage.removeItem("ir_correct_questions");
    sessionStorage.removeItem("verbal_wrong_questions");
    sessionStorage.removeItem("ir_time_spend");
    sessionStorage.removeItem("ir_wrong_questions");
    sessionStorage.removeItem("quant_time_spend");
    sessionStorage.removeItem("ir_score");
    sessionStorage.removeItem("quant_score");
    sessionStorage.removeItem("verbal_score");
    sessionStorage.removeItem("GMAT_Score");
    sessionStorage.removeItem("time_remaining");
  };

  const storeData = (score) => {
    const formData = new FormData();

    const total_time_spent =
      parseInt(quant_time_spend) +
      parseInt(verbal_time_spend) +
      parseInt(ir_time_spend);

    const totalQuestionsCorrect =
      parseInt(quant_correct_questions) +
      parseInt(verbal_correct_questions) +
      parseInt(ir_correct_questions);

    formData.append("email", email);

    formData.append("user_name", user_name);
    formData.append("user_id", user_id);
    formData.append("total_score", score);
    formData.append("percentile_rank", "");
    formData.append("time_spent", total_time_spent);

    formData.append("questions_correct", totalQuestionsCorrect);

    formData.append("quantitative_reasoning_scaled_score", quant_score);

    formData.append(
      "quantitative_reasoning_questions_correct",
      quant_correct_questions
    );
    formData.append(
      "quantitative_reasoning_questions_incorrect",
      quant_wrong_questions
    );

    formData.append("quantitative_reasoning_time_spent", quant_time_spend);

    formData.append("verbal_reasoning_scaled_score", verbal_score);
    formData.append(
      "verbal_reasoning_questions_correct",
      verbal_correct_questions
    );
    formData.append(
      "verbal_reasoning_questions_incorrect",
      verbal_wrong_questions
    );
    formData.append("verbal_reasoning_time_spent", verbal_time_spend);

    formData.append("integrated_reasoning_scaled_score", ir_score);
    formData.append(
      "integrated_reasoning_questions_correct",
      ir_correct_questions
    );
    formData.append(
      "integrated_reasoning_questions_incorrect",
      ir_wrong_questions
    );
    formData.append("integrated_reasoning_time_spent", ir_time_spend);

    formData.append("practice_exam", practice_exam_section);

    AxiosInstance.post("/api/exams/store-data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const resultData = await response.data;
        console.log(
          "🚀 ~ file: index.js:150 ~ .then ~ resultData:",
          resultData
        );
        clearStorage();

        // setDataLinkedIn(resultData);
      })
      .catch((err) => console.log("error", err));
  };
  useEffect(() => {
    if (
      quant_score < 27 ||
      verbal_score < 27 ||
      isNaN(verbal_score) ||
      isNaN(quant_score)
    ) {
      setIsLoading(false);
      setNotQualified(true);
      storeData(0);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "grid",
              placeItems: "center",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            <LoadingOutlined />
            <h4>Your results are Loading ...</h4>
          </div>
        </>
      ) : (
        <>
          {notQualified ? (
            <div
              className=" p-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
                placeItems: "center",
              }}
            >
              <h1>GMAT Practice Exam Results</h1>
              <p>
                Unfortunately, you did not qualify for the GMAT practice exam.
              </p>
              <p>
                Your score on the online practice exam was below the required
                threshold for qualification.
              </p>
              <p>
                We encourage you to continue your preparation and consider
                additional study resources to improve your GMAT skills.
              </p>
              <p>
                Don't be discouraged; many candidates improve their scores with
                dedicated preparation. You can retake the practice exam once you
                feel more prepared.
              </p>
              <p>
                If you have any questions or need further assistance, please
                don't hesitate to contact our support team.
              </p>
              <button
                className="btn border mt-5 w-50 w-lg-25"
                onClick={() => navigate("/")}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <div className="mt-5">
                <img
                  width={100}
                  height={100}
                  src={
                    "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702475024/wlrf1eswdneqfamjkay3.png"
                  }
                  alt=""
                />
              </div>
              <p style={{ fontSize: "20px" }} className="mt-3">
                Your GMAT Score: {score}/800
              </p>
              <p style={{ fontSize: "20px" }} className="mt-3">
                Your Data Insights score : {ir_score}
              </p>
              <p style={{ fontWeight: "500", fontSize: "50px" }}>{score}</p>

              <button className="btn border mt-5" onClick={() => navigate("/")}>
                Go to Dashboard
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ResultPage;