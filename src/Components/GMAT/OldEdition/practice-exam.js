import React from "react";
import QuantTestPage from "./quant-test";
import VerbalTestPage from "./verbal-test";
import IRTestPage from "./IR-test";
import { useApplicationContext } from "../../../Context/app-context";
import {
  SectionDividerIR,
  SectionDividerQuant,
  SectionDividerVerbal,
} from "./section-divider";

// Main component to manage section order and rendering
const PracticeExam = () => {
  const sectionOrder = JSON.parse(sessionStorage.getItem("section-order"));
  const { currentSectionIndex, showInstruction, setShowInstruction } =
    useApplicationContext();

  const sections = {
    quant: { Component: QuantTestPage, Instruction: SectionDividerQuant },
    verbal: { Component: VerbalTestPage, Instruction: SectionDividerVerbal },
    ir: { Component: IRTestPage, Instruction: SectionDividerIR },
  };

  const handleStartTest = () => {
    setShowInstruction(false);
  };

  const CurrentComponent = showInstruction
    ? sections[sectionOrder[currentSectionIndex]].Instruction
    : sections[sectionOrder[currentSectionIndex]].Component;

  return (
    <div>
      <CurrentComponent />
      {showInstruction && (
        <button className="btn btn-primary btn-lg" onClick={handleStartTest}>
          Start Test
        </button>
      )}
    </div>
  );
};

export default PracticeExam;
