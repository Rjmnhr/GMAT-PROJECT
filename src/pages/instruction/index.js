import React, { useState } from "react";
import { Carousel, Radio } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const InstructionPage = () => {
  const [dotPosition, setDotPosition] = useState("top");
  const [carouselRef, setCarouselRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  const handleNext = () => {
    if (carouselRef) {
      carouselRef.next();
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (carouselRef && currentSlide > 0) {
      carouselRef.prev();
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <Radio.Group
        onBlur={handlePositionChange}
        value={dotPosition}
        style={{
          marginBottom: 8,
        }}
      ></Radio.Group>
      <Carousel dotPosition={dotPosition} ref={setCarouselRef}>
        <div className="container p-3 ">
          <h3 className="mb-5">Introduction</h3>
          <p className="mb-3 text-start fs-4 ">
            This practice exam is designed to help you prepare for the GMAT
            (Graduate Management Admission Test). Please read these instructions
            carefully before you begin.
          </p>
          <p className="mb-3 text-start fs-4">
            The GMAT consists of four main sections: Analytical Writing
            Assessment (AWA), Integrated Reasoning (IR), Quantitative Reasoning,
            and Verbal Reasoning. In this practice exam, you will have the
            opportunity to practice questions from both the Quantitative and
            Verbal sections.
          </p>
          <p className="mb-3 text-start fs-4">
            The GMAT allows you to choose the order in which you take the
            sections. You can start with either the Analytical Writing
            Assessment (AWA) or Integrated Reasoning (IR) section, followed by
            Quantitative Reasoning and Verbal Reasoning. For this practice exam,
            we will follow the default order: Quantitative Reasoning followed by
            Verbal Reasoning.
          </p>
        </div>
        <div className="container p-3 ">
          <h3 className="mb-5">Instructions</h3>
          <p className="mb-3 text-start fs-4">
            This practice exam is timed to simulate the real GMAT test
            conditions. Make sure to manage your time effectively for each
            question.
          </p>
          <p className="mb-3 text-start fs-4">
            The Quantitative Reasoning section consists of questions that assess
            your ability to solve quantitative problems, while the Verbal
            Reasoning section evaluates your reading comprehension and critical
            reasoning skills.
          </p>
          <p className="mb-3 text-start fs-4">
            Use the "Next" button to move to the next question. Careful in this
            practice exam once you answer the question and move to the next
            question you can't go back to the previous question
          </p>
          <p className="mb-3 text-start fs-4">
            For multiple-choice questions, select the answer choice by clicking
            the radio button next to your chosen answer. For quantitative
            questions, enter your numerical answer in the provided text box.
          </p>
          <p className="mb-3 text-start fs-4">
            You may use scratch paper or a virtual whiteboard if it's allowed in
            your real GMAT test. Ensure you have it ready before starting the
            exam.
          </p>
        </div>

        <div className="container p-3 ">
          <h3 className="mb-5">Instructions</h3>
          <p className="mb-3 text-start fs-4">
            When you have completed all the questions, click the "Finish"
            button. You will receive a summary of your performance.
          </p>
          <p className="mb-3 text-start fs-4">
            This practice exam does not provide an official GMAT score. Use it
            as a tool to assess your readiness and identify areas for
            improvement.
          </p>
          <p className="mb-3 text-start fs-4">
            After completing the practice exam, review your performance to
            understand your strengths and weaknesses. Focus on areas where you
            need improvement during your GMAT preparation.
          </p>
          <p className="mb-3 text-start fs-4">
            For comprehensive GMAT preparation, consider using official GMAT
            study materials and practice tests provided by the Graduate
            Management Admission Council (GMAC).
          </p>
          <p className="mb-3 text-start fs-4">
            If you encounter any technical issues during the practice exam,
            please reach out to our support team for assistance.
          </p>

          <p className="mb-3 text-start fs-4">
            Your practice exam data is kept confidential and will not be shared
            with any third parties.
          </p>
          <p className="mb-3 text-start fs-4">
            Note: This practice exam is not an official GMAT test and is
            intended solely for practice purposes. Your performance on this
            practice exam may not reflect your actual GMAT score. Use it as a
            learning tool to gauge your readiness for the real GMAT exam.
          </p>

          <p style={{ fontWeight: "bold" }} className="fs-4 text-start">
            Best of luck with your GMAT preparation! Remember that practice and
            diligent study will help you achieve your target score.
          </p>
        </div>
      </Carousel>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        {currentSlide === 0 && (
          <button
            className="btn border"
            style={{ marginRight: 8 }}
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        )}
        {currentSlide > 0 && (
          <button
            className="btn border"
            style={{ marginRight: 8 }}
            onClick={handlePrev}
          >
            <ArrowLeftOutlined />
          </button>
        )}
        {currentSlide < 2 ? (
          <button className="btn btn-primary " onClick={handleNext}>
            Continue
          </button>
        ) : (
          <button
            className="btn btn-primary "
            onClick={() => navigate("/test")}
          >
            Get Started
          </button>
        )}
      </div>
    </>
  );
};

export default InstructionPage;