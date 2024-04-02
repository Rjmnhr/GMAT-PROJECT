import React, { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import Plot from "react-plotly.js";
// import sticker from "../../icons/businessman.png";

// const HeatmapExample = ({ data }) => {
//   // Extract factor names and category names
//   const factors = data.map((item) => item.factor);
//   const categories = ["Top 10", "11-20", "21-40", "41-60", "61-80", "81-100"];

//   // Extract values for the heatmap
//   const values = data.map((item) => item.values);

//   // Create a 2D array for the heatmap
//   const heatmapData = [
//     {
//       x: categories,
//       y: factors,
//       z: values,
//       type: "heatmap",
//       colorscale: "Viridis", // You can choose different color scales
//     },
//   ];

//   // Layout configuration for the heatmap
//   const layout = {
//     title: "Chances of Selection Heatmap",
//     xaxis: {
//       title: "Categories",
//     },
//     yaxis: {
//       title: "Factors",
//     },
//     autosize: true, // Automatically adjust the size of the chart to fit the container
//     margin: {
//       l: 50,
//       r: 50,
//       b: 50,
//       t: 50,
//       pad: 4,
//     },
//   };

//   return (
//     <div className="mb-3">
//       <Plot
//         data={heatmapData}
//         layout={layout}
//         config={{ displayModeBar: false }}
//       />
//     </div>
//   );
// };

const Interactive3DRadarChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Assuming data is in the format: [{ factor: 'GMAT', values: [0.05, 0.1, 0.15, 0.2, 0.3, 0.5] }, ...]
    const chartData = data.map((item) => ({
      type: "scatterpolar",
      r: item.values,
      theta: ["Top 10", "11-20", "21-40", "41-60", "61-80", "81-100"],
      fill: "toself",
      name: item.factor,
    }));

    setChartData(chartData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Plot
        data={chartData}
        config={{ displayModeBar: false }}
        layout={{
          polar: {
            radialaxis: {
              visible: true,
              range: [0, 1],
            },
          },
          showlegend: true,
          autosize: true,
          margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4,
          },
        }}
      />
    </ResponsiveContainer>
  );
};
// const RadarChartExample = ({ data }) => {
//   const categories = ["Top 10", "11-20", "21-40", "41-60", "61-80", "81-100"];

//   // Define colors for each category
//   const colors = [
//     "#8884d8",
//     "#82ca9d",
//     "#ffc658",
//     "#ff7300",
//     "#0088fe",
//     "#00C49F",
//   ];

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <RadarChart outerRadius={150} data={data}>
//         <PolarGrid />
//         <PolarAngleAxis dataKey="factor" />
//         <PolarRadiusAxis angle={30} domain={[0, 1]} />

//         {categories.map((category, index) => (
//           <Radar
//             key={category}
//             name={category}
//             dataKey={`values[${index}]`}
//             stroke={colors[index]}
//             fill={colors[index]}
//             fillOpacity={0.6}
//           />
//         ))}
//       </RadarChart>
//     </ResponsiveContainer>
//   );
// };

const SelectionOutput = ({ data, totalValues }) => {
  const [isMobile, setIsMobile] = useState(false);
  // Function to determine the background color based on the value
  const getColor = (value) => {
    if (value < 0.3) {
      return "#f8a66e"; // Light red for values less than 0.3
    } else if (value >= 0.3 && value <= 0.5) {
      return "#0c6eab"; // Light orange for values between 0.3 and 0.5
    } else {
      return "#00aaa4"; // Light green for values greater than 0.5
    }
  };

  const generateIcon = (factorNames) => {
    // Function to generate icons based on factors
    switch (factorNames) {
      case "GMAT":
        return "📚"; // Book icon for GMAT
      case "Undergraduate":
        return "🎓"; // Graduation cap icon for Undergraduate
      case "Work experience":
        return "💼"; // Briefcase icon for Work experience
      case "Leadership experience":
        return "👥"; // People icon for Leadership experience
      case "Commercial experience":
        return "💹"; // Chart icon for Commercial experience
      case "Extra-curricular":
        return "🏆"; // Trophy icon for Extra-curricular
      case "Hobbies":
        return "🎨"; // Palette icon for Hobbies
      default:
        return "❓"; // Default icon for unknown factors
    }
  };

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
    <>
      <div className="container m-0 p-0 d-lg-flex  justify-content-center align-items-center table-container">
        <div className="col-12  ">
          <table style={{ width: "100%" }} className="table styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }} rowSpan="2">
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
                  <td>
                    {generateIcon(item.factor)} {item.factor}
                  </td>
                  {item.values.map((value, idx) => (
                    <td
                      key={idx}
                      style={{ background: getColor(value) }}
                      title={`${item.factor}: Chances - ${value * 100}%`}
                    ></td>
                  ))}
                </tr>
              ))}
              <tr style={{ height: "10px" }}></tr>
              {/* Total row */}
              <tr>
                <td>Total</td>
                {totalValues.map((value, idx) => (
                  <td key={idx} style={{ background: getColor(value) }}>
                    {/* You can display the values if needed */}
                    {/* {value} */}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div style={{ marginBottom: `${isMobile ? "5rem" : "0"}` }}>
            <div className="legend container ">
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
                    You are competitive in that group
                  </div>
                </div>
                <div className="d-flex mb-1 justify-content-lg-start justify-content-between align-items-center">
                  <div
                    style={{
                      backgroundColor: "#0c6eab",
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
                    You may be admitted to the group.
                  </div>
                </div>
                <div className="d-flex  mb-1 justify-content-lg-start justify-content-between align-items-center">
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
                    You are not competitive in that group
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-12 col-lg-6">
          <RadarChartExample data={data} />
        </div> */}
      </div>
      {isMobile ? "" : <Interactive3DRadarChart data={data} />}

      {/* <BarChartExample data={data} totalValues={totalValues} /> */}
      {/* <div style={{ display: "grid", placeItems: "center" }}>
<div className="clock">
  <div class="number number1">
    <div className="child-number">1</div>
  </div>
  <div class="number number2">
    {" "}
    <div className="child-number">2</div>
  </div>
  <div class="number number3">
    {" "}
    <div className="child-number">3</div>
  </div>
  <div class="number number4">
    {" "}
    <div className="child-number">4</div>
  </div>
  <div class="number number5">
    {" "}
    <div className="child-number">5</div>
  </div>
  <div class="number number6">
    {" "}
    <div className="child-number">6</div>
  </div>
  <div class="number number7">
    {" "}
    <div className="child-number">7</div>
  </div>
  <div class="number number8">
    {" "}
    <div className="child-number">8</div>
  </div>
  <div class="number number9">
    {" "}
    <div className="child-number">9</div>
  </div>
  <div class="number number10">
    {" "}
    <div className="child-number">10</div>
  </div>
  <div class="number number11">
    {" "}
    <div className="child-number">11</div>
  </div>
  <div class="number number12">
    {" "}
    <div className="child-number">12</div>
  </div>
  <div className="outer-circle">
    <div className="circle-sticker"></div>
  </div>
</div>
</div> */}
    </>
  );
};

export default SelectionOutput;
