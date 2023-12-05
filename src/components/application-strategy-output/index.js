import React, { useEffect, useState } from "react";
import { ApplicationStrategyOutputStyled } from "./style";

const longTermDataSource = [
  {
    "Long term goal": "Own business",
    innovativeThinking: 4,
    problemSolving: 4,
    selfMotivated: 4,
    multiTasking: 4,
    seniorStakeholderManagement: 4,
    teamWork: 3,
    reportWriting: 4,
    excel: 3,
    strategy: 4,
    marketing: 4,
    finance: 2,
    technology: 2,
    hr: 2,
    operations: 2,
  },
  {
    "Long term goal": "General Manager",
    innovativeThinking: 2,
    problemSolving: 3,
    selfMotivated: 2,
    multiTasking: 4,
    seniorStakeholderManagement: 3,
    teamWork: 4,
    reportWriting: 4,
    excel: 3,
    strategy: 3,
    marketing: 3,
    finance: 2,
    technology: 2,
    hr: 2,
    operations: 2,
  },
  {
    "Long term goal": "CEO",
    innovativeThinking: 3,
    problemSolving: 3,
    selfMotivated: 3,
    multiTasking: 3,
    seniorStakeholderManagement: 4,
    teamWork: 2,
    reportWriting: 3,
    excel: 2,
    strategy: 4,
    marketing: 2,
    finance: 4,
    technology: 3,
    hr: 2,
    operations: 3,
  },
  {
    "Long term goal": "Partner",
    innovativeThinking: 3,
    problemSolving: 3,
    selfMotivated: 3,
    multiTasking: 3,
    seniorStakeholderManagement: 3,
    teamWork: 2,
    reportWriting: 4,
    excel: 2,
    strategy: 3,
    marketing: 4,
    finance: 3,
    technology: 2,
    hr: 2,
    operations: 2,
  },
];
const shortTermDataSource = [
  {
    "Short term goal": "Own business",
    innovativeThinking: 4,
    problemSolving: 4,
    selfMotivated: 4,
    multiTasking: 4,
    seniorStakeholderManagement: 4,
    teamWork: 3,
    reportWriting: 4,
    excel: 3,
    strategy: 4,
    marketing: 4,
    finance: 2,
    technology: 2,
    hr: 2,
    operations: 2,
  },
  {
    "Short term goal": "Product Manager",
    innovativeThinking: 3,
    problemSolving: 4,
    selfMotivated: 3,
    multiTasking: 3,
    seniorStakeholderManagement: 3,
    teamWork: 4,
    reportWriting: 4,
    excel: 2,
    strategy: 3,
    marketing: 2,
    finance: 3,
    technology: 2,
    hr: 2,
    operations: 3,
  },
  {
    "Short term goal": "Management Consulting",
    innovativeThinking: 2,
    problemSolving: 4,
    selfMotivated: 2,
    multiTasking: 4,
    seniorStakeholderManagement: 4,
    teamWork: 4,
    reportWriting: 4,
    excel: 3,
    strategy: 3,
    marketing: 2,
    finance: 2,
    technology: 2,
    hr: 3,
    operations: 2,
  },
  {
    "Short term goal": "Investment Banking",
    innovativeThinking: 2,
    problemSolving: 4,
    selfMotivated: 3,
    multiTasking: 2,
    seniorStakeholderManagement: 3,
    teamWork: 3,
    reportWriting: 3,
    excel: 4,
    strategy: 2,
    marketing: 2,
    finance: 4,
    technology: 2,
    hr: 2,
    operations: 2,
  },
  {
    "Short term goal": "Sales and marketing",
    innovativeThinking: 3,
    problemSolving: 3,
    selfMotivated: 3,
    multiTasking: 3,
    seniorStakeholderManagement: 3,
    teamWork: 3,
    reportWriting: 2,
    excel: 3,
    strategy: 2,
    marketing: 4,
    finance: 3,
    technology: 3,
    hr: 2,
    operations: 2,
  },
  {
    "Short term goal": "Senior Manager",
    innovativeThinking: 2,
    problemSolving: 3,
    selfMotivated: 3,
    multiTasking: 3,
    seniorStakeholderManagement: 2,
    teamWork: 4,
    reportWriting: 2,
    excel: 3,
    strategy: 2,
    marketing: 2,
    finance: 2,
    technology: 2,
    hr: 2,
    operations: 2,
  },
];

const skillData = {
  innovativeThinking: "Innovative thinking",
  problemSolving: "Problem Solving",
  selfMotivated: "Self Motivated",
  multiTasking: "Multi-tasking",
  seniorStakeholderManagement: "Complex and senior stakeholder Management",
  teamWork: "Team work",
  reportWriting: "Report Writing/Board papers",
  excel: "Excel",
  strategy: "Strategic",
  marketing: "Marketing",
  finance: "Finance",
  technology: "Technology",
  hr: "HR",
  operations: "Operations",
};

const storedGoalsInput = JSON.parse(
  sessionStorage.getItem("applicationGoalsInputObject")
);
const storedUserInputData = JSON.parse(
  sessionStorage.getItem("applicationSkillInputObject")
);

const ApplicationStrategyOutput = () => {
  const [longTermSkillsGapValues, setLongTermSkillsGapValues] = useState({});
  const [shortTermSkillsGapValues, setShortTermSkillsGapValues] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Find the matching long term goal data
    const selectedLongTermGoalData = longTermDataSource?.find(
      (goalData) =>
        goalData["Long term goal"] === storedGoalsInput.longTermGoals
    );

    if (selectedLongTermGoalData) {
      // Calculate the long term goal values
      const longTermGoalValues = {};
      for (const factor in storedUserInputData) {
        if (selectedLongTermGoalData.hasOwnProperty(factor)) {
          longTermGoalValues[factor] =
            selectedLongTermGoalData[factor] - storedUserInputData[factor];
        }
      }

      // Set the calculated skills gap values in the state
      setLongTermSkillsGapValues(longTermGoalValues);
    }
    //eslint-disable-next-line
  }, [storedUserInputData, storedGoalsInput, longTermDataSource]);

  useEffect(() => {
    // Find the matching short term goal data
    const selectedShortTermGoalData = shortTermDataSource?.find(
      (goalData) =>
        goalData["Short term goal"] === storedGoalsInput.shortTermGoals
    );

    if (selectedShortTermGoalData) {
      // Calculate the short term goal values
      const shortTermGoalValues = {};
      for (const factor in storedUserInputData) {
        if (selectedShortTermGoalData.hasOwnProperty(factor)) {
          sessionStorage.setItem("form-filled-application", true);
          shortTermGoalValues[factor] =
            selectedShortTermGoalData[factor] - storedUserInputData[factor];
        }
      }

      // Set the calculated skills gap values in the state
      setShortTermSkillsGapValues(shortTermGoalValues);
    }
    // eslint-disable-next-line
  }, [storedUserInputData, storedGoalsInput, shortTermDataSource]);
  const getColor = (value) => {
    switch (value) {
      case 1:
        return "#00aaa4"; // Already possess sufficient skill
      case 2:
        return "#f8a66e"; // Needs some improvement

      default:
        return "#cccccc"; // Default color
    }
  };

  // const convertObjectToArray = (skillsGapValues) => {
  //   return Object.entries(skillsGapValues).map(([factor, gap]) => ({
  //     factor,
  //     gap,
  //   }));
  // };
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <ApplicationStrategyOutputStyled>
      <div>
        <div>
          <h2 className="my-3">Application strategy</h2>
          <table className="skill-matrix">
            <thead>
              <tr>
                <th>The skills you need to develop </th>
                <th>Based on long term goals</th>
                <th>Based on short term goals</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(skillData).map(([skill, gap]) => (
                <tr key={skill}>
                  <td className="text-left">{gap}</td>
                  <td
                    style={{
                      backgroundColor: getColor(longTermSkillsGapValues[skill]),
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: getColor(
                        shortTermSkillsGapValues[skill]
                      ),
                    }}
                  ></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="legend container">
          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <div className="d-flex  mb-1 justify-content-lg-start justify-content-between align-items-center">
              <div
                style={{
                  backgroundColor: "#00aaa4",
                  width: "40px",
                  height: "20px",
                  display: "inline-block",
                }}
              ></div>
              <div
                style={{
                  marginLeft: "5px",
                  fontSize: `${isMobile ? "14px" : "18px"}`,
                }}
              >
                Needs some improvement
              </div>
            </div>
            <div className="d-flex mb-1 justify-content-lg-start justify-content-between align-items-center">
              <div
                style={{
                  backgroundColor: "#f8a66e",
                  width: "40px",
                  height: "20px",
                  display: "inline-block",
                }}
              ></div>
              <div
                style={{
                  marginLeft: "5px",
                  fontSize: `${isMobile ? "14px" : "18px"}`,
                }}
              >
                Needs significant improvement
              </div>
            </div>
            <div className="d-flex  mb-1 justify-content-lg-start justify-content-between align-items-center">
              <div
                style={{
                  backgroundColor: "#cccccc",
                  width: "40px",
                  height: "20px",
                  display: "inline-block",
                }}
              ></div>
              <div
                style={{
                  marginLeft: "5px",
                  fontSize: `${isMobile ? "14px" : "18px"}`,
                }}
              >
                Already possess sufficient skill
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApplicationStrategyOutputStyled>
  );
};

export default ApplicationStrategyOutput;
