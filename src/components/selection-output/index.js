import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  // BarChart,
  // Bar,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
} from "recharts";
import Plot from "react-plotly.js";
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
const HeatmapExample = ({ data }) => {
  // Extract factor names and category names
  const factors = data.map((item) => item.factor);
  const categories = ["Top 10", "11-20", "21-40", "41-60", "61-80", "81-100"];

  // Extract values for the heatmap
  const values = data.map((item) => item.values);

  // Create a 2D array for the heatmap
  const heatmapData = [
    {
      x: categories,
      y: factors,
      z: values,
      type: "heatmap",
      colorscale: "Viridis", // You can choose different color scales
    },
  ];

  // Layout configuration for the heatmap
  const layout = {
    title: <h5>Heat Map of Selection Chances</h5>,
    xaxis: {
      title: "",
    },
    yaxis: {
      title: "",
    },
  };

  return (
    <Plot
      data={heatmapData}
      layout={layout}
      config={{ displayModeBar: false }}
    />
  );
};

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
    <Plot
      data={chartData}
      config={{ displayModeBar: false }}
      layout={{
        title: <h5>Interactive Radial Map</h5>,
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 1],
          },
        },
        showlegend: true,
      }}
    />
  );
};
const RadarChartExample = ({ data }) => {
  const categories = ["Top 10", "11-20", "21-40", "41-60", "61-80", "81-100"];

  // Define colors for each category
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#0088fe",
    "#00C49F",
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart outerRadius={150} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="factor" />
        <PolarRadiusAxis angle={30} domain={[0, 1]} />

        {categories.map((category, index) => (
          <Radar
            key={category}
            name={category}
            dataKey={`values[${index}]`}
            stroke={colors[index]}
            fill={colors[index]}
            fillOpacity={0.6}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};

const SelectionOutput = ({ data, totalValues }) => {
  // Function to determine the background color based on the value
  const getColor = (value) => {
    if (value < 0.3) {
      return " linear-gradient(to right, #ed213a, #93291e)"; // Light red for values less than 0.3
    } else if (value >= 0.3 && value <= 0.5) {
      return "linear-gradient(to right, #7474bf, #348ac7)"; // Light orange for values between 0.3 and 0.5
    } else {
      return "#00ff87"; // Light green for values greater than 0.5
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
  return (
    <>
      {" "}
      <div
        // style={{ height: "95vh", overflowY: "scroll" }}
        className="container d-lg-flex justify-content-center align-items-center table-container"
      >
        <div className="col-12 col-lg-6">
          <table className="table styled-table">
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
        <div className="col-12 col-lg-6">
          <RadarChartExample data={data} />
        </div>
      </div>
      <Interactive3DRadarChart data={data} />
      <HeatmapExample data={data} />
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
