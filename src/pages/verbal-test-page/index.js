import React, { useEffect, useState } from "react";
import { Progress, Radio, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { questions } from "../../components/items";
import { useNavigate } from "react-router-dom";
import "./style.css";

const VerbalTestPage = () => {
  const timeRemaining = sessionStorage.getItem("time_remaining");

  const [value, setValue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(31);
  const [percentage, setPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(10); // elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timeRemaining); // 61 minutes in seconds
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [tempValues, setTempValues] = useState([0, 0, 0]); // Initialize with three zeros
  const [tempSum, setTempSum] = useState(0);
  const [currentQuestionLevel, setCurrentQuestionLevel] = useState(3); // Initialize with level 2
  const [filteredQuestionsByLevel, setFilteredQuestionsByLevel] =
    useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [attendedQuestionIds, setAttendedQuestionIds] = useState([]);
  const [isSplitScreen, setIsSplitScreen] = useState(true);
  // Filter and shuffle questions
  const verbalQuestions = questions.filter(
    (question) => question.Category === "Verbal"
  );

  // function shuffleArray(array) {
  //   let currentIndex = array.length,
  //     randomIndex,
  //     temporaryValue;

  //   // While there remain elements to shuffle...
  //   while (currentIndex !== 0) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
  // }

  const shuffledQuestions = [...verbalQuestions];

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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8002/api/gmat/data")
  //     .then(async (response) => {
  //       const resultData = await response.data;

  //       console.log(JSON.stringify(resultData));
  //       // setDataLinkedIn(resultData);
  //     })
  //     .catch((err) => console.log("error", err));
  // }, []);

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
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setIsNextButtonDisabled(false);

    // Logic to determine the next question level based on tempSum
  };

  const exam_no = localStorage.getItem("exam_no");

  const calculateScore = (level) => {
    const isCorrect =
      value === filteredQuestionsByLevel[currentQuestion].correct_answer;

    let scoreIncrement = 0;

    if (isCorrect) {
      // Calculate score increment for correct answers
      switch (level) {
        case 1:
          scoreIncrement = 20;
          break;
        case 2:
          scoreIncrement = 30;
          break;
        case 3:
          scoreIncrement = 45;
          break;
        case 4:
          scoreIncrement = 60;
          break;
        case 5:
          scoreIncrement = 120;
          break;
        default:
          // Handle other levels if necessary
          break;
      }
    } else {
      // Calculate score decrement for wrong answers
      switch (level) {
        case 1:
          scoreIncrement = -10;
          break;
        case 2:
          scoreIncrement = -9;
          break;
        case 3:
          scoreIncrement = -5.62;
          break;
        case 4:
          scoreIncrement = -3;
          break;
        case 5:
          scoreIncrement = -6;

          break;
        default:
          // Handle other levels if necessary
          break;
      }
    }

    setScore((prevScore) => prevScore + scoreIncrement); // Update score by adding the increment
  };
  // Use useEffect to update session storage when score changes
  useEffect(() => {
    sessionStorage.setItem("GMAT_Score", score.toFixed(2));

    // Set practice score based on exam_no (you can add this logic as needed)
    if (exam_no === "1") {
      localStorage.setItem("practice_score_1", score.toFixed(2));
    } else if (exam_no === "2") {
      localStorage.setItem("practice_score_2", score.toFixed(2));
    } else {
      localStorage.setItem("practice_score_1", score.toFixed(2));
    }
  }, [score, exam_no]); // Trigger the effect whenever the score changes

  useEffect(() => {
    const updatedPercentage = (questionNumber / totalQuestions) * 100;
    setPercentage(updatedPercentage.toFixed(2));
  }, [questionNumber, totalQuestions]);

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    if (questionNumber < totalQuestions) {
      resetStopwatch();
      setUserAnswers([...userAnswers, value]);

      // Add the ID of the answered question to the attendedQuestionIds array
      const answeredQuestionId = filteredQuestionsByLevel[currentQuestion].id;
      setAttendedQuestionIds([...attendedQuestionIds, answeredQuestionId]);

      // Check if currentQuestion is within the valid range
      if (currentQuestion + 2 < filteredQuestionsByLevel.length) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      } else {
        // Handle the case where there are no more questions for the current level
        setCurrentQuestion(0);
      }
      setIsNextButtonDisabled(true); // Disable "Next" button again
      startStopwatch();
      setValue(null); // Reset the selected value

      const isCorrect =
        value === filteredQuestionsByLevel[currentQuestion].correct_answer;

      const newTempValues = [...tempValues, isCorrect ? 1 : 0].slice(1, 4);

      // Update the temporary values array and calculate the sum
      setTempValues(newTempValues);
      const newTempSum = newTempValues.reduce((acc, val) => acc + val, 0);
      setTempSum(newTempSum);

      console.log(tempSum);

      let nextQuestionLevel = currentQuestionLevel;

      calculateScore(nextQuestionLevel); // Calculate the score

      if (questionNumber > 2) {
        if (newTempSum === 0 && currentQuestionLevel > 1) {
          nextQuestionLevel = currentQuestionLevel - 1; // Decrease level by 1, but not below 1

          setCurrentQuestion(0);
        } else if (newTempSum === 3 && currentQuestionLevel < 5) {
          nextQuestionLevel = currentQuestionLevel + 1; // Increase level by 1, but not above 5

          setCurrentQuestion(0);
        }
      }

      setCurrentQuestionLevel(nextQuestionLevel);

      // Filter questions based on the currentQuestionLevel and attendedQuestionIds
      const filteredArray = shuffledQuestions.filter(
        (question) =>
          question.level === nextQuestionLevel &&
          !attendedQuestionIds.includes(question.id)
      );

      if (filteredArray.length === 0) {
        // No more questions left for the current level
        setCurrentQuestion(0);
      }

      setFilteredQuestionsByLevel(filteredArray);
    } else {
      setUserAnswers([...userAnswers, value]);
      calculateScore(); // Calculate the score
      navigate("/results");
      if (exam_no === "1") {
        localStorage.setItem("practice_status_1", "Completed");
      } else if (exam_no === "2") {
        localStorage.setItem("practice_status_2", "Completed");
      } else {
        localStorage.setItem("practice_status_3", "Completed");
      }
      // Handle the end of the test, e.g., show results
    }
  };

  useEffect(() => {
    // Filter questions based on the currentQuestionLevel
    const filteredArray = shuffledQuestions.filter(
      (question) => question.level === currentQuestionLevel
    );

    setFilteredQuestionsByLevel(filteredArray);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filteredQuestionsByLevel) {
      if (
        filteredQuestionsByLevel[currentQuestion].main_question_stem.length >
        1000
      ) {
        setIsSplitScreen(true);
      } else {
        setIsSplitScreen(false);
      }

      console.log(
        "🚀 ~ file: index.js:320 ~ useEffect ~ filteredQuestionsByLevel[currentQuestion].main_question_stem.length:",
        filteredQuestionsByLevel[currentQuestion].main_question_stem.length
      );
    }

    // eslint-disable-next-line
  }, [currentQuestion, score, isSplitScreen]);

  return (
    <>
      <div className="container-fluid p-0 ">
        <div
          className={`header p-3 col-12 d-flex justify-content-between align-items-center border-bottom`}
        >
          <div>
            <h4 className="m-0 p-0">Practice Exam</h4>
          </div>
          <div className=" d-flex justify-content-between align-items-center gap-3">
            <p className="m-0 p-0 d-flex justify-content-between align-items-center gap-1">
              <ClockCircleTwoTone /> This question: {formatTime(elapsedTime)}
            </p>
            <p className="m-0 p-0 d-flex justify-content-between align-items-center gap-1">
              {" "}
              <ClockCircleTwoTone />
              Remaining Time: {formatTimer(remainingTime)}
            </p>
            <button className="btn border">Pause</button>
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

        {filteredQuestionsByLevel ? (
          <div className="qstn-box">
            <div
              className={`container-fluid px-5 mt-5 text-start ${
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
                  {filteredQuestionsByLevel[currentQuestion].main_question_stem}
                </p>
              </div>

              <div
                className="container-fluid p-3"
                style={{ width: `${isSplitScreen ? "50%" : ""} ` }}
              >
                <p>
                  {filteredQuestionsByLevel[currentQuestion].subquestion1
                    ? `1) ${filteredQuestionsByLevel[currentQuestion].subquestion1}`
                    : ""}
                </p>
                <p>
                  {filteredQuestionsByLevel[currentQuestion].subquestion2
                    ? `2) ${filteredQuestionsByLevel[currentQuestion].subquestion2}`
                    : ""}
                </p>
                <p>
                  {filteredQuestionsByLevel[currentQuestion].subquestion3
                    ? `3) ${filteredQuestionsByLevel[currentQuestion].subquestion3}`
                    : ""}
                </p>
                <div className="mt-2">
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio value={"A"}>
                        {filteredQuestionsByLevel[currentQuestion].answer_1}
                      </Radio>

                      <Radio value={"B"}>
                        {filteredQuestionsByLevel[currentQuestion].answer_2}
                      </Radio>

                      <Radio value={"C"}>
                        {filteredQuestionsByLevel[currentQuestion].answer_3}
                      </Radio>

                      <Radio value={"D"}>
                        {filteredQuestionsByLevel[currentQuestion].answer_4}
                      </Radio>

                      <Radio value={"E"}>
                        {filteredQuestionsByLevel[currentQuestion].answer_5}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>

                <p className="mt-3">
                  Level:{filteredQuestionsByLevel[currentQuestion].level}
                </p>

                <p className="mt-3">
                  Correct Answer:
                  {filteredQuestionsByLevel[currentQuestion].correct_answer}
                </p>

                <p className="mt-3">
                  Score:
                  {score.toFixed(2)}
                </p>
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

export default VerbalTestPage;
