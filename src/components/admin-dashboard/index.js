import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios";
import SideBar from "../side-bar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const handleNavigate = (id) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    AxiosInstance.get("/api/user/get-all")
      .then(async (response) => {
        const resultData = await response.data;
        console.log(
          "🚀 ~ file: index.js:150 ~ .then ~ resultData:",
          resultData
        );
        setUserData(resultData);
        // setDataLinkedIn(resultData);
      })
      .catch((err) => console.log("error", err));
    //eslint-disable-next-line
  }, []);

  // function formatTime(seconds) {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes} minutes ${remainingSeconds} seconds`;
  // }

  // const seconds = userData ? userData[0].time_spent : 0;

  // const formattedTime = formatTime(seconds);

  // const dateString = userData ? userData[0].attempt_date : "";

  // const dateOnly = dateString.split("T")[0];

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center">
        <SideBar />
        <div
          className="container col-10 p-5"
          style={{ background: "#f8f8f8", height: "100vh" }}
        >
          <div className="card w-100 pb-3" style={{ minHeight: "50vh" }}>
            <div className="sub-content mt-3 border-bottom">
              <div className="container col-12 d-flex justify-content-center align-items-center border-bottom p-3 gap-3  ">
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
                  <h1>{userData ? userData.length : "--"}</h1>
                  <p className="fs-2" style={{ color: "gray" }}>
                    {" "}
                    No. of Users
                  </p>
                </div>
              </div>

              <div className="container col-12 d-flex justify-content-around align-items-center border-bottom p-3 gap-3  ">
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  User Name
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    width: "200px",
                    textAlign: "start",
                  }}
                >
                  Joined date
                </p>
              </div>
              {userData
                ? userData.map((user) => {
                    return (
                      <>
                        <div
                          className="container col-12 d-flex justify-content-around align-items-center border-bottom px-3 py-2 gap-3 practice-exam-container"
                          key={user.id}
                          onClick={() => handleNavigate(user.id)}
                        >
                          <p style={{ width: "200px", textAlign: "start" }}>
                            {user.first_name} {""} {user.last_name}
                          </p>
                          <p style={{ width: "200px", textAlign: "start" }}>
                            {user.email}{" "}
                          </p>
                          <p style={{ width: "200px", textAlign: "start" }}>
                            {user.time_stamp.split("T")[0]}
                          </p>
                        </div>
                      </>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;