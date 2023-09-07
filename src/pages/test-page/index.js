import React, { useEffect, useState } from "react";
import { Progress, Radio, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { questions } from "../../components/items";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [value, setValue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(31);
  const [percentage, setPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(61 * 60); // 61 minutes in seconds
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [tempValues, setTempValues] = useState([0, 0, 0]); // Initialize with three zeros
  const [tempSum, setTempSum] = useState(3);

  // Filter and shuffle questions
  const quantWordProblems = questions.filter(
    (question) =>
      question.Category === "Quant" &&
      question.Quant_category_1 === "Word problems"
  );

  const quantDataSufficiency = questions.filter(
    (question) =>
      question.Category === "Quant" &&
      question.Quant_category_1 === "Data Sufficiency"
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

  const shuffledQuestions = [
    ...quantWordProblems.slice(0, 16), // Select 16 Word Problems questions
    ...quantDataSufficiency.slice(0, 15), // Select 15 Data Sufficiency questions
  ];

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
  };

  const exam_no = localStorage.getItem("exam_no");

  const calculateScore = () => {
    let correctAnswers = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (userAnswers[i] === shuffledQuestions[i].correct_answer) {
        correctAnswers++;
      }
    }

    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore);
    sessionStorage.setItem("GMAT_Score", calculatedScore.toFixed(2));
    if (exam_no === "1") {
      localStorage.setItem("practice_score_1", calculatedScore.toFixed(2));
    } else if (exam_no === "2") {
      localStorage.setItem("practice_score_2", calculatedScore.toFixed(2));
    } else {
      localStorage.setItem("practice_score_1", calculatedScore.toFixed(2));
    }

    console.log(score);
  };
  useEffect(() => {
    const updatedPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
    setPercentage(updatedPercentage.toFixed(2));
  }, [currentQuestion, totalQuestions]);

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      resetStopwatch();
      setUserAnswers([...userAnswers, value]);

      const isCorrect =
        value === shuffledQuestions[currentQuestion].correct_answer;

      const newTempValues = [...tempValues, isCorrect ? 1 : 0].slice(1, 4);

      // Update the temporary values array and calculate the sum
      setTempValues(newTempValues);
      const newTempSum = newTempValues.reduce((acc, val) => acc + val, 0);
      setTempSum(newTempSum);
      console.log(tempSum);

      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setIsNextButtonDisabled(true); // Disable "Next" button again
      startStopwatch();
      setValue(null); // Reset the selected value
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
      // Handle end of the test, e.g., show results
    }
  };

  return (
    <>
      <div className="container-fluid p-0 ">
        <div className="header p-3 col-12 d-flex justify-content-between align-items-center border-bottom">
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
            Question {currentQuestion + 1} out of {totalQuestions}
          </label>
          <div>
            <Progress percent={percentage} size={[700, 15]} />
          </div>
          <button
            onClick={handleNext}
            className="btn btn-primary"
            disabled={isNextButtonDisabled}
          >
            {currentQuestion + 1 === totalQuestions ? "Finish" : " Next"}
          </button>
          {/* <button
            
            className="btn "
            style={{ background: "red", color: "white" }}
          >
            End test
          </button> */}
        </div>
        <div className="qstn-box">
          <div className="container-fluid px-5 mt-5 text-start">
            <p className="mb-3">
              {shuffledQuestions[currentQuestion].main_question_stem}
            </p>
            <p>
              {shuffledQuestions[currentQuestion].subquestion1
                ? `1) ${shuffledQuestions[currentQuestion].subquestion1}`
                : ""}
            </p>
            <p>
              {shuffledQuestions[currentQuestion].subquestion2
                ? `2) ${shuffledQuestions[currentQuestion].subquestion2}`
                : ""}
            </p>
            <p>
              {shuffledQuestions[currentQuestion].subquestion3
                ? `3) ${shuffledQuestions[currentQuestion].subquestion3}`
                : ""}
            </p>
            <div className="mt-2">
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={"A"}>
                    {shuffledQuestions[currentQuestion].answer_1}
                  </Radio>

                  <Radio value={"B"}>
                    {shuffledQuestions[currentQuestion].answer_2}
                  </Radio>

                  <Radio value={"C"}>
                    {shuffledQuestions[currentQuestion].answer_3}
                  </Radio>

                  <Radio value={"D"}>
                    {shuffledQuestions[currentQuestion].answer_4}
                  </Radio>

                  <Radio value={"E"}>
                    {shuffledQuestions[currentQuestion].answer_5}
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
