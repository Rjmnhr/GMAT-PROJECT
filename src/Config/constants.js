import { gmat_instructions_focus_path, gmat_instructions_path } from "./config";

export const practiceExams = [1, 2, 3];

export const practiceExamData = {
  title: "GMAT Practice Exam",
  totalQuestions: 79,
  totalTime: 157,
  max_score: 800,
  min_score: 200,
  instruction_path: gmat_instructions_path,
  section_1: {
    name: "Quantitative Reasoning",
    total_questions: 31,
    max_marks: 51,
    duration: "62 minutes",
  },
  section_2: {
    name: "Verbal Reasoning",
    total_questions: 32,
    max_marks: 51,
    duration: "65 minutes",
  },
  section_3: {
    name: "Integrated Reasoning",
    total_questions: 12,
    max_marks: 8,
    duration: "30 minutes",
  },
};

export const practiceExamDataFocus = {
  title: "GMAT Focus Edition",
  totalQuestions: 64,
  totalTime: 135,
  max_score: 805,
  min_score: 205,
  instruction_path: gmat_instructions_focus_path,
  section_1: {
    name: "Quantitative Reasoning",
    total_questions: 21,
    max_marks: 90,
    duration: "45 minutes",
  },
  section_2: {
    name: "Verbal Reasoning",
    total_questions: 23,
    max_marks: 90,
    duration: "45 minutes",
  },
  section_3: {
    name: "Data Insights",
    total_questions: 20,
    max_marks: 90,
    duration: "45 minutes",
  },
};
