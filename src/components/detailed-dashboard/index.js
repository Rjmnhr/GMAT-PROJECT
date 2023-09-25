import React from "react";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
const DashboardDetailed = () => {
  const navigate = useNavigate();

  const practice_exam_number = sessionStorage.getItem("practice_exam_section");
  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="side-bar col-2"
          style={{ background: "#111d2c", height: "100vh" }}
        >
          <div className="pt-3 border-bottom">
            <button style={{ color: "white" }} className="btn ">
              Dashboard
            </button>
          </div>
        </div>
        <div
          className="container col-10 p-5"
          style={{ background: "#f8f8f8", height: "100vh" }}
        >
          <div className="card w-100 pb-3" style={{ minHeight: "50vh" }}>
            {/* <img
              style={{ width: "100%", height: "50%" }}
              src={
                "https://www.gmaxworld.com/blog/wp-content/uploads/2021/02/GMAT-Free-Resources.jpg"
              }
              alt=""
            /> */}
            <div className="sub-content mt-3 border-bottom">
              <div className="col-12 d-flex align-items-center  justify-content-between px-3">
                <h4 className="pl-3">Practice Exam {practice_exam_number}</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/instructions")}
                >
                  Start Exam
                </button>
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
                  <h1>43</h1>
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
                    <p style={{ fontSize: "14px" }}>10 out of 79</p>
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
                    <p style={{ fontSize: "14px" }}>20 minutes 46 seconds</p>
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
                    <p style={{ fontSize: "14px" }}>09/9/2023</p>
                    <p style={{ fontSize: "14px" }}>Attempt Date</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="p-2 border-bottom">
                  Total Time Taken : 03:07:00{" "}
                </h5>
              </div>

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
                <p style={{ width: "200px", textAlign: "start" }}>--</p>
                <p style={{ width: "200px", textAlign: "start" }}>--</p>
                <p style={{ width: "200px" }}>{"--"}</p>
                <p style={{ width: "200px" }}> {"--"}</p>
              </div>
              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container ">
                <p style={{ width: "200px", textAlign: "start" }}>
                  Verbal Reasoning
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>--</p>
                <p style={{ width: "200px", textAlign: "start" }}>--</p>
                <p style={{ width: "200px" }}>{"--"}</p>
                <p style={{ width: "200px" }}> {"--"}</p>
              </div>
              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container ">
                <p style={{ width: "200px", textAlign: "start" }}>
                  Integrated Reasoning
                </p>
                <p style={{ width: "200px", textAlign: "start" }}>--</p>
                <p style={{ width: "200px", textAlign: "start" }}>--</p>
                <p style={{ width: "200px" }}>{"--"}</p>
                <p style={{ width: "200px" }}> {"--"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDetailed;
