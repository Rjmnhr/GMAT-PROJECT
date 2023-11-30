import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import { ChancesOfSelectionStyled } from "./style";
import AxiosInstance from "../../components/axios";
import { LoadingOutlined } from "@ant-design/icons";
import SelectionOutput from "../../components/selection-output";

import PreferenceAndGoalsPage from "../prefernece_and_goals_page";
// import sticker from "../../icons/businessman.png";

// const BarChartExample = ({ data }) => {
//   const categories = ["Top 10", "11-20", "21-40", "41-60", "61-80", "81-100"];

//   const getColor = (value) => {
//     if (value < 0.3) {
//       return "#f74a64"; // Light red for values less than 0.3
//     } else if (value >= 0.3 && value <= 0.5) {
//       return "#97c8d9"; // Light orange for values between 0.3 and 0.5
//     } else {
//       return "#99ff99"; // Light green for values greater than 0.5
//     }
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         layout="vertical"
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis type="number" tickFormatter={(value) => `${value}%`} />
//         <YAxis dataKey="factor" type="category" />
//         <Tooltip formatter={(value) => `${value}%`} />
//         <Legend />
//         {categories.map((category, index) => (
//           <Bar
//             key={category}
//             dataKey={`values[${index}]`}
//             stackId="a"
//             fill={getColor(data[index].values[index])}
//             name={category} // Added to display category names in the legend
//           />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

const ChancesOfSelection = () => {
  const storedBasicDetails = JSON.parse(
    sessionStorage.getItem("basic-details")
  );
  const storedGraduate = JSON.parse(sessionStorage.getItem("graduate"));
  const storedWorkExperience = JSON.parse(sessionStorage.getItem("experience"));
  const storedNatureExperience = JSON.parse(
    sessionStorage.getItem("natureExperience")
  );
  const storedExperience = {
    ...storedWorkExperience,
    ...storedNatureExperience,
  };
  const storedService = JSON.parse(sessionStorage.getItem("service"));
  const storedHobbies = JSON.parse(sessionStorage.getItem("hobbies"));
  const [gmatObtained, setGmatObtained] = useState(0);
  const [graduateObtained, setGraduateObtained] = useState(0);
  const [workExperienceObtained, setWorkExperienceObtained] = useState(0);
  const [leadershipExperienceObtained, setLeadershipExperienceObtained] =
    useState(0);
  const [commercialExperienceObtained, setCommercialExperienceObtained] =
    useState(0);
  const [extraCurricularObtained, setExtraCurricularObtained] = useState(0);
  const [hobbiesObtained, setHobbiesObtained] = useState(0);
  const [selectedTab, setSelectedTab] = useState("selection");
  const [activeIndex, setActiveIndex] = useState(0);

  // State variable to hold the data array
  const [data, setData] = useState([]);
  const [totalValues, setTotalValues] = useState([]);

  // Percentage values for GMAT ranges
  const gmatPercentageValues = {
    "≥750": 45,
    "≥720": 35,
    "≥700": 25,
    "≥680": 15,
    "≥650": 10,
    "≥620": 5,
    "<620": 5,
  };

  // Function to calculate individual value for GMAT
  const calculateGMATIndividualValue = (userGMAT) => {
    // Get the percentage value for the user's GMAT range
    const value = gmatPercentageValues[userGMAT];
    sessionStorage.setItem("gmat_value", value);
    setGmatObtained(value);

    const percentageValue = value / 45;

    // If the GMAT range is not found, default to 0
    return percentageValue || 0;
  };

  const calculateGraduateIndividualValue = (valueObject) => {
    const valueMappingsCollegeType = {
      premier: 4,
      selective: 3,
      recognized: 2,
      new: 1,
    };

    const valueMappingsPerformance = {
      top5: 3,
      top10: 2.5,
      top30: 2,
      average: 1.5,
      bottom50: 1,
    };

    const CollegeValue = valueMappingsCollegeType[valueObject.collegeType];

    const PerformanceValue =
      valueMappingsPerformance[valueObject.yourPerformance];
    sessionStorage.setItem("graduate_performance", PerformanceValue);
    const value = CollegeValue * PerformanceValue;
    setGraduateObtained(value);

    const graduateValue = value / 12;

    // If the GMAT range is not found, default to 0
    return graduateValue || 0;
  };

  const calculateServiceIndividualValue = (valueObject) => {
    const valueMappingsActivityNature = {
      international: 2,
      national: 1,
      stateWide: 0.5,
      localised: 0.25,
    };

    const valueMappingContribution = {
      leading: 5,
      regular: 4,
      sometimes: 2,
      rarely: 1,
    };

    const valueMappingInvolvement = {
      "<1": 0.5,
      "<2": 1,
      "<3": 3,
      "<5": 4,
      ">=5": 5,
    };

    const activityValue =
      valueMappingsActivityNature[valueObject.natureOfActivity];
    const contributionValue =
      valueMappingContribution[valueObject.levelOfContribution];
    const involvementValue =
      valueMappingInvolvement[valueObject.yearsOfInvolvement];

    const value = activityValue + contributionValue + involvementValue;
    setExtraCurricularObtained(value);
    const serviceValue = value / 12;
    // If the GMAT range is not found, default to 0
    return serviceValue || 0;
  };

  const calculateHobbiesIndividualValue = (valueObject) => {
    const valueMappingsActivityNature = {
      teaching: 1,
      selfLearning: 0.5,
      theatre: 0.5,
      sportsMusicArts: 0.25,
    };

    const valueMappingLevel = {
      international: 5,
      national: 4,
      state: 3,
      smallGroups: 1,
    };

    const valueMappingInvolvement = {
      "<1": 0.5,
      "<2": 1,
      "<3": 3,
      "<5": 4,
      ">=5": 5,
    };

    const activityValue =
      valueMappingsActivityNature[valueObject.natureOfActivity];
    const levelValue = valueMappingLevel[valueObject.levelOfExpertise];
    const involvementValue =
      valueMappingInvolvement[valueObject.yearsOfInvolvement];

    const value = activityValue + levelValue + involvementValue;
    setHobbiesObtained(value);
    const hobbiesValue = value / 11;
    // If the GMAT range is not found, default to 0
    return hobbiesValue || 0;
  };

  const calculateExperienceIndividualValue = (valueObject) => {
    const valueMappingsProductOrService = {
      Product: 2,
      Services: 1,
    };

    const valueMappingsMultiNationalCompany = {
      oneLocation: 1,
      multipleLocations: 2,
      multipleContinents: 3.5,
    };

    const valueMappingsCompanySize = {
      "<1000": 1,
      "<5000": 1.25,
      "<10000": 1.5,
      "≥10000": 2,
    };

    const valueMappingsNonTechnicalITIndividual = {
      "<1": 0,
      "1-3": 0.5,
      "3-5": 1,
      ">=5": 1.5,
      "N/A": 0,
    };

    const valueMappingsNonTechnicalHRIndividual = {
      "<1": 0.5,
      "1-3": 1,
      "3-5": 1.5,
      ">=5": 2,
      "N/A": 0,
    };

    const valueMappingsCommercialTechnicalIndividual = {
      "<1": 1,
      "1-3": 1.5,
      "3-5": 2,
      ">=5": 2.5,
      "N/A": 0,
    };

    const valueMappingsCommercialGeneralistIndividual = {
      "<1": 1.5,
      "1-3": 2,
      "3-5": 2.5,
      ">=5": 3,
      "N/A": 0,
    };

    //-----------------------------------------------------------------------------------

    const valueMappingsNonTechnicalITSupervisory = {
      "<1": 1,
      "1-2": 1.5,
      "2-3": 2,
      ">=3": 2.5,
      "N/A": 0,
    };

    const valueMappingsNonTechnicalHRSupervisory = {
      "<1": 1.5,
      "1-2": 2,
      "2-3": 2.5,
      ">=3": 3,
      "N/A": 0,
    };

    const valueMappingsCommercialTechnicalSupervisory = {
      "<1": 2,
      "1-2": 2.5,
      "2-3": 3,
      ">=3": 3.5,
      "N/A": 0,
    };

    const valueMappingsCommercialGeneralistSupervisory = {
      "<1": 2.5,
      "1-2": 3,
      "2-3": 3.5,
      ">=3": 4,
      "N/A": 0,
    };

    //-----------------------------------------------------------------------------------

    const valueMappingsNonTechnicalITLeadership = {
      "<1": 2,
      "1-2": 2.5,
      "2-3": 3,
      ">=3": 3.5,
      "N/A": 0,
    };

    const valueMappingsNonTechnicalHRLeadership = {
      "<1": 2.5,
      "1-2": 3,
      "2-3": 3.5,
      ">=3": 4,
      "N/A": 0,
    };

    const valueMappingsCommercialTechnicalLeadership = {
      "<1": 3,
      "1-2": 3.5,
      "2-3": 4,
      ">=3": 4.5,
      "N/A": 0,
    };

    const valueMappingsCommercialGeneralistLeadership = {
      "<1": 3.5,
      "1-2": 4,
      "2-3": 4.5,
      ">=3": 5,
      "N/A": 0,
    };

    const generalMappings = {
      "<1": 0.6,
      "1-2": 1.5,
      "1-3": 2,
      "2-3": 2.5,
      ">=3": 4,
      "3-5": 4,
      ">=5": 6,
      "N/A": 0.6,
    };

    const productOrServiceValue =
      valueMappingsProductOrService[valueObject.productServices];
    const multiNationalCompanyValue =
      valueMappingsMultiNationalCompany[valueObject.multiNationalCompany];
    const companySizeValue = valueMappingsCompanySize[valueObject.companySize];

    const nonTechnicalITIndividualValue =
      valueMappingsNonTechnicalITIndividual[
        valueObject["1_individualContributor"]
      ];
    const nonTechnicalITIndividualValueGeneral =
      generalMappings[valueObject["1_individualContributor"]];
    const nonTechnicalHRIndividualValue =
      valueMappingsNonTechnicalHRIndividual[
        valueObject["2_individualContributor"]
      ];
    const nonTechnicalHRIndividualValueGeneral =
      generalMappings[valueObject["2_individualContributor"]];
    const commercialTechnicalIndividualValue =
      valueMappingsCommercialTechnicalIndividual[
        valueObject["3_individualContributor"]
      ];
    const commercialTechnicalIndividualValueGeneral =
      generalMappings[valueObject["3_individualContributor"]];
    const commercialGeneralistIndividualValue =
      valueMappingsCommercialGeneralistIndividual[
        valueObject["4_individualContributor"]
      ];
    const commercialGeneralistIndividualValueGeneral =
      generalMappings[valueObject["4_individualContributor"]];
    const nonTechnicalITSupervisoryValue =
      valueMappingsNonTechnicalITSupervisory[valueObject["1_supervisory"]];
    const nonTechnicalITSupervisoryValueGeneral =
      generalMappings[valueObject["1_supervisory"]];
    const nonTechnicalHRSupervisoryValue =
      valueMappingsNonTechnicalHRSupervisory[valueObject["2_supervisory"]];
    const nonTechnicalHRSupervisoryValueGeneral =
      generalMappings[valueObject["2_supervisory"]];
    const commercialTechnicalSupervisoryValue =
      valueMappingsCommercialTechnicalSupervisory[valueObject["3_supervisory"]];
    const commercialTechnicalSupervisoryValueGeneral =
      generalMappings[valueObject["3_supervisory"]];
    const commercialGeneralistSupervisoryValue =
      valueMappingsCommercialGeneralistSupervisory[
        valueObject["4_supervisory"]
      ];
    const commercialGeneralistSupervisoryValueGeneral =
      generalMappings[valueObject["4_supervisory"]];

    const nonTechnicalITLeadershipValue =
      valueMappingsNonTechnicalITLeadership[
        valueObject["1_leadershipManagerial"]
      ];
    const nonTechnicalITLeadershipValueGeneral =
      generalMappings[valueObject["1_leadershipManagerial"]];
    const nonTechnicalHRLeadershipValue =
      valueMappingsNonTechnicalHRLeadership[
        valueObject["2_leadershipManagerial"]
      ];
    const nonTechnicalHRLeadershipValueGeneral =
      generalMappings[valueObject["2_leadershipManagerial"]];
    const commercialTechnicalLeadershipValue =
      valueMappingsCommercialTechnicalLeadership[
        valueObject["3_leadershipManagerial"]
      ];
    const commercialTechnicalLeadershipValueGeneral =
      generalMappings[valueObject["3_leadershipManagerial"]];
    const commercialGeneralistLeadershipValue =
      valueMappingsCommercialGeneralistLeadership[
        valueObject["4_leadershipManagerial"]
      ];
    const commercialGeneralistLeadershipValueGeneral =
      generalMappings[valueObject["4_leadershipManagerial"]];

    const totalGeneralValue =
      nonTechnicalITIndividualValueGeneral +
      nonTechnicalHRIndividualValueGeneral +
      commercialTechnicalIndividualValueGeneral +
      commercialGeneralistIndividualValueGeneral +
      nonTechnicalITSupervisoryValueGeneral +
      nonTechnicalHRSupervisoryValueGeneral +
      commercialTechnicalSupervisoryValueGeneral +
      commercialGeneralistSupervisoryValueGeneral +
      nonTechnicalITLeadershipValueGeneral +
      nonTechnicalHRLeadershipValueGeneral +
      commercialTechnicalLeadershipValueGeneral +
      commercialGeneralistLeadershipValueGeneral;
    sessionStorage.setItem("experience_general_value", totalGeneralValue);
    const nonTechnicalITTotal =
      nonTechnicalITIndividualValue +
      nonTechnicalITSupervisoryValue +
      nonTechnicalITLeadershipValue;

    const nonTechnicalHRTotal =
      nonTechnicalHRIndividualValue +
      nonTechnicalHRSupervisoryValue +
      nonTechnicalHRLeadershipValue;
    const commercialTechnicalTotal =
      commercialTechnicalIndividualValue +
      commercialTechnicalSupervisoryValue +
      commercialTechnicalLeadershipValue;
    const commercialGeneralistTotal =
      commercialGeneralistIndividualValue +
      commercialGeneralistSupervisoryValue +
      commercialGeneralistLeadershipValue;

    // Array of total values
    const totalValues = [
      nonTechnicalITTotal,
      nonTechnicalHRTotal,
      commercialTechnicalTotal,
      commercialGeneralistTotal,
    ];

    // Find the maximum value
    const maxValue = Math.max(...totalValues);

    const describeTheCompanyValue =
      productOrServiceValue * multiNationalCompanyValue * companySizeValue;

    const supervisoryValueArr = [
      nonTechnicalITSupervisoryValue,
      nonTechnicalHRSupervisoryValue,
      commercialTechnicalSupervisoryValue,
      commercialGeneralistSupervisoryValue,
    ];
    const maxSupervisoryValue = Math.max(...supervisoryValueArr);
    const leadershipValueArr = [
      nonTechnicalITLeadershipValue,
      nonTechnicalHRLeadershipValue,
      commercialTechnicalLeadershipValue,
      commercialGeneralistLeadershipValue,
    ];
    const maxLeadershipValue = Math.max(...leadershipValueArr);

    const maxIndividualCommercialExperience = Math.max(
      commercialGeneralistIndividualValue,
      commercialTechnicalIndividualValue
    );
    const maxSupervisoryCommercialExperience = Math.max(
      commercialGeneralistSupervisoryValue,
      commercialTechnicalSupervisoryValue
    );
    const maxLeadershipCommercialExperience = Math.max(
      commercialGeneralistLeadershipValue,
      commercialTechnicalLeadershipValue
    );

    const commercialExperience =
      maxLeadershipCommercialExperience +
      maxSupervisoryCommercialExperience +
      maxIndividualCommercialExperience;

    const leadershipExperience = maxSupervisoryValue * maxLeadershipValue;

    const workExperience = describeTheCompanyValue + maxValue * 2;

    setWorkExperienceObtained(workExperience);
    setLeadershipExperienceObtained(leadershipExperience);
    setCommercialExperienceObtained(commercialExperience);
    const workExperiencePercentage = workExperience / 38;
    const leadershipExperiencePercentage = leadershipExperience / 20;
    const commercialExperiencePercentage = commercialExperience / 12;

    return {
      workExperiencePercentage,
      leadershipExperiencePercentage,
      commercialExperiencePercentage,
    };
  };

  // Sample factor names for creating the 'data' array
  const factorNames = [
    "GMAT",
    "Undergraduate",
    "Work experience",
    "Leadership experience",
    "Commercial experience",
    "Extra-curricular",
    "Hobbies",
  ];

  useEffect(() => {
    const gmatIndividualValue = calculateGMATIndividualValue(
      storedBasicDetails.gmat
    );

    const graduateIndividualValue =
      calculateGraduateIndividualValue(storedGraduate);

    const serviceIndividualValue =
      calculateServiceIndividualValue(storedService);
    const hobbiesIndividualValue =
      calculateHobbiesIndividualValue(storedHobbies);
    const experienceIndividualValue =
      calculateExperienceIndividualValue(storedExperience);

    // Example array of factor values
    const factorValues = [
      gmatIndividualValue,
      graduateIndividualValue,
      experienceIndividualValue?.workExperiencePercentage,
      experienceIndividualValue?.leadershipExperiencePercentage,
      experienceIndividualValue?.commercialExperiencePercentage,
      serviceIndividualValue,
      hobbiesIndividualValue,
    ];

    // Function to fetch data for a single factor
    const fetchDataForFactor = async (factorValue) => {
      try {
        const response = await AxiosInstance.post("/api/profiler/individual", {
          score: factorValue,
        });
        // Exclude the value associated with the key 'score'
        return response.data;
      } catch (error) {
        console.error(`Error fetching data for factor ${factorValue}:`, error);
        return null;
      }
    };

    // Fetch data for all factors in parallel
    const fetchResponses = async () => {
      const responses = await Promise.all(factorValues.map(fetchDataForFactor));
      // Filter out null responses (failed API calls)
      const validResponses = responses.filter((response) => response !== null);

      // Create a new 2D array of objects without the "score" key-value pair
      const newArray = validResponses.map((innerArray) => {
        return innerArray.map((obj) => {
          // Destructure the object to get a copy without the "Score" key
          const { Score, ...newObj } = obj;
          return newObj;
        });
      });

      // Update the 'data' array based on API responses
      const updatedData = newArray.map((response, index) => ({
        factor: factorNames[index],
        values: response.map((obj) => Object.values(obj))[0],
      }));

      // Set the updated 'data' array in the state
      setData(updatedData);
    };

    // Call the function to fetch data
    fetchResponses();
    //eslint-disable-next-line
  }, []); // Ensure useEffect runs when factorValues change

  useEffect(() => {
    if (data.length > 1) {
      const totalScore =
        gmatObtained +
        graduateObtained +
        workExperienceObtained +
        leadershipExperienceObtained +
        commercialExperienceObtained +
        extraCurricularObtained +
        hobbiesObtained;

      AxiosInstance.post(
        "/api/profiler/total",
        {
          total: totalScore / 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => {
          const response = await res.data;
          const newArray = response.map((obj) => {
            // Destructure the object to get a copy without the "Score" key
            const { Score, ...newObj } = obj;
            return newObj;
          });
          assignCategories(newArray);
          const convertedArray = newArray.map((obj) => {
            // Extract values from the object and return as an array
            return Object.values(obj);
          });

          setTotalValues(...convertedArray);
        })
        .catch((err) => console.log(err));
    }

    //eslint-disable-next-line
  }, [data]);

  const assignCategories = (data) => {
    const sortedArray = Object.entries(data[0]).sort((a, b) => b[1] - a[1]);

    let safeCategory = "";
    let achievableCategory = "";
    let stretchCategory = "";

    for (const [key, value] of Object.entries(data[0])) {
      if (value === 0.7) {
        safeCategory = key;
        break;
      }
    }

    if (!safeCategory) {
      // If no 0.7 value, consider the highest value
      safeCategory = sortedArray[0][0];
    }

    const indexOfSafe = Object.keys(data[0]).indexOf(safeCategory);

    if (indexOfSafe > 0) {
      achievableCategory = Object.keys(data[0])[indexOfSafe - 1];
    }

    if (indexOfSafe > 1) {
      stretchCategory = Object.keys(data[0])[indexOfSafe - 2];
    }

    // Here you can use the assigned categories (safeCategory, achievableCategory, stretchCategory)
    sessionStorage.setItem("safe", safeCategory);
    sessionStorage.setItem("achievable", achievableCategory);
    sessionStorage.setItem("stretch", stretchCategory);
  };

  return (
    <>
      <NavBar />
      <ChancesOfSelectionStyled>
        <div className="d-lg-flex" style={{ marginTop: "85px" }}>
          <div
            style={{ height: "100vh", background: "#f8f8f8" }}
            className="side-bar p-0  col-lg-2 col-12"
          >
            <div className="mt-3">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedTab("selection");
                  setActiveIndex(0);
                }}
                className={`border p-3 w-100 m-0 cursor-pointer ${
                  selectedTab === "selection" ? "selected-tab" : ""
                }`}
              >
                Selection chances
              </p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedTab("college");
                  setActiveIndex(1);
                }}
                className={`border p-3 w-100 m-0 ${
                  selectedTab === "college" ? "selected-tab" : ""
                }`}
              >
                College shortlisting
              </p>
            </div>
          </div>
          <div className="output-container container py-3 col-lg-10 col-12">
            {activeIndex === 0 ? (
              <div>
                <div className="section-title">
                  <h2>Chances of selection</h2>
                </div>
                {data?.length > 1 && totalValues?.length > 1 ? (
                  <div
                    className="scrollable-container"
                    style={{ height: "90vh", overflowY: "scroll" }}
                  >
                    <SelectionOutput data={data} totalValues={totalValues} />{" "}
                  </div>
                ) : (
                  <>
                    <div
                      className="container"
                      style={{
                        height: "50vh",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <p>
                        Results are loading...
                        <LoadingOutlined />
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                {/* <div className="section-title">
                  <h2>College Information</h2>
                 
                </div> */}
                <PreferenceAndGoalsPage />
              </div>
            )}
          </div>
        </div>
      </ChancesOfSelectionStyled>
    </>
  );
};

export default ChancesOfSelection;
