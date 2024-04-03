import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../Config/axios";
import { gmat_dashboard_path, login_path } from "../../../Config/config";
import examDisqualified from "../../../Icons/exam-disqualified.jpg";
import examQualified from "../../../Icons/exam-qualified.jpg";
const ResultPage = () => {
  const [score, setScore] = useState(0);
  // const scorePercentage = ((score / 800) * 100).toFixed(2);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const quant_score = sessionStorage.getItem("quant_score");
  const verbal_score = sessionStorage.getItem("verbal_score");
  const exam_no = localStorage.getItem("exam_no");
  const ir_score = sessionStorage.getItem("ir_score");
  const [notQualified, setNotQualified] = useState(false);
  const storedCategory = sessionStorage.getItem("category");
  const storedPracticeExam = sessionStorage.getItem("practice-exam");
  const accessToken = localStorage.getItem("accessToken");

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
      return;
    } else {
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
    }

    // eslint-disable-next-line
  }, []);

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

    formData.append("total_score", score);
    formData.append("category", storedCategory);
    formData.append("practice_exam", storedPracticeExam);
    AxiosInstance.post("/api/gmat/user-activity/update-score-card", formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;
        if (response.status !== 200) {
          navigate(`${login_path}?p=${gmat_dashboard_path}`);
        }
        clearStorage();
        updateStatus();

        // setDataLinkedIn(resultData);
      })
      .catch((err) => console.log("error", err));
  };

  const updateStatus = () => {
    const formData = new FormData();
    formData.append("category", storedCategory);
    formData.append("practice_exam", storedPracticeExam);

    AxiosInstance.post("/api/gmat/user-activity/update-status", formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      }.then(async (res) => {
        const response = await res.data;
        if (response.status !== 200) {
          navigate(`${login_path}?p=${gmat_dashboard_path}`);
        }
      }),
    }).catch((err) => console.log(err));
  };
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
              className="image-container p-3 text-r"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
                placeItems: "center",
              }}
            >
              <img src={examDisqualified} alt="" />
              <h3>
                Unfortunately, you did not qualify in the GMAT practice exam.
              </h3>
              <p style={{ color: "red" }}>
                Your score on the online practice exam was below the required
                threshold for qualification.
              </p>
              <p>
                We encourage you to continue your preparation and consider
                additional study resources to improve your GMAT skills.
              </p>

              <h4 style={{ fontSize: "20px" }} className="mt-3">
                Your Quantitative Reasoning score :{" "}
                <span className="text-primary"> {quant_score || 0}/90</span>
              </h4>
              <h4 style={{ fontSize: "20px" }} className="mt-3">
                Your Verbal Reasoning score :{" "}
                <span className="text-primary"> {verbal_score || 0}/90 </span>
              </h4>

              <h4 style={{ fontSize: "20px" }} className="mt-3">
                Your Data Insights score :{" "}
                <span className="text-primary"> {ir_score || 0}/90 </span>
              </h4>

              <p>
                If you have any questions or need further assistance, please
                don't hesitate to contact our support team at
                <span className="text-primary"> team@adefteducation.com </span>
              </p>
              <button
                className="btn btn-primary btn-lg border mt-5 w-25"
                onClick={() => navigate(gmat_dashboard_path)}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <div className="image-container mt-5">
                <img src={examQualified} alt="" />
              </div>
              <div className="card container col-lg-6 p-3">
                <div className=" d-lg-flex  container align-items-center justify-content-between">
                  <div className=" border-right px-5">
                    <h4>GMAT SCORE</h4>

                    <div
                      style={{ color: "black" }}
                      className="mt-3 text-primary"
                    >
                      <h1> {score}</h1>
                    </div>
                  </div>

                  <div className="text-left">
                    <h4 style={{ fontSize: "20px" }} className="mt-3">
                      Quantitative Reasoning score :{" "}
                      <span className="text-primary">
                        {" "}
                        {quant_score || 0}/90
                      </span>
                    </h4>
                    <h4 style={{ fontSize: "20px" }} className="mt-3">
                      Verbal Reasoning score :{" "}
                      <span className="text-primary">
                        {" "}
                        {verbal_score || 0}/90{" "}
                      </span>
                    </h4>

                    <h4 style={{ fontSize: "20px" }} className="mt-3">
                      Data Insights score :{" "}
                      <span className="text-primary"> {ir_score || 0}/90 </span>
                    </h4>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg border mt-5"
                onClick={() => navigate(gmat_dashboard_path)}
              >
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
