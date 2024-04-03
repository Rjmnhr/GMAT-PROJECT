import React, { useEffect, useState } from "react";
import { Carousel, Radio } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  gmat_dashboard_path,
  gmat_practice_exam_path,
} from "../../../Config/config";
import { useApplicationContext } from "../../../Context/app-context";

const InstructionPage = () => {
  const [dotPosition, setDotPosition] = useState("top");
  const [carouselRef, setCarouselRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const { setCurrentSectionIndex, setShowInstruction } =
    useApplicationContext();

  useEffect(() => {
    sessionStorage.setItem("currentSectionIndex", 0);
    setCurrentSectionIndex(0);
    //eslint-disable-next-line
  }, []);
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

  const handleClick = () => {
    sessionStorage.removeItem("quant_score");
    sessionStorage.removeItem("quant_wrong_questions");
    sessionStorage.removeItem("ir_score");
    sessionStorage.removeItem("verbal_score");
    sessionStorage.removeItem("verbal_correct_questions");
    sessionStorage.removeItem("quant_correct_questions");
    sessionStorage.removeItem("practice_3_data");
    sessionStorage.removeItem("verbal_time_spend");
    sessionStorage.removeItem("ir_correct_questions");
    sessionStorage.removeItem("verbal_wrong_questions");
    sessionStorage.removeItem("time_remaining");
    sessionStorage.removeItem("ir_time_spend");
    sessionStorage.removeItem("practice_exam_section");
    sessionStorage.removeItem("order-count");
    sessionStorage.removeItem("practice_1_data");
    sessionStorage.removeItem("ir_wrong_questions");
    sessionStorage.removeItem("quant_time_spend");
    sessionStorage.removeItem("GMAT_Score");
    sessionStorage.removeItem("practice_2_data");
    sessionStorage.setItem("current_section", selectedOrder[0]);
    setShowInstruction(true);
    navigate(gmat_practice_exam_path);
  };
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "1") {
      const order = ["quant", "verbal", "ir"];
      setSelectedOrder(order);
      sessionStorage.setItem("section-order", JSON.stringify(order));
    } else if (value === "2") {
      const order = ["verbal", "quant", "ir"];
      setSelectedOrder(order);
      sessionStorage.setItem("section-order", JSON.stringify(order));
    } else {
      const order = ["ir", "quant", "verbal"];
      setSelectedOrder(order);
      sessionStorage.setItem("section-order", JSON.stringify(order));
    }

    sessionStorage.setItem("section-order-choice", value);
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
          <div className="section-title">
            <h2 className="mb-5">Introduction</h2>
          </div>

          <p className="mb-3 text-left fs-4 ">
            This practice exam is designed to help you prepare for the GMAT
            (Graduate Management Admission Test). Please read these instructions
            carefully before you begin.
          </p>
          <p className="mb-3 text-left fs-4">
            The GMAT consists of four main sections: Analytical Writing
            Assessment (AWA), Integrated Reasoning (IR), Quantitative Reasoning,
            and Verbal Reasoning. In this practice exam, you will have the
            opportunity to practice questions from Quantitative, Verbal and
            Integrated Reasoning sections.
          </p>
          <p className="mb-3 text-left fs-4">
            The GMAT allows you to choose the order in which you take the
            sections. You can start with either the Analytical Writing
            Assessment (AWA) or Integrated Reasoning (IR) section, followed by
            Quantitative Reasoning and Verbal Reasoning. For this practice exam,
            we will follow the default order: Quantitative Reasoning followed by
            Verbal Reasoning.
          </p>
        </div>
        <div className="container p-3 ">
          <div className="section-title">
            <h2 className="mb-5">Instructions</h2>
          </div>
          <p className="mb-3 text-left fs-4">
            This practice exam is timed to simulate the real GMAT test
            conditions. Make sure to manage your time effectively for each
            question.
          </p>
          <p className="mb-3 text-left fs-4">
            The Quantitative Reasoning section consists of questions that assess
            your ability to solve quantitative problems, while the Verbal
            Reasoning section evaluates your reading comprehension and critical
            reasoning skills.
          </p>
          <p className="mb-3 text-left fs-4">
            Use the "Next" button to move to the next question. Careful in this
            practice exam once you answer the question and move to the next
            question you can't go back to the previous question
          </p>
          <p className="mb-3 text-left fs-4">
            For multiple-choice questions, select the answer choice by clicking
            the radio button next to your chosen answer. For quantitative
            questions, enter your numerical answer in the provided text box.
          </p>
          <p className="mb-3 text-left fs-4">
            You may use scratch paper or a virtual whiteboard if it's allowed in
            your real GMAT test. Ensure you have it ready before starting the
            exam.
          </p>
        </div>

        <div className="container p-3 ">
          <div className="section-title">
            <h2 className="mb-5">Instructions</h2>
          </div>
          <p className="mb-3 text-left fs-4">
            When you have completed all the questions, click the "Finish"
            button. You will receive a summary of your performance.
          </p>
          <p className="mb-3 text-left fs-4">
            This practice exam does not provide an official GMAT score. Use it
            as a tool to assess your readiness and identify areas for
            improvement.
          </p>
          <p className="mb-3 text-left fs-4">
            After completing the practice exam, review your performance to
            understand your strengths and weaknesses. Focus on areas where you
            need improvement during your GMAT preparation.
          </p>
          <p className="mb-3 text-left fs-4">
            For comprehensive GMAT preparation, consider using official GMAT
            study materials and practice tests provided by the Graduate
            Management Admission Council (GMAC).
          </p>
          <p className="mb-3 text-left fs-4">
            If you encounter any technical issues during the practice exam,
            please reach out to our support team for assistance.
          </p>

          <p className="mb-3 text-left fs-4">
            Your practice exam data is kept confidential and will not be shared
            with any third parties.
          </p>
          <p className="mb-3 text-left fs-4">
            Note: This practice exam is not an official GMAT test and is
            intended solely for practice purposes. Your performance on this
            practice exam may not reflect your actual GMAT score. Use it as a
            learning tool to gauge your readiness for the real GMAT exam.
          </p>

          <p style={{ fontWeight: "bold" }} className="fs-4 text-left">
            Best of luck with your GMAT preparation! Remember that practice and
            diligent study will help you achieve your target score.
          </p>
        </div>
        <div className="container p-3 ">
          <div className="section-title">
            <h2>Section Ordering</h2>
          </div>

          <p
            style={{ fontSize: "18px", fontWeight: "bold" }}
            className="mb-3 text-left fs-4"
          >
            Select the order in which the exam sections are to be administrated.
          </p>
          <p style={{ color: "red" }} className="mb-3 text-left fs-4">
            NOTE: On the actual GMAT exam you will have one (1) minute to make
            your selection. If you do not make your selection within one (1)
            minute, the first option listed will be selected and you will view
            the exam in the following order: Analytical Writing Assessment,
            Integrated Reasoning, Quantitative, Verbal. On this practice exam,
            you must make a selection to proceed.
          </p>
          <p className="mb-3 text-left fs-4">
            Once you select your section order, you must view ALL questions in
            each section, in the order you have selected, before moving on to
            the next section. You will NOT be able to return to this screen
          </p>
          <div style={{ display: "grid", placeItems: "center" }}>
            <div
              style={{ gap: "20px" }}
              className="container mt-3 text-left d-flex justify-content-start "
            >
              <div className="row align-items-start ">
                <input
                  type="radio"
                  value={1}
                  checked={selectedOption === "1"}
                  onChange={handleRadioChange}
                  style={{ marginRight: "8px", marginTop: "3px" }}
                />
                <label>
                  <span>1. Quantitative Reasoning</span>
                  <br />
                  <span>2. Verbal Reasoning</span> <br />
                  <span>3. Integrated Reasoning</span>
                  <br />
                </label>
              </div>
              <div className="row align-items-start ml-3 ">
                <input
                  type="radio"
                  value={2}
                  checked={selectedOption === "2"}
                  onChange={handleRadioChange}
                  style={{ marginRight: "8px", marginTop: "3px" }}
                />
                <label>
                  <span>1. Verbal Reasoning</span> <br />
                  <span>2. Quantitative Reasoning</span>
                  <br />
                  <span>3. Integrated Reasoning</span>
                  <br />
                </label>
              </div>
              <div className="row align-items-start ml-3 ">
                <input
                  type="radio"
                  value={3}
                  checked={selectedOption === "3"}
                  onChange={handleRadioChange}
                  style={{ marginRight: "8px", marginTop: "3px" }}
                />
                <label>
                  {" "}
                  <span>1. Integrated Reasoning</span>
                  <br />
                  <span>2. Quantitative Reasoning</span>
                  <br />
                  <span>3. Verbal Reasoning</span> <br />
                </label>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        {currentSlide === 0 && (
          <button
            className="btn border"
            style={{ marginRight: 8 }}
            onClick={() => navigate(gmat_dashboard_path)}
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
        {currentSlide < 3 ? (
          <button className="btn btn-primary " onClick={handleNext}>
            Continue
          </button>
        ) : (
          <button
            className="btn btn-primary "
            onClick={handleClick}
            disabled={!selectedOption}
          >
            Get Started
          </button>
        )}
      </div>
    </>
  );
};

export default InstructionPage;
