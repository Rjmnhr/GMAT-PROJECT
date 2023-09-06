import React from "react";
import { Progress, Result } from "antd";

const ResultPage = () => {
  const score = sessionStorage.getItem("GMAT_Score");
  const scorePercentage = parseFloat(score).toFixed(2);

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
    <div>
      <Result
        status="success"
        title={`Your GMAT Score: ${scorePercentage}%`}
        subTitle={`Category: ${category}`}
      />
      <Progress type="circle" percent={parseFloat(score)} />
    </div>
  );
};

export default ResultPage;
