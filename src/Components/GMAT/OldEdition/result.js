import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../Config/axios";
import { gmat_dashboard_path } from "../../../Config/config";

const ResultFocusPage = () => {
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
      .then(async (response) => {
        clearStorage();
        updateStatus();

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

  const updateStatus = () => {
    const formData = new FormData();
    formData.append("category", storedCategory);
    formData.append("practice_exam", storedPracticeExam);
    console.log("enter");
    AxiosInstance.post("/api/gmat/user-activity/update-status", formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
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
                Your Integrated Reasoning score : {ir_score}
              </p>
              <p style={{ fontWeight: "500", fontSize: "50px" }}>{score}</p>

              <button
                className="btn border mt-5"
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

export default ResultFocusPage;
