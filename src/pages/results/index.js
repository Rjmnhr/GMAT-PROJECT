import React, { useEffect, useState } from "react";
import { Progress, Result } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const [score, setScore] = useState(0);
  const scorePercentage = ((score / 800) * 100).toFixed(2);
  const navigate = useNavigate();

  const quant_score = sessionStorage.getItem("quant_score");
  const verbal_score = sessionStorage.getItem("verbal_score");
  const exam_no = localStorage.getItem("exam_no");
  useEffect(() => {
    const formData = new FormData();
    formData.append("quant_score", quant_score);
    formData.append("verbal_score", verbal_score);
    axios
      .post(
        "https://gmatbackend-renjithcmrenju.b4a.run/api/gmat/final-mark",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        const resultData = await response.data;
        console.log(
          "🚀 ~ file: index.js:26 ~ .then ~ resultData:",
          resultData[0][verbal_score]
        );

        const score = resultData[0][verbal_score];
        setScore(score);

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
      <div>
        <Result
          status="success"
          title={`Your GMAT Score: ${score}`}
          subTitle={`Category: ${category}`}
        />
        <Progress type="circle" percent={parseFloat(scorePercentage)} />
      </div>
      <button className="btn border mt-5" onClick={() => navigate("/")}>
        Go to Dashboard
      </button>
    </>
  );
};

export default ResultPage;
