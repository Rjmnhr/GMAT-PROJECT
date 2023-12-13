import React, { useEffect, useState } from "react";
import NavBar from "../nav-bar";
import "../../pages/dashboard/style.css";
import { useNavigate } from "react-router-dom";

import AxiosInstance from "../axios";

const GMATOld = () => {
  const navigate = useNavigate();
  const [practiceExam1, setPracticeExam1] = useState(null);
  const [practiceExam2, setPracticeExam2] = useState(null);
  const [practiceExam3, setPracticeExam3] = useState(null);

  const user_id = localStorage.getItem("adefteducation_user_id");

  const fetchData = async (examNo) => {
    try {
      const response = await AxiosInstance.post("/api/exams/get-data", {
        id: user_id,
        practice_exam: examNo,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to handle it outside this function if needed
    }
  };

  // In your component:

  useEffect(() => {
    const fetchPracticeData = async () => {
      try {
        const result1 = await fetchData("1");
        setPracticeExam1(result1);
        sessionStorage.setItem("practice_1_data", JSON.stringify(result1));

        const result2 = await fetchData("2");
        setPracticeExam2(result2);
        sessionStorage.setItem("practice_2_data", JSON.stringify(result2));
        const result3 = await fetchData("3");
        console.log(
          "🚀 ~ file: index.js:43 ~ fetchPracticeData ~ result3:",
          result3
        );
        setPracticeExam3(result3);
        sessionStorage.setItem("practice_3_data", JSON.stringify(result3));
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching practice data:", error);
      }
    };

    fetchPracticeData();

    //eslint-disable-next-line
  }, []);

  const isPrcaticeOneDone = practiceExam1
    ? practiceExam1.length > 0
      ? true
      : false
    : false;
  const isPrcaticeTwoDone = practiceExam2
    ? practiceExam2.length > 0
      ? true
      : false
    : false;
  const isPrcaticeThreeDone = practiceExam3
    ? practiceExam3.length > 0
      ? true
      : false
    : false;

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-start">
        <div className="container p-0" style={{ height: "100vh" }}>
          <div className="card w-100 pb-3" style={{ height: "50vh" }}>
            <div className="sub-content mt-3 ">
              <h4>GMAT Practice Exams</h4>

              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom p-3 gap-3 ">
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Practice Exam Name
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Practice Exam Length
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Practice Exam Time
                </p>
                {/* <p style={{ fontWeight: "bold", width: "200px" }}>
                  Scaled Score
                </p> */}
                <p style={{ fontWeight: "bold", width: "200px" }}>Status</p>
              </div>
              <div
                onClick={() => {
                  sessionStorage.setItem("practice_exam_section", "1");
                  navigate("/dashboard-detailed");
                  localStorage.setItem("exam_no", "1");
                }}
                className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container"
              >
                <p style={{ width: "200px", textAlign: "start" }}>
                  Practice Exam 1
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  79 Questions
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  157 minutes
                </p>
                {/* <p style={{ width: "200px" }}>
                  {practice_score_1 ? practice_score_1 : "--"}
                </p> */}
                <p style={{ width: "200px" }}>
                  {" "}
                  {isPrcaticeOneDone ? "Completed" : "--"}
                </p>
              </div>
              <div
                onClick={() => {
                  sessionStorage.setItem("practice_exam_section", "2");
                  navigate("/dashboard-detailed");
                  localStorage.setItem("exam_no", "2");
                }}
                className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container "
              >
                <p style={{ width: "200px", textAlign: "start" }}>
                  Practice Exam 2
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  79 Questions
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  157 minutes
                </p>
                {/* <p style={{ width: "200px" }}>
                  {practice_score_2 ? practice_score_2 : "--"}
                </p> */}
                <p style={{ width: "200px" }}>
                  {" "}
                  {isPrcaticeTwoDone ? "Completed" : "--"}
                </p>
              </div>
              <div
                onClick={() => {
                  sessionStorage.setItem("practice_exam_section", "3");
                  navigate("/dashboard-detailed");
                  localStorage.setItem("exam_no", "3");
                }}
                className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container "
              >
                <p style={{ width: "200px", textAlign: "start" }}>
                  Practice Exam 3
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  79 Questions
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  157 minutes
                </p>
                {/* <p style={{ width: "200px" }}>
                  {practice_score_3 ? practice_score_3 : "--"}
                </p> */}
                <p style={{ width: "200px" }}>
                  {" "}
                  {isPrcaticeThreeDone ? "Completed" : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GMATOld;
