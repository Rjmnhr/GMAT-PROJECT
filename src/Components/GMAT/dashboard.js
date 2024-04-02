import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../../Config/axios";
import { login_path } from "../../Config/config";
import {
  practiceExamData,
  practiceExamDataFocus,
  practiceExams,
} from "../../Config/constants";
import { Skeleton } from "antd";

const GMATDashboard = ({ activeIndex }) => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState({});
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const path = useLocation().pathname;
  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    AxiosInstance.get("/api/gmat/user-activity/get-activity", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;
        if (response.status === 200) {
          setUserActivities(response.data);
          setIsLoading(false);
        } else {
          navigate(`${login_path}?p=${path}`);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, path]);
  useEffect(() => {
    switch (activeIndex) {
      case 0:
        setExamData(practiceExamData);
        sessionStorage.setItem("category", "old");
        break;
      case 1:
        setExamData(practiceExamDataFocus);
        sessionStorage.setItem("category", "focus");
        break;
      default:
        break;
    }
  }, [activeIndex]);

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
                        navigate(examData?.instruction_path);
                        sessionStorage.setItem("practice-exam", item);
                      }}
                      className="row-hover"
                    >
                      <td>Practice Exam {item}</td>
                      <td>{examData?.totalQuestions}</td>
                      <td>{examData?.totalTime}</td>
                      <td>
                        {isLoading ? (
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
