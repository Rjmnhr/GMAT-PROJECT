import React from "react";
import NavBar from "../../Layout/nav-bar";
import { useNavigate, useParams } from "react-router-dom";
import GMATSideBar from "../../Layout/gmat-side-bar";

const UserDataComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center ">
        <GMATSideBar />
        <div
          className="container col-10 p-5"
          style={{ background: "#f8f8f8", height: "100vh" }}
        >
          <div className="card w-100 pb-3" style={{ height: "50vh" }}>
            <div className="sub-content mt-3 ">
              <h4>Practice Exams</h4>

              <div
                onClick={() => {
                  sessionStorage.setItem("practice_exam_section", "1");
                  navigate(`/dashboard-detailed/${id}`);
                  localStorage.setItem("exam_no", "1");
                }}
                className="container col-12 d-flex justify-content-start align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container"
              >
                <p style={{ width: "200px", textAlign: "start" }}>
                  Practice Exam 1
                </p>
              </div>
              <div
                onClick={() => {
                  sessionStorage.setItem("practice_exam_section", "2");
                  navigate(`/dashboard-detailed/${id}`);
                  localStorage.setItem("exam_no", "2");
                }}
                className="container col-12 d-flex justify-content-start align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container "
              >
                <p style={{ width: "200px", textAlign: "start" }}>
                  Practice Exam 2
                </p>
              </div>
              <div
                onClick={() => {
                  sessionStorage.setItem("practice_exam_section", "3");
                  navigate(`/dashboard-detailed/${id}`);
                  localStorage.setItem("exam_no", "3");
                }}
                className="container col-12 d-flex justify-content-start align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container "
              >
                <p style={{ width: "200px", textAlign: "start" }}>
                  Practice Exam 3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDataComponent;
