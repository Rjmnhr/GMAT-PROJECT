import React from "react";

const QuestionComponent = ({ question, userAnswer, onNext, onAnswer }) => {
  const { question: questionText, answers } = question;

  const handleAnswerClick = (selectedAnswer) => {
    onAnswer(selectedAnswer);
  };

  return (
    <div className="question-container">
      <p>{questionText}</p>
      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={userAnswer === answer ? "selected" : ""}
          >
            {answer}
          </li>
        ))}
      </ul>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default QuestionComponent;
