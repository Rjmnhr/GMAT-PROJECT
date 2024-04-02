import React, { useEffect, useState } from "react";
import { Progress, Radio, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { useApplicationContext } from "../../app-context";
// import axios from "axios";
import AxiosInstance from "../../../Config/axios";
import { questions } from "../questions";

const QuantTestPageFocus = () => {
  const [value, setValue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(21);
  const [percentage, setPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(45 * 60);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [tempValues, setTempValues] = useState([0, 0, 0]); // Initialize with three zeros
  const [tempSum, setTempSum] = useState(0);
  const [currentQuestionLevel, setCurrentQuestionLevel] = useState(4); // Initialize with level 2
  const [filteredQuestionsByLevel, setFilteredQuestionsByLevel] =
    useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [attendedQuestionIds, setAttendedQuestionIds] = useState([]);
  const [threshHold, setThreshHold] = useState(1);
  const [responseHistory, setResponseHistory] = useState([]);
  const [rightQuestions, setRightQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(null);

  const location = window.location.href;
  const userID = localStorage.getItem("adefteducation_user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

  // const { questions, setQuestions } = useApplicationContext();

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue =
  //       "Refreshing the page will remove you from the exam. Are you sure you want to leave?";

  //     const confirmationMessage =
  //       "Refreshing the page will remove you from the exam. Are you sure you want to leave?";
  //     e.returnValue = confirmationMessage;

  //     if (window.confirm(confirmationMessage)) {
  //       // User clicked OK, navigate to "/"
  //       navigate("/");
  //     } else {
  //       // User clicked Cancel, prevent page refresh

  //       return false;
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [navigate]); // Include history in the dependency array

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8003/api/gmat/data")
  //     .then(async (response) => {
  //       const resultData = await response.data;

  //       await setQuestions(resultData);
  //       console.log("🚀 ~ file: index.js:40 ~ .then ~ resultData:", resultData);
  //     })
  //     .catch((err) => console.log("error", err));
  //   //eslint-disable-next-line
  // }, []);

  useEffect(() => {
    let newThreshold = 0;

    if (questionNumber < 3) {
      newThreshold = 1;
    } else if (questionNumber >= 4 && questionNumber < 7) {
      newThreshold = 0;
    } else if (questionNumber > 7 && questionNumber < 10) {
      newThreshold = 1;
    } else {
      newThreshold = 0;
    }

    setThreshHold(newThreshold);
  }, [questionNumber]);
  // Filter and shuffle questions
  const quantWordProblems = questions.filter(
    (question) =>
      question.Category === "Quant" &&
      question.Quant_category_1 !== "Data Sufficiency" &&
      question.SubCategory !== "Geometry"
  );

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

  if (remainingTime === 0) {
    alert("The Allowed time for this session is over");
    sessionStorage.setItem("current_section", "verbal");
    navigate("/test-break");
  }

  // Function to track user inputs and update statistics
  const trackUserInput = (answer) => {
    console.log(answer);

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
    const newTotalTimeSpent = 61 * 60 - remainingTime;

    sessionStorage.setItem("quant_time_spend", newTotalTimeSpent);

    sessionStorage.setItem("quant_correct_questions", rightAnswer);

    sessionStorage.setItem("quant_wrong_questions", wrongAnswer);
  };

  const QuestionsArray = [...quantWordProblems];
  console.log(
    "🚀 ~ file: index.js:163 ~ QuantTestPageFocus ~ QuestionsArray:",
    QuestionsArray.length
  );

  useEffect(() => {
    const shuffledArr = shuffleArray(QuestionsArray);
    setShuffledQuestions(shuffledArr);
    //eslint-disable-next-line
  }, []);

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
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setIsNextButtonDisabled(false);

    // Logic to determine the next question level based on tempSum
  };

  const calculateScore = async (level) => {
    const isCorrect = value === filteredQuestionsByLevel[0].correct_answer;

    let scoreIncrement = 0;

    if (questionNumber <= 7) {
      if (isCorrect) {
        // Calculate score increment for correct answers
        switch (level) {
          case 1:
            scoreIncrement = 20;
            break;
          case 2:
            scoreIncrement = 24;
            break;
          case 3:
            scoreIncrement = 25;
            break;
          case 4:
            scoreIncrement = 30;
            break;
          case 5:
            scoreIncrement = 35;
            break;
          case 6:
            scoreIncrement = 45;
            break;
          case 7:
            scoreIncrement = 60;
            break;
          case 8:
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
            scoreIncrement = -10.8;
            break;
          case 3:
            scoreIncrement = -10;
            break;
          case 4:
            scoreIncrement = -9;
            break;
          case 5:
            scoreIncrement = -8.75;

            break;
          case 6:
            scoreIncrement = -5.625;
            break;
          case 7:
            scoreIncrement = -3;
            break;
          case 8:
            scoreIncrement = -6;

            break;

          default:
            // Handle other levels if necessary
            break;
        }
      }
    } else {
      if (isCorrect) {
        // Calculate score increment for correct answers
        switch (level) {
          case 1:
            scoreIncrement = 2.0;
            break;
          case 2:
            scoreIncrement = 2.4;
            break;
          case 3:
            scoreIncrement = 2.5;
            break;
          case 4:
            scoreIncrement = 3.0;
            break;
          case 5:
            scoreIncrement = 3.5;
            break;
          case 6:
            scoreIncrement = 4.5;
            break;
          case 7:
            scoreIncrement = 6.0;
            break;
          case 8:
            scoreIncrement = 12;
            break;
          default:
            // Handle other levels if necessary
            break;
        }
      } else {
        // Calculate score decrement for wrong answers
        switch (level) {
          case 1:
            scoreIncrement = -2;
            break;
          case 2:
            scoreIncrement = -2.16;
            break;
          case 3:
            scoreIncrement = -2;
            break;
          case 4:
            scoreIncrement = -1.8;
            break;
          case 5:
            scoreIncrement = -1.75;

            break;
          case 6:
            scoreIncrement = -1.125;
            break;
          case 7:
            scoreIncrement = -0.6;
            break;
          case 8:
            scoreIncrement = -1.2;

            break;

          default:
            // Handle other levels if necessary
            break;
        }
      }
    }

    setScore((prevScore) => prevScore + scoreIncrement);
  };

  const RangeValues = [10, 50, 75, 100, 125, 190, 280, 375, 475];

  function findClosestValues(inputValue) {
    let closestLow = -Infinity;
    let closestHigh = Infinity;

    for (const value of RangeValues) {
      if (value < inputValue && value > closestLow) {
        closestLow = value;
      } else if (value > inputValue && value < closestHigh) {
        closestHigh = value;
      }
    }

    return { closestLow, closestHigh };
  }

  const GMATScoreConversion = (totalScore) => {
    let convertedScore = 0;

    switch (totalScore) {
      case 10:
        convertedScore = 60;
        break;
      case 50:
        convertedScore = 65;

        break;
      case 75:
        convertedScore = 70;
        break;
      case 100:
        convertedScore = 75;
        break;
      case 125:
        convertedScore = 80;

        break;
      case 190:
        convertedScore = 85;
        break;
      case 280:
        convertedScore = 88;
        break;
      case 375:
        convertedScore = 89;
        break;
      case 475:
        convertedScore = 90;
        break;
      default:
        const { closestLow, closestHigh } = findClosestValues(totalScore);
        const x = calculateMatchingValue(closestLow);
        const i = calculateMatchingValue(closestHigh);
        const y = i - x;

        const z = (closestHigh - totalScore) / (closestHigh - closestLow);

        convertedScore = x + y * z;

        break;
    }

    console.log(convertedScore);

    if (convertedScore > 90) {
      convertedScore = 90;
    }

    sessionStorage.setItem("quant_score", Math.round(convertedScore));
  };

  function calculateMatchingValue(range) {
    switch (range) {
      case 10:
        return 60;
      case 50:
        return 65;
      case 75:
        return 70;
      case 100:
        return 75;
      case 125:
        return 80;
      case 190:
        return 85;
      case 280:
        return 88;
      case 375:
        return 89;
      case 475:
        return 90;
      default:
        // Handle other cases as needed
        return 0;
    }
  }

  // Trigger the effect whenever the score changes

  useEffect(() => {
    const updatedPercentage = (questionNumber / totalQuestions) * 100;
    setPercentage(updatedPercentage.toFixed(2));
  }, [questionNumber, totalQuestions]);

  const mappingTheLevels = (level) => {
    switch (level) {
      case 1:
        return 1;

      case 2:
        return 1;

      case 3:
        return 2;

      case 4:
        return 2;

      case 5:
        return 3;

      case 6:
        return 3;

      case 7:
        return 4;

      case 8:
        return 5;

      default:
        // Handle other cases as needed
        return 1;
    }
  };

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    if (questionNumber < totalQuestions) {
      resetStopwatch();
      setUserAnswers([...userAnswers, value]);

      // Check if currentQuestion is within the valid range
      if (currentQuestion < filteredQuestionsByLevel.length) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      } else {
        console.log("inside");
        // Handle the case where there are no more questions for the current level
        setCurrentQuestion(0);
      }

      // Add the ID of the answered question to the attendedQuestionIds array
      const answeredQuestionId = filteredQuestionsByLevel[0].id;

      const AttendedQuestionIdsArr = [
        ...attendedQuestionIds,
        answeredQuestionId,
      ];

      setAttendedQuestionIds([...attendedQuestionIds, answeredQuestionId]);

      setIsNextButtonDisabled(true); // Disable "Next" button again
      startStopwatch();
      setValue(null); // Reset the selected value

      const isCorrect = value === filteredQuestionsByLevel[0].correct_answer;

      trackUserInput(isCorrect);

      const newTempValues = [...tempValues, isCorrect ? 1 : 0].slice(1, 4);

      // Update the temporary values array and calculate the sum
      setTempValues(newTempValues);
      const newTempSum = newTempValues.reduce((acc, val) => acc + val, 0);
      setTempSum(newTempSum);

      console.log(tempSum);

      let nextQuestionLevel = currentQuestionLevel;

      calculateScore(nextQuestionLevel); // Calculate the score
      var levelLimit = 2;

      if (questionNumber > 7) {
        levelLimit = 1;
      }

      if (currentQuestion > threshHold) {
        if (newTempSum === 0 && currentQuestionLevel > levelLimit) {
          nextQuestionLevel = currentQuestionLevel - 1; // Decrease level by 1, but not below 1

          setCurrentQuestion(0);
        } else if (newTempSum === 3 && currentQuestionLevel < 8) {
          nextQuestionLevel = currentQuestionLevel + 1; // Increase level by 1, but not above 5

          setCurrentQuestion(0);
        }
      }

      setCurrentQuestionLevel(nextQuestionLevel);

      if (questionNumber === 7) {
        nextQuestionLevel = 4;
        setCurrentQuestionLevel(4);
        setCurrentQuestion(0);
      }

      let mappedLevel = mappingTheLevels(nextQuestionLevel);

      // Filter questions based on the currentQuestionLevel and attendedQuestionIds
      const filteredArray = shuffledQuestions.filter(
        (question) =>
          question.level === mappedLevel &&
          !AttendedQuestionIdsArr.includes(question.id)
      );

      const response = {
        questionNumber,

        status: isCorrect ? "right" : "wrong",
        score: score,
        level: nextQuestionLevel,
        mappedLevel: mappedLevel,
      };

      // Add the response object to the history array
      setResponseHistory([...responseHistory, response]);

      if (filteredArray.length === 0) {
        // No more questions left for the current level
        setCurrentQuestion(0);

        if (nextQuestionLevel < 8) {
          nextQuestionLevel = nextQuestionLevel + 1;
        } else {
          if (nextQuestionLevel !== 1) {
            nextQuestionLevel = nextQuestionLevel - 1;
          }
        }

        mappedLevel = mappingTheLevels(nextQuestionLevel);

        // Filter questions based on the currentQuestionLevel and attendedQuestionIds
        const filteredArray = shuffledQuestions.filter(
          (question) =>
            question.level === mappedLevel &&
            !AttendedQuestionIdsArr.includes(question.id)
        );

        setFilteredQuestionsByLevel(filteredArray);

        return;
      }

      setFilteredQuestionsByLevel(filteredArray);
    } else {
      setUserAnswers([...userAnswers, value]);
      calculateScore(currentQuestionLevel); // Calculate the score

      const isCorrect = value === filteredQuestionsByLevel[0].correct_answer;

      trackUserInput(isCorrect);

      sessionStorage.setItem("time_remaining", remainingTime);

      console.log(responseHistory);
    }
  };

  useEffect(() => {
    const mappedLevel = mappingTheLevels(currentQuestionLevel);

    if (shuffledQuestions) {
      // Filter questions based on the currentQuestionLevel
      const filteredArray = shuffledQuestions.filter(
        (question) => question.level === mappedLevel
      );
      setFilteredQuestionsByLevel(filteredArray);
    }

    // eslint-disable-next-line
  }, [shuffledQuestions]);

  useEffect(() => {
    GMATScoreConversion(score);

    sessionStorage.setItem("GMAT_Score", score);
    if (questionNumber > totalQuestions) {
      navigate("/test-break");
    }
    //eslint-disable-next-line
  }, [score]);

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

        {filteredQuestionsByLevel ? (
          filteredQuestionsByLevel.length > 0 ? (
            <div className="qstn-box">
              <div className="container-fluid px-5 mt-5 text-left">
                <p className="mb-3">
                  {filteredQuestionsByLevel[0].main_question_stem
                    ? filteredQuestionsByLevel[0].main_question_stem
                    : ""}
                </p>

                {filteredQuestionsByLevel[0].img_url ? (
                  <img
                    className="mb-3"
                    src={filteredQuestionsByLevel[0].img_url}
                    alt="not available"
                  />
                ) : (
                  ""
                )}

                <p>
                  {filteredQuestionsByLevel[0].subquestion1
                    ? `1) ${filteredQuestionsByLevel[0].subquestion1}`
                    : ""}
                </p>
                <p>
                  {filteredQuestionsByLevel[0].subquestion2
                    ? `2) ${filteredQuestionsByLevel[0].subquestion2}`
                    : ""}
                </p>
                <p>
                  {filteredQuestionsByLevel[0].subquestion3
                    ? `3) ${filteredQuestionsByLevel[0].subquestion3}`
                    : ""}
                </p>
                <div className="mt-2">
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio value={"A"}>
                        {filteredQuestionsByLevel[0].answer_1
                          ? filteredQuestionsByLevel[0].answer_1
                          : ""}
                      </Radio>

                      <Radio value={"B"}>
                        {filteredQuestionsByLevel[0].answer_2
                          ? filteredQuestionsByLevel[0].answer_2
                          : ""}
                      </Radio>

                      <Radio value={"C"}>
                        {filteredQuestionsByLevel[0].answer_3
                          ? filteredQuestionsByLevel[0].answer_3
                          : ""}
                      </Radio>

                      <Radio value={"D"}>
                        {filteredQuestionsByLevel[0].answer_4
                          ? filteredQuestionsByLevel[0].answer_4
                          : ""}
                      </Radio>

                      <Radio value={"E"}>
                        {filteredQuestionsByLevel[0].answer_5
                          ? filteredQuestionsByLevel[0].answer_5
                          : ""}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>

                {/* <p className="mt-3">
                  Level of question:
                  {filteredQuestionsByLevel[0].level
                    ? filteredQuestionsByLevel[0].level
                    : ""}
                </p>
                <p className="mt-3">Level :{currentQuestionLevel}</p>

                <p className="mt-3">
                  Score:
                  {score.toFixed(2)}
                </p>

                <p className="mt-3">
                  Correct Answer:
                  {filteredQuestionsByLevel[0].correct_answer
                    ? filteredQuestionsByLevel[0].correct_answer
                    : ""}
                </p> */}
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default QuantTestPageFocus;
