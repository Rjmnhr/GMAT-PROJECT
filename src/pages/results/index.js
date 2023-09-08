import React from "react";
import { Progress, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const score = sessionStorage.getItem("GMAT_Score");
  const scorePercentage = parseFloat(score).toFixed(2);
  const navigate = useNavigate();

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
          title={`Your GMAT Score: ${scorePercentage}`}
          subTitle={`Category: ${category}`}
        />
        <Progress type="circle" percent={parseFloat(score)} />
      </div>
      <button className="btn border mt-5" onClick={() => navigate("/")}>
        Go to Dashboard
      </button>
    </>
  );
};

export default ResultPage;
