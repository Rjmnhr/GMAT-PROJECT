import React from "react";
import { useNavigate } from "react-router-dom";

import { practiceExams } from "../../Config/constants";
import { Skeleton } from "antd";
import { gmat_dashboard_path } from "../../Config/config";

const GMATDashboard = ({
  activeIndex,
  examData,
  userActivities,
  loading,
  setComponentTrigger,
  componentTrigger,
}) => {
  const navigate = useNavigate();

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

  return (
    <>
      <div className="d-flex justify-content-center align-items-start">
        <div className="container p-0" style={{ height: "100vh" }}>
          <div className="card shadow w-100 pb-3" style={{ height: "50vh" }}>
            <div className="sub-content mt-3">
              <h4 className="mb-5">{examData?.title?.toUpperCase()}</h4>
              <table className="table">
                <thead className="bg-primary" style={{ color: "white" }}>
                  <tr>
                    <th>Practice Exam Name</th>
                    <th>Practice Exam Length</th>
                    <th>Practice Exam Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {practiceExams.map((item) => (
                    <tr
                      key={item}
                      onClick={() => {
                        navigate(`${gmat_dashboard_path}?p=insights`);
                        sessionStorage.setItem("practice-exam", item);
                        setComponentTrigger(!componentTrigger);
                      }}
                      className="row-hover"
                    >
                      <td>Practice Exam {item}</td>
                      <td>{examData?.totalQuestions}</td>
                      <td>{examData?.totalTime}</td>
                      <td>
                        {loading ? (
                          <Skeleton.Button
                            active={true}
                            size={"small"}
                            shape={"round"}
                            block={true}
                            style={{ width: "100px" }}
                          />
                        ) : (
                          getStatus(item)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GMATDashboard;
