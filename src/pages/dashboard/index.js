import React, { useEffect } from "react";
import NavBar from "../../components/nav-bar";
import "./style.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/side-bar";

const DashBoardComponent = () => {
  const navigate = useNavigate();
  const practice_score_1 = localStorage.getItem("practice_score_1");
  const practice_score_2 = localStorage.getItem("practice_score_2");
  const practice_score_3 = localStorage.getItem("practice_score_3");
  const practice_status_1 = localStorage.getItem("practice_status_1");
  const practice_status_2 = localStorage.getItem("practice_status_2");
  const practice_status_3 = localStorage.getItem("practice_status_3");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/login-app");
    }
  });

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center">
        <SideBar />
        <div
          className="container col-10 p-5"
          style={{ background: "#f8f8f8", height: "100vh" }}
        >
          <div className="card w-100 pb-3" style={{ height: "50vh" }}>
            <div className="sub-content mt-3 ">
              <h4>Practice Exams</h4>

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
                <p style={{ fontWeight: "bold", width: "200px" }}>
                  Scaled Score
                </p>
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
                  31 Questions
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>61 minutes</p>
                <p style={{ width: "200px" }}>
                  {practice_score_1 ? practice_score_1 : "--"}
                </p>
                <p style={{ width: "200px" }}>
                  {" "}
                  {practice_status_1 ? practice_status_1 : "--"}
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
                  31 Questions
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>61 minutes</p>
                <p style={{ width: "200px" }}>
                  {practice_score_2 ? practice_score_2 : "--"}
                </p>
                <p style={{ width: "200px" }}>
                  {" "}
                  {practice_status_2 ? practice_status_2 : "--"}
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
                  31 Questions
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>61 minutes</p>
                <p style={{ width: "200px" }}>
                  {practice_score_3 ? practice_score_3 : "--"}
                </p>
                <p style={{ width: "200px" }}>
                  {" "}
                  {practice_status_3 ? practice_status_3 : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardComponent;
