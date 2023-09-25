import React, { useEffect, useState } from "react";
import { Progress, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../components/axios";

const ResultPage = () => {
  const [score, setScore] = useState(0);
  const scorePercentage = ((score / 800) * 100).toFixed(2);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const quant_score = sessionStorage.getItem("quant_score");
  const verbal_score = sessionStorage.getItem("verbal_score");
  const exam_no = localStorage.getItem("exam_no");
  const ir_score = sessionStorage.getItem("ir_score");
  useEffect(() => {
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

  const getCategory = (score) => {
    if (score >= 90) {
      return "Excellent";
    } else if (score >= 70) {
      return "Good";
    } else if (score >= 50) {
      return "Average";
    } else {
      return "Poor";
    }
  };

  const category = getCategory(score);

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
            }}
          >
            <LoadingOutlined />
            <h4>Your results are Loading ...</h4>
          </div>
        </>
      ) : (
        <>
          <div>
            <Result
              status="success"
              title={`Your GMAT Score: ${score}`}
              subTitle={`Category: ${category}`}
            />
            <Progress type="circle" percent={parseFloat(scorePercentage)} />
          </div>

          <p>Your Integrated Reasoning score : {ir_score}</p>
          <button className="btn border mt-5" onClick={() => navigate("/")}>
            Go to Dashboard
          </button>
        </>
      )}
    </>
  );
};

export default ResultPage;
