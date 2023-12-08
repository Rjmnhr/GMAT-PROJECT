import React, { useEffect, useState } from "react";
import { Card, Form, Slider, Tooltip } from "antd";
import { BasicDetailsFormStyled } from "../basic-details/style";

import ReactSpeedometer from "react-d3-speedometer";
function getThresholdValue(category) {
  switch (category?.toLowerCase()) {
    case "top5":
      return 100;
    case "top10":
      return 80;
    case "top30":
      return 60;
    case "average":
      return 40;
    case "bottom50":
      return 0;
    default:
      return 0; // You can decide what to return for other cases or handle them differently
  }
}

const Speedometer = ({ setSelectedPerformance }) => {
  const [sliderValue, setSliderValue] = useState(
    getThresholdValue(
      JSON.parse(sessionStorage.getItem("graduate"))?.yourPerformance
    )
  ); // Initial slider value (below average)

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setSelectedPerformance(calculatePerformance()?.value);
  };

  const calculatePerformance = () => {
    if (sliderValue >= 80) {
      return {
        value: "top5",
        label: "Top 5%",
        description: "High Distinction",
      };
    } else if (sliderValue >= 60) {
      return {
        value: "top10",
        label: "Top 10%",
        description: "Distinction",
      };
    } else if (sliderValue >= 40) {
      return {
        value: "top30",
        label: "Top 30%",
        description: "Credit",
      };
    } else if (sliderValue >= 20) {
      return {
        value: "average",
        label: "Average",
        description: "Average",
      };
    } else {
      return {
        value: "bottom50",
        label: "Bottom 50%",
        description: "Below Average",
      };
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          width: `300px`,
          height: `auto`,
          color: "#000",
          border: "0.5px solid #fff",
          padding: "2px",
        }}
      >
        <ReactSpeedometer
          height={190}
          width={290}
          value={sliderValue}
          maxValue={100}
          needleColor="blue"
          startColor="red"
          segments={5}
          endColor="green"
          currentValueText={calculatePerformance()?.label}
          customSegmentLabels={[
            {
              text: "Below ",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "14px",
            },
            {
              text: "Average",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "14px",
            },
            {
              text: "Top 30",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "14px",
            },
            {
              text: "Top 10",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "14px",
            },
            {
              text: "Top 5",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "14px",
            },
          ]}
        />
        <div>
          <Slider
            style={{ width: "300px" }}
            value={sliderValue}
            onChange={handleSliderChange}
            min={0}
            max={100}
            step={20}
            tipFormatter={null}
          />
        </div>
      </div>
    </div>
  );
};

// const SpeedometerCollegeType = ({ selectedCollegeType }) => {
//   const [sliderValue, setSliderValue] = useState(
//     getThresholdValue(JSON.parse(sessionStorage.getItem("type"))?.type)
//   ); // Initial slider value (below average)

//   const handleSliderChange = (value) => {
//     setSliderValue(value);
//     selectedCollegeType(calculateType()?.value);
//   };

//   const calculateType = () => {
//     if (sliderValue >= 75) {
//       return {
//         value: "premier",
//         label: "Premier",
//         description: "Top 10-15 in your field of specialization",
//       };
//     } else if (sliderValue >= 50) {
//       return {
//         value: "selective",
//         label: "Selective",
//         description: "Selective/hard to get into",
//       };
//     } else if (sliderValue >= 25) {
//       return {
//         value: "recognized",
//         label: "Recognized",
//         description: "Recognized within the state and entry is restrictive",
//       };
//     } else {
//       return {
//         value: "new",
//         label: "New",
//         description:
//           "New/relatively easy to get in/significant quotas in place",
//       };
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <div
//         style={{
//           display: "inline-block",
//           width: `300px`,
//           height: `auto`,
//           color: "#000",
//           border: "0.5px solid #fff",
//           padding: "2px",
//         }}
//       >
//         <ReactSpeedometer
//           height={190}
//           width={290}
//           value={sliderValue}
//           maxValue={100}
//           needleColor="blue"
//           startColor="red"
//           segments={4}
//           endColor="green"
//           currentValueText={calculateType()?.label}
//           customSegmentLabels={[
//             {
//               text: "New ",
//               position: "OUTSIDE",
//               color: "#555",
//               fontSize: "14px",
//             },
//             {
//               text: "Recognized",
//               position: "OUTSIDE",
//               color: "#555",
//               fontSize: "14px",
//             },
//             {
//               text: "Selective",
//               position: "OUTSIDE",
//               color: "#555",
//               fontSize: "14px",
//             },
//             {
//               text: "Premier",
//               position: "OUTSIDE",
//               color: "#555",
//               fontSize: "14px",
//             },
//           ]}
//         />
//         <div>
//           <Slider
//             style={{ width: "300px" }}
//             value={sliderValue}
//             onChange={handleSliderChange}
//             min={0}
//             max={100}
//             step={20}
//             tipFormatter={null}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

const CollegeTypeOptions = [
  {
    value: "premier",
    label: "Premier",
    description: "Top 10-15 in your field of specialization",
  },
  {
    value: "selective",
    label: "Selective",
    description: "Selective/hard to get into",
  },
  {
    value: "recognized",
    label: "Recognized",
    description: "Recognized within the state and entry is restrictive",
  },
  {
    value: "new",
    label: "New",
    description: "New/relatively easy to get in/significant quotas in place",
  },
];

// const PerformanceOptions = [
//   {
//     value: "top5",
//     label: "Top 5%",
//     description: "High Distinction",
//   },
//   {
//     value: "top10",
//     label: "Top 10%",
//     description: "Distinction",
//   },
//   {
//     value: "top30",
//     label: "Top 30%",
//     description: "Credit",
//   },
//   {
//     value: "average",
//     label: "Average",
//     description: "Average",
//   },
//   {
//     value: "bottom50",
//     label: "Bottom 50%",
//     description: "Below Average",
//   },
// ];

const UndergraduateDegreeForm = ({ onUpdateProgress, onFormValidation }) => {
  const [selectedCollegeType, setSelectedCollegeType] = useState(
    JSON.parse(sessionStorage.getItem("graduate"))?.collegeType
  );
  const [selectedPerformance, setSelectedPerformance] = useState(
    JSON.parse(sessionStorage.getItem("graduate"))?.yourPerformance
  );

  useEffect(() => {
    // Store default values in session storage when the component is rendered for the first time
    const defaultValues = {
      collegeType: "premier",
      yourPerformance: "top5",
    };
    sessionStorage.setItem("graduate-default", JSON.stringify(defaultValues));

    // Set form values based on the default values
  }, []);

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      collegeType: selectedCollegeType,
      yourPerformance: selectedPerformance,
    };
    sessionStorage.setItem("graduate", JSON.stringify(formValues));
    const nonEmptyCount = [selectedCollegeType, selectedPerformance].filter(
      Boolean
    ).length;

    onUpdateProgress("graduate", nonEmptyCount);
    onFormValidation("graduate", 4);
    //eslint-disable-next-line
  }, [selectedCollegeType, selectedPerformance]);

  const handleCardClick = (key, value) => {
    if (key === "collegeType") {
      setSelectedCollegeType(value);
    } else if (key === "yourPerformance") {
      setSelectedPerformance(value);
    }
  };

  return (
    <>
      <BasicDetailsFormStyled>
        <div className=" container col-lg-8">
          <Form>
            <div className="d-lg-flex align-items-start justify-content-between">
              <div>
                <h5 className="text-left mb-3">Your performance </h5>
                {/* <div className="college-cards">
              {PerformanceOptions.map((option) => (
                <Tooltip title={option.description} key={option.value}>
                  <Card
                    className={`college-card ${
                      selectedPerformance === option.value
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() =>
                      handleCardClick("yourPerformance", option.value)
                    }
                  >
                    <p>{option.label}</p>
                  </Card>
                </Tooltip>
              ))}
            </div> */}
                <Speedometer setSelectedPerformance={setSelectedPerformance} />
              </div>
              <div>
                <h5 className="text-left mb-3">College type </h5>
                <div className="d-flex d-lg-block justify-content-start flex-wrap mb-2">
                  {CollegeTypeOptions.map((option) => (
                    <Tooltip title={option.description} key={option.value}>
                      <Card
                        className={`college-card ${
                          selectedCollegeType === option.value
                            ? "selected-card"
                            : ""
                        }`}
                        onClick={() =>
                          handleCardClick("collegeType", option.value)
                        }
                      >
                        <p>{option.label}</p>
                      </Card>
                    </Tooltip>
                  ))}
                </div>
                {/* <SpeedometerCollegeType
                  setSelectedCollegeType={setSelectedCollegeType}
                /> */}
              </div>
            </div>
          </Form>
        </div>
      </BasicDetailsFormStyled>
    </>
  );
};

export default UndergraduateDegreeForm;
