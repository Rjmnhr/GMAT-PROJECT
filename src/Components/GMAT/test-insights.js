import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestInsights = ({
  activeIndex,
  examData,
  userActivities,
  componentTrigger,
}) => {
  const navigate = useNavigate();
  const storedPracticeExamNo = sessionStorage.getItem("practice-exam") || "1";
  const [buttonObj, setButtonObj] = useState({});
  const getStatus = (practiceExam) => {
    const filteredActivity = userActivities?.find(
      (activity) =>
        activity.practice_exam === practiceExam &&
        ((activeIndex === 0 && activity.category === "old") ||
          (activeIndex === 1 && activity.category === "focus"))
    );

    if (filteredActivity) {
      return filteredActivity.status;
    } else {
      return "Not Started";
    }
  };

  useEffect(() => {
    const status = getStatus(parseInt(storedPracticeExamNo));

    switch (status) {
      case "Completed":
        setButtonObj({ text: "Completed", disabled: true });
        break;
      case "Incomplete":
        setButtonObj({ text: "Resume", disabled: false });
        break;
      default:
        setButtonObj({ text: "Start Exam", disabled: false });
    }
    //eslint-disable-next-line
  }, [storedPracticeExamNo, componentTrigger]);

  return (
    <div>
      <div className="card shadow w-100 pb-3" style={{ minHeight: "50vh" }}>
        <div className="sub-content mt-3 border-bottom">
          <div className="col-12 d-flex align-items-center  justify-content-between px-3">
            <div className="d-flex align-items-center">
              <h4 className="pl-3">Practice Exam {storedPracticeExamNo} </h4>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(examData?.instruction_path);
                sessionStorage.setItem("category", "focus");
              }}
              disabled={buttonObj.disabled}
            >
              {buttonObj?.text}
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
              <p className="fs-2" style={{ color: "gray" }}>
                {" "}
                Score
              </p>
            </div>
            <div className="container col-9 d-flex flex-wrap justify-content-between gap-2 align-content-center">
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
                  out of {examData?.totalQuestions}
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
                <p style={{ fontSize: "14px" }}>{}</p>
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
                <p style={{ fontSize: "14px" }}>{}</p>
                <p style={{ fontSize: "14px" }}>Attempt Date</p>
              </div>
            </div>
          </div>
          {/* <div>
              <h5 className="p-2 border-bottom">
                Total Time Taken : 03:07:00{" "}
              </h5>
            </div> */}
          <table className="table ">
            <thead className="bg-primary" style={{ color: "white" }}>
              <tr>
                <th className="text-left">Section Name</th>
                <th>Scaled score</th>
                <th>Questions Correct</th>
                <th>Questions Incorrect</th>
                <th>Time Spent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">{examData?.section_1?.name}</td>
                <td> -- / {examData?.section_1?.max_marks}</td>
                <td>0</td>
                <td>0</td>
                <td>--</td>
              </tr>
              <tr>
                <td className="text-left">{examData?.section_2?.name}</td>
                <td> -- / {examData?.section_2?.max_marks}</td>
                <td>0</td>
                <td>0</td>
                <td>--</td>
              </tr>
              <tr>
                <td className="text-left">{examData?.section_3?.name}</td>
                <td> -- / {examData?.section_3?.max_marks}</td>
                <td>0</td>
                <td>0</td>
                <td>--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestInsights;
