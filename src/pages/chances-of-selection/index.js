// import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import { ChancesOfSelectionStyled } from "./style";
// import AxiosInstance from "../../components/axios";

const ChancesOfSelection = () => {
  const storedBasicDetails = JSON.parse(
    sessionStorage.getItem("basic-details")
  );
  const storedGraduate = JSON.parse(sessionStorage.getItem("graduate"));
  // const storedExperience = JSON.parse(sessionStorage.getItem("experience"))
  // const storedService = JSON.parse(sessionStorage.getItem("service"))
  // const storedHobbies = JSON.parse(sessionStorage.getItem("hobbies"))
  // State variable to hold the data array

  //  const [data, setData] = useState([]);

  // Percentage values for GMAT ranges
  const gmatPercentageValues = {
    ">=750": 45,
    ">=720": 35,
    ">=700": 25,
    ">=680": 15,
    ">=650": 10,
    ">=620": 5,
    "<620": 5,
  };

  // Function to calculate individual value for GMAT
  const calculateGMATIndividualValue = (userGMAT) => {
    // Get the percentage value for the user's GMAT range
    const value = gmatPercentageValues[userGMAT];
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
      top10: 3,
      top30: 2.5,
      "Top 30% of your class (Credit)": 2,
      average: 1.5,
      bottom50: 1,
    };

    const CollegeValue = valueMappingsCollegeType[valueObject.collegeType];
    const PerformanceValue =
      valueMappingsPerformance[valueObject.yourPerformance];

    const value = CollegeValue + PerformanceValue;

    const graduateValue = value / 12;
    // If the GMAT range is not found, default to 0
    return graduateValue || 0;
  };

  const gmatIndividualValue = calculateGMATIndividualValue(
    storedBasicDetails.gmat
  );
  console.log(
    "🚀 ~ file: index.js:66 ~ ChancesOfSelection ~ gmatIndividualValue:",
    gmatIndividualValue
  );
  const graduateIndividualValue =
    calculateGraduateIndividualValue(storedGraduate);
  console.log(
    "🚀 ~ file: index.js:68 ~ ChancesOfSelection ~ graduateIndividualValue:",
    graduateIndividualValue
  );
  // Example array of factor values
  // const factorValues = [
  //   gmatIndividualValue,
  //   graduateIndividualValue , 0.2,0.8,0.1,0.36,0.41
  // ];

  // Sample factor names for creating the 'data' array
  //  const factorNames = ['GMAT', 'Undergraduate', 'Work experience','Leadership experience','Commercial experience','Extra-curricular','Hobbies' ];

  //  useEffect(() => {
  //    // Function to fetch data for a single factor
  //    const fetchDataForFactor = async (factorValue) => {
  //      try {
  //        const response = await AxiosInstance.post('/api/profiler/individual', {
  //          score: factorValue,
  //        });
  //        return response.data;
  //      } catch (error) {
  //        console.error(`Error fetching data for factor ${factorValue}:`, error);
  //        return null;
  //      }
  //    };

  //    // Fetch data for all factors in parallel
  //    const fetchResponses = async () => {
  //      const responses = await Promise.all(factorValues.map(fetchDataForFactor));
  //      // Filter out null responses (failed API calls)
  //      const validResponses = responses.filter((response) => response !== null);
  //      console.log("🚀 ~ file: index.js:111 ~ fetchResponses ~ validResponses:", validResponses)

  //      // Update the 'data' array based on API responses
  //      const updatedData = validResponses.map((response, index) => ({
  //        factor: factorNames[index],
  //        values: Object.keys(response).map((key) => response[key]),
  //      }));
  //      console.log("🚀 ~ file: index.js:117 ~ updatedData ~ updatedData:", updatedData)

  //      // Set the updated 'data' array in the state
  //      setData(updatedData);
  //    };

  //    // Call the function to fetch data
  //    fetchResponses();
  //  }, []); // Ensure useEffect runs when factorValues change
  // // Function to determine the background color based on the value
  const getColor = (value) => {
    if (value < 0.3) {
      return "#f74a64"; // Light red for values less than 0.3
    } else if (value >= 0.3 && value <= 0.5) {
      return "#97c8d9"; // Light orange for values between 0.3 and 0.5
    } else {
      return "#99ff99"; // Light green for values greater than 0.5
    }
  };

  // Dummy data for illustration (replace with your actual data)
  const data = [
    { factor: "GMAT", values: [0.2, 0.4, 0.6, 0.7, 0.5, 0.2] },
    { factor: "Undergraduate", values: [0.3, 0.2, 0.5, 0.6, 0.4, 0.7] },
    { factor: "Work experience", values: [0.4, 0.5, 0.2, 0.7, 0.6, 0.3] },
    { factor: "Leadership experience", values: [0.6, 0.7, 0.4, 0.2, 0.5, 0.3] },
    { factor: "Commercial experience", values: [0.7, 0.6, 0.3, 0.4, 0.2, 0.5] },
    { factor: "Extra-curricular", values: [0.5, 0.3, 0.7, 0.4, 0.6, 0.2] },
    { factor: "Hobbies", values: [0.3, 0.5, 0.6, 0.4, 0.7, 0.2] },
  ];

  // Calculate total row values
  const totalValues = data[0].values.map((_, index) =>
    data.reduce((sum, factor) => sum + factor.values[index], 0)
  );

  return (
    <>
      <NavBar />
      <ChancesOfSelectionStyled>
        <div style={{ marginTop: "100px" }}>
          <div className="section-title">
            <h2>Chances of selection</h2>
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }} rowspan="2">
                      Contribution of each factor of your application
                    </th>
                    <th style={{ textAlign: "center" }} colspan="6">
                      Chances of selection
                    </th>
                  </tr>
                  <tr>
                    <th>Top 10</th>
                    <th>11-20</th>
                    <th>21-40</th>
                    <th>41-60</th>
                    <th>61-80</th>
                    <th>81-100</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.factor}</td>
                      {item.values.map((value, idx) => (
                        <td
                          key={idx}
                          style={{ backgroundColor: getColor(value) }}
                        ></td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ height: "10px" }}></tr>
                  {/* Total row */}
                  <tr>
                    <td>Total</td>
                    {totalValues.map((value, idx) => (
                      <td
                        key={idx}
                        style={{ backgroundColor: getColor(value) }}
                      >
                        {/* You can display the values if needed */}
                        {/* {value} */}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="legend container">
              <div style={{ textAlign: "left", marginTop: "20px" }}>
                <div style={{ marginRight: "20px" }}>
                  <div
                    style={{
                      backgroundColor: "#99ff99",
                      width: "40px",
                      height: "20px",
                      display: "inline-block",
                    }}
                  ></div>
                  <span style={{ marginLeft: "5px" }}>
                    You are competitive in that group
                  </span>
                </div>
                <div style={{ marginRight: "20px" }}>
                  <div
                    style={{
                      backgroundColor: "#97c8d9",
                      width: "40px",
                      height: "20px",
                      display: "inline-block",
                    }}
                  ></div>
                  <span style={{ marginLeft: "5px" }}>
                    You have a decent chance to get admission in the group
                  </span>
                </div>
                <div style={{}}>
                  <div
                    style={{
                      backgroundColor: "#f74a64",
                      width: "40px",
                      height: "20px",
                      display: "inline-block",
                    }}
                  ></div>
                  <span style={{ marginLeft: "5px" }}>
                    You are not competitive in that group
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChancesOfSelectionStyled>
    </>
  );
};

export default ChancesOfSelection;
