import React, { useEffect, useState } from "react";
import { Progress, Radio, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { questions } from "../../components/items";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [value, setValue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(questions.length);
  const [percentage, setPercentage] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timer, setTimer] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [userAnswers, setUserAnswers] = useState(
    Array(totalQuestions).fill("")
  );
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
        setTotalTime((prevTotalTime) => prevTotalTime + 1);
      }, 1000) // Update every second
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setIsNextButtonDisabled(false);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (userAnswers[i] === questions[i].correct_answer) {
        correctAnswers++;
      }
    }
    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore);
    sessionStorage.setItem("GMAT_Score", calculatedScore);
    console.log(score);
  };
  useEffect(() => {
    const updatedPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
    setPercentage(updatedPercentage.toFixed(2));
  }, [currentQuestion, totalQuestions]);

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      stopTimer(); // Stop the timer
      setTimeSpent(0); // Reset the time spent
      startTimer(); // Start the timer for the next question
      setUserAnswers([...userAnswers, value]);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setIsNextButtonDisabled(true); // Disable "Next" button again
    } else {
      calculateScore(); // Calculate the score
      navigate("/results");
      // Handle end of the test, e.g., show results
    }
  };

  useEffect(() => {
    // Cleanup function when the component unmounts or when moving to the next question
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts
  }, []);
  return (
    <>
      <div className="container-fluid p-0 ">
        <div className="header p-3 col-12 d-flex justify-content-between align-items-center border-bottom">
          <div>
            <h4 className="m-0 p-0">Practice Exam</h4>
          </div>
          <div className=" d-flex justify-content-between align-items-center gap-3">
            <p className="m-0 p-0 d-flex justify-content-between align-items-center gap-1">
              <ClockCircleTwoTone /> This question: {formatTime(timeSpent)}
            </p>
            <p className="m-0 p-0 d-flex justify-content-between align-items-center gap-1">
              {" "}
              <ClockCircleTwoTone />
              Total: {formatTime(totalTime)}
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
        </div>
        <div className="qstn-box">
          <div className="container-fluid px-3 mt-5 text-start">
            <p>{questions[currentQuestion].main_question_stem}</p>

            <div>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={questions[currentQuestion].answer_1}>
                    {questions[currentQuestion].answer_1}
                  </Radio>

                  <Radio value={questions[currentQuestion].answer_2}>
                    {questions[currentQuestion].answer_2}
                  </Radio>

                  <Radio value={questions[currentQuestion].answer_3}>
                    {questions[currentQuestion].answer_3}
                  </Radio>

                  <Radio value={questions[currentQuestion].answer_4}>
                    {questions[currentQuestion].answer_4}
                  </Radio>

                  <Radio value={questions[currentQuestion].answer_5}>
                    {questions[currentQuestion].answer_5}
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
