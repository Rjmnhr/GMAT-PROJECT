import React from "react";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
import SideBar from "../side-bar";
const DashboardDetailed = () => {
  const navigate = useNavigate();

  const practice_exam_number = sessionStorage.getItem("practice_exam_section");

  let userData = null;
  if (practice_exam_number === "1") {
    userData = JSON.parse(sessionStorage.getItem("practice_1_data"));
  } else if (practice_exam_number === "2") {
    userData = JSON.parse(sessionStorage.getItem("practice_2_data"));
  } else if (practice_exam_number === "2") {
    userData = JSON.parse(sessionStorage.getItem("practice_3_data"));
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  }

  const seconds = userData
    ? userData.length > 0
      ? userData[0].time_spent
      : 0
    : 0;

  const formattedTime = formatTime(seconds);

  const dateString = userData
    ? userData.length > 0
      ? userData[0].attempt_date
      : ""
    : "";

  const dateOnly = dateString.split("T")[0];

  const isAttempted = userData ? (userData.length > 0 ? true : false) : false;
  return (
    <>
      <NavBar />
      <div
        style={{ marginTop: "80px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <SideBar />
        <div
          className="container col-10 p-5"
          style={{ background: "#f8f8f8", height: "100vh" }}
        >
          <div className="card w-100 pb-3" style={{ minHeight: "50vh" }}>
            <div className="sub-content mt-3 border-bottom">
              <div className="col-12 d-flex align-items-center  justify-content-between px-3">
                <div className="d-flex align-items-center">
                  <h4 className="pl-3">Practice Exam {practice_exam_number}</h4>
                </div>
                {isAttempted ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/instructions")}
                    disabled
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/instructions")}
                  >
                    Start Exam
                  </button>
                )}
              </div>

              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom p-3 gap-3  ">
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    background: "#f8f8f8",
                    display: "grid",
                    justifyItems: "center",
                    alignContent: "center",
                  }}
                  className="container col-3"
                >
                  <h1>{isAttempted ? userData[0].total_score : "--"}</h1>
                  <p className="fs-2" style={{ color: "gray" }}>
                    {" "}
                    Score
                  </p>
                </div>
                <div className="container col-9 d-flex flex-wrap justify-content-between gap-2 align-content-center">
                  <div
                    style={{
                      width: "170px",
                      height: "80px",
                      display: "grid",
                      alignContent: "center",
                      textAlign: "start",
                    }}
                    className="card p-3"
                  >
                    <p style={{ fontSize: "14px" }}>N/A</p>
                    <p style={{ fontSize: "14px" }}>Percentile Rank</p>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "80px",
                      display: "grid",
                      alignContent: "center",
                      textAlign: "start",
                    }}
                    className="card p-3"
                  >
                    <p style={{ fontSize: "14px" }}>
                      {isAttempted ? userData[0].questions_correct : "--"} out
                      of 79
                    </p>
                    <p style={{ fontSize: "14px" }}>Questions Correct</p>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "80px",
                      display: "grid",
                      alignContent: "center",
                      textAlign: "start",
                    }}
                    className="card p-3"
                  >
                    <p style={{ fontSize: "14px" }}>{formattedTime}</p>
                    <p style={{ fontSize: "14px" }}>Time Spent</p>
                  </div>

                  <div
                    style={{
                      width: "180px",
                      height: "80px",
                      display: "grid",
                      alignContent: "center",
                      textAlign: "start",
                    }}
                    className="card p-3"
                  >
                    <p style={{ fontSize: "14px" }}>{dateOnly}</p>
                    <p style={{ fontSize: "14px" }}>Attempt Date</p>
                  </div>
                </div>
              </div>
              {/* <div>
                <h5 className="p-2 border-bottom">
                  Total Time Taken : 03:07:00{" "}
                </h5>
              </div> */}

              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom p-3 gap-3  ">
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Section Name
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Scaled score
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Questions Correct
                </p>
                <p style={{ fontWeight: "bold", width: "200px" }}>
                  Questions Incorrect
                </p>
                <p style={{ fontWeight: "bold", width: "200px" }}>Time Spent</p>
              </div>
              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container">
                <p style={{ width: "200px", textAlign: "start" }}>
                  Quantitative Reasoning
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  {isAttempted
                    ? userData[0].quantitative_reasoning_scaled_score
                    : "--"}{" "}
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  {isAttempted
                    ? userData[0].quantitative_reasoning_questions_correct
                    : "--"}{" "}
                </p>
                <p style={{ width: "200px" }}>
                  {isAttempted
                    ? userData[0].quantitative_reasoning_questions_incorrect
                    : "--"}
                </p>
                <p style={{ width: "200px" }}>
                  {" "}
                  {isAttempted
                    ? userData[0].quantitative_reasoning_time_spent
                    : "--"}
                </p>
              </div>
              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container ">
                <p style={{ width: "200px", textAlign: "start" }}>
                  Verbal Reasoning
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  {isAttempted
                    ? userData[0].verbal_reasoning_scaled_score
                    : "--"}{" "}
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  {isAttempted
                    ? userData[0].verbal_reasoning_questions_correct
                    : "--"}{" "}
                </p>
                <p style={{ width: "200px" }}>
                  {isAttempted
                    ? userData[0].verbal_reasoning_questions_incorrect
                    : "--"}
                </p>
                <p style={{ width: "200px" }}>
                  {" "}
                  {isAttempted ? userData[0].verbal_reasoning_time_spent : "--"}
                </p>
              </div>
              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container ">
                <p style={{ width: "200px", textAlign: "start" }}>
                  Integrated Reasoning
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  {isAttempted
                    ? userData[0].integrated_reasoning_scaled_score
                    : "--"}
                  /8
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>
                  {isAttempted
                    ? userData[0].integrated_reasoning_questions_correct
                    : "--"}{" "}
                </p>
                <p style={{ width: "200px" }}>
                  {isAttempted
                    ? userData[0].integrated_reasoning_questions_incorrect
                    : "--"}
                </p>
                <p style={{ width: "200px" }}>
                  {" "}
                  {isAttempted
                    ? userData[0].integrated_reasoning_time_spent
                    : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDetailed;
