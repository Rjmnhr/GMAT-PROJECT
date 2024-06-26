import React, { useEffect, useState } from "react";
import { Progress, Radio, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Config/axios";
import { questions } from "../questions";
import { useApplicationContext } from "../../../Context/app-context";
import {
  gmat_dashboard_path,
  gmat_results_path,
  login_path,
} from "../../../Config/config";

const IRTestPage = () => {
  const [value, setValue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(12);
  const [percentage, setPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(10); // elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(30 * 60);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isSplitScreen, setIsSplitScreen] = useState(true);
  const [rightQuestions, setRightQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(null);
  const navigate = useNavigate();
  const { setCurrentSectionIndex, setShowInstruction } =
    useApplicationContext();
  const storedCurrentSectionIndex =
    parseInt(sessionStorage.getItem("currentSectionIndex")) || 0;
  const accessToken = localStorage.getItem("accessToken");
  const storedSectionOrder = sessionStorage.getItem("section-order-choice");
  const storedCategory = sessionStorage.getItem("category");
  const storedPracticeExam = sessionStorage.getItem("practice-exam");

  const saveUserActivity = (
    questionNumber,
    newTotalTimeSpent,
    rightAnswer,
    wrongAnswer,
    convertedScore
  ) => {
    const formData = new FormData();

    formData.append("section", "ir");
    formData.append("section_order", storedSectionOrder);
    formData.append("question_no", questionNumber);
    formData.append("category", storedCategory);
    formData.append("section_time", newTotalTimeSpent);
    formData.append("ir_time_spent", newTotalTimeSpent);
    formData.append("practice_exam", storedPracticeExam);
    formData.append("ir_questions_correct", rightAnswer);
    formData.append("ir_questions_incorrect", wrongAnswer);
    formData.append("ir_scaled_score", convertedScore);
    formData.append("status", "Incomplete");

    AxiosInstance.post("api/gmat/user-activity/save-activity", formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;
        if (response.status !== 200) {
          navigate(`${login_path}?p=${gmat_dashboard_path}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trackUserInput = (answer, score) => {
    let rightAnswer = rightQuestions;
    let wrongAnswer = wrongQuestions;

    if (answer) {
      rightAnswer = rightAnswer + 1;
      // Increment the count of right questions
      setRightQuestions((prevRightQuestions) => prevRightQuestions + 1);
    } else if (!answer) {
      wrongAnswer = wrongAnswer + 1;
      // Increment the count of wrong questions
      setWrongQuestions((prevWrongQuestions) => prevWrongQuestions + 1);
    }

    // Calculate the new total time spent
    const newTotalTimeSpent = 30 * 60 - remainingTime;

    saveUserActivity(
      questionNumber,
      newTotalTimeSpent,
      rightAnswer,
      wrongAnswer,
      score
    );

    sessionStorage.setItem("ir_time_spend", newTotalTimeSpent);

    sessionStorage.setItem("ir_correct_questions", rightAnswer);

    sessionStorage.setItem("ir_wrong_questions", wrongAnswer);
  };

  // Filter and shuffle questions
  const IRQuestions = questions.filter(
    (question) => question.Category === "Integrated reasoning"
  );

  useEffect(() => {
    const shuffledArr = shuffleArray(IRQuestions);
    setShuffledQuestions(shuffledArr);
    //eslint-disable-next-line
  }, []);

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex,
      temporaryValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1); // Update every second
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(true); // Automatically start the stopwatch on reset
  };

  useEffect(() => {
    if (currentQuestion === 0) {
      startStopwatch();
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
    setIsNextButtonDisabled(false);

    // Logic to determine the next question level based on tempSum
  };

  useEffect(() => {
    const updatedPercentage = (questionNumber / totalQuestions) * 100;
    setPercentage(updatedPercentage.toFixed(2));
  }, [questionNumber, totalQuestions]);

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    if (questionNumber < totalQuestions) {
      resetStopwatch();

      // Check if currentQuestion is within the valid range

      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      let finalScore = score;
      // Check if the selected answer is correct and update the score
      const correctAnswer = shuffledQuestions[currentQuestion].correct_answer;
      const isCorrect = value === correctAnswer;

      if (value === correctAnswer) {
        setScore(score + 1);
        finalScore = finalScore + 1;
      }

      // Calculate the percentage score out of 8
      const percentageScore = (finalScore / totalQuestions) * 8;

      // Store the percentage score in session storage
      sessionStorage.setItem("ir_score", percentageScore.toFixed(2));
      trackUserInput(isCorrect, percentageScore);

      setIsNextButtonDisabled(true); // Disable "Next" button again
      startStopwatch();
      setValue(null); // Reset the selected value
    } else {
      let finalScore = score;
      // Check if the selected answer is correct and update the score
      const correctAnswer = shuffledQuestions[currentQuestion].correct_answer;
      const isCorrect = value === correctAnswer;
      if (value === correctAnswer) {
        setScore(score + 1);
        finalScore = score + 1;
      }

      trackUserInput(isCorrect);

      // Calculate the percentage score out of 8
      const percentageScore = (finalScore / totalQuestions) * 8;

      // Store the percentage score in session storage
      sessionStorage.setItem("ir_score", percentageScore.toFixed(2));

      sessionStorage.removeItem("current_section");
      sessionStorage.setItem("time_remaining", remainingTime);

      if (storedCurrentSectionIndex === 2) {
        sessionStorage.setItem("currentSectionIndex", 0);
        navigate(gmat_results_path);
      } else {
        setCurrentSectionIndex(storedCurrentSectionIndex + 1);
        setShowInstruction(true);
        sessionStorage.setItem(
          "currentSectionIndex",
          storedCurrentSectionIndex + 1
        );
      }
    }
  };

  useEffect(() => {
    if (shuffledQuestions) {
      if (
        shuffledQuestions[currentQuestion].main_question_stem.length > 1000 ||
        shuffledQuestions[currentQuestion].img_url
      ) {
        setIsSplitScreen(true);
      } else {
        setIsSplitScreen(false);
      }
    }

    // eslint-disable-next-line
  }, [currentQuestion, isSplitScreen]);

  return (
    <>
      <div className="container-fluid p-0 ">
        <div className="header p-3 col-12 d-flex justify-content-between align-items-center border-bottom">
          <div>
            <h4 className="m-0 p-0">Practice Exam</h4>
          </div>
          <div className=" d-flex justify-content-between align-items-center gap-3">
            <p className="m-0 p-0 d-flex justify-content-between align-items-center gap-1">
              <ClockCircleTwoTone style={{ marginRight: "5px" }} /> This
              question: {formatTime(elapsedTime)}
            </p>
            <p
              style={{ marginLeft: "8px" }}
              className="  d-flex justify-content-between align-items-center gap-1"
            >
              {" "}
              <ClockCircleTwoTone style={{ marginRight: "5px" }} />
              Remaining Time: {formatTimer(remainingTime)}
            </p>
          </div>
        </div>
        <div className="container d-flex justify-content-around align-items-center p-2 border-bottom ">
          <label>
            Question {questionNumber} out of {totalQuestions}
          </label>
          <div>
            <Progress percent={percentage} size={[700, 15]} />
          </div>
          <button
            onClick={handleNext}
            className="btn btn-primary"
            disabled={isNextButtonDisabled}
          >
            {questionNumber === totalQuestions ? "Finish" : " Next"}
          </button>
          {/* <button
              
              className="btn "
              style={{ background: "red", color: "white" }}
            >
              End test
            </button> */}
        </div>

        {shuffledQuestions ? (
          <div className="qstn-box">
            <div
              className={`container-fluid px-5 mt-5 text-left ${
                isSplitScreen ? "d-flex" : "d-block"
              }   justify-content-center align-items-start`}
            >
              <div
                className="container-fluid p-3 pb-0 qstn-container text-justify"
                style={{
                  width: `${isSplitScreen ? "50%" : ""} `,
                  textAlign: "justify",
                  borderRight: `${isSplitScreen ? "1px solid " : ""} `,
                  overflow: "scroll",
                  height: `${isSplitScreen ? "70vh" : ""} `,
                }}
              >
                <p className="mb-3">
                  {shuffledQuestions[currentQuestion].main_question_stem}
                </p>

                <img src={shuffledQuestions[currentQuestion].img_url} alt="" />
              </div>

              <div
                className="container-fluid p-3"
                style={{ width: `${isSplitScreen ? "50%" : ""} ` }}
              >
                <p className="mb-2">
                  {shuffledQuestions[currentQuestion].subquestion1
                    ? `1) ${shuffledQuestions[currentQuestion].subquestion1}`
                    : ""}
                </p>
                <p className="mb-2">
                  {shuffledQuestions[currentQuestion].subquestion2
                    ? `2) ${shuffledQuestions[currentQuestion].subquestion2}`
                    : ""}
                </p>
                <p className="mb-2">
                  {shuffledQuestions[currentQuestion].subquestion3
                    ? `3) ${shuffledQuestions[currentQuestion].subquestion3}`
                    : ""}
                </p>
                <div className="mt-2">
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      {shuffledQuestions[currentQuestion].answer_1 ? (
                        <Radio value={"A"}>
                          {shuffledQuestions[currentQuestion].answer_1}
                        </Radio>
                      ) : (
                        ""
                      )}

                      {shuffledQuestions[currentQuestion].answer_2 ? (
                        <Radio value={"B"}>
                          {shuffledQuestions[currentQuestion].answer_2}
                        </Radio>
                      ) : (
                        ""
                      )}
                      {shuffledQuestions[currentQuestion].answer_3 ? (
                        <Radio value={"C"}>
                          {shuffledQuestions[currentQuestion].answer_3}
                        </Radio>
                      ) : (
                        ""
                      )}

                      {shuffledQuestions[currentQuestion].answer_4 ? (
                        <Radio value={"D"}>
                          {shuffledQuestions[currentQuestion].answer_4}
                        </Radio>
                      ) : (
                        ""
                      )}
                      {shuffledQuestions[currentQuestion].answer_5 ? (
                        <Radio value={"E"}>
                          {shuffledQuestions[currentQuestion].answer_5}
                        </Radio>
                      ) : (
                        ""
                      )}
                    </Space>
                  </Radio.Group>
                </div>
                {/* 
                <p className="mt-3">
                  Correct Answer:
                  {shuffledQuestions[currentQuestion].correct_answer}
                </p> */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default IRTestPage;
