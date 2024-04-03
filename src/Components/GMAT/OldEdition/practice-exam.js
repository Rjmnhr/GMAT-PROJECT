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
import { useLocation } from "react-router-dom";
import QuantTestPageFocus from "../FocusEdition/quant-test-focus";
import VerbalTestPageFocus from "../FocusEdition/verbal-test-focus";
import DataInsightsTestPage from "../FocusEdition/data-insigts-test";
import {
  SectionDividerFocusDataInsights,
  SectionDividerFocusQuant,
  SectionDividerFocusVerbal,
} from "../FocusEdition/section-divider-focus";

// Main component to manage section order and rendering
const PracticeExam = () => {
  const sectionOrder = JSON.parse(sessionStorage.getItem("section-order"));
  const { currentSectionIndex, showInstruction, setShowInstruction } =
    useApplicationContext();
  const location = useLocation();
  const category = location.search.replace("?c=", "");
  let sections = {};

  if (category === "focus") {
    sections = {
      quant: {
        Component: QuantTestPageFocus,
        Instruction: SectionDividerFocusQuant,
      },
      verbal: {
        Component: VerbalTestPageFocus,
        Instruction: SectionDividerFocusVerbal,
      },
      ir: {
        Component: DataInsightsTestPage,
        Instruction: SectionDividerFocusDataInsights,
      },
    };
  } else {
    sections = {
      quant: { Component: QuantTestPage, Instruction: SectionDividerQuant },
      verbal: { Component: VerbalTestPage, Instruction: SectionDividerVerbal },
      ir: { Component: IRTestPage, Instruction: SectionDividerIR },
    };
  }

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
