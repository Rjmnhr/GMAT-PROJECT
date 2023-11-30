import React, { useEffect, useState } from "react";
import AxiosInstance from "../axios";
import { Card } from "antd";
import safeIcon from "../../icons/shield.png";
import achievableIcon from "../../icons/medal.png";
import stretchIcon from "../../icons/achievement.png";
import { CollegeInformationOutputStyled } from "./style";

const countrySourceData = [
  {
    label: "Living",
    Factor: "0.5",
    Singapore: "Y",
    India: "Y",
    Germany: "Y",
    Netherlands: "Y",
    Australia: "Y",
    Canada: "Y",
  },
  {
    label: "Tuition Fee",
    Factor: "0.75",
  },
  {
    label: "MBA",
    Factor: "0.25",
    US: "Y",
    "France / Singapore": "Y",
    China: "Y",
    UK: "Y",
    France: "Y",
    Spain: "Y",
    Singapore: "Y",
    Switzerland: "Y",
    Italy: "Y",
    "S Korea": "Y",
    Germany: "Y",
    Netherlands: "Y",
    Australia: "Y",
    Portugal: "Y",
    Canada: "Y",
    Ireland: "Y",
  },
  {
    label: "Scholarship",
    Factor: "0.75",
  },
  {
    label: "Weather",
    Factor: "0.2",
    "France / Singapore": "Y",
    France: "Y",
    Spain: "Y",
    Singapore: "Y",
    Italy: "Y",
    Australia: "Y",
    Portugal: "Y",
    Canada: "Y",
  },
  {
    label: "English speaking",
    Factor: "0.5",
    US: "Y",
    "France / Singapore": "Y",
    UK: "Y",
    Singapore: "Y",
    India: "Y",
    Australia: "Y",
    Canada: "Y",
    Ireland: "Y",
  },
  {
    label: "Ranking of school (FT Rankings)",
    Factor: "0.5",
    US: "Already covered",
  },
  {
    label: "Choice of courses",
    Factor: "0.25",
    US: "Y",
    "France / Singapore": "Y",
    India: "Y",
    Canada: "Y",
  },
  {
    label: "Internship",
    Factor: "0.5",
    US: "Y",
    China: "Y",
    UK: "Y",
    Singapore: "Y",
    India: "Y",
    "S Korea": "Y",
    Canada: "Y",
  },
];

const calculateLivingFactor = (country) => {
  const livingFactor = countrySourceData.find(
    (factor) => factor.label === "Living"
  );
  return livingFactor && livingFactor[country] === "Y"
    ? parseFloat(livingFactor.Factor)
    : 0;
};

// Helper function to calculate MBA factor value
const calculateMBAFactor = (country) => {
  const mbaFactor = countrySourceData.find((factor) => factor.label === "MBA");
  return mbaFactor && mbaFactor[country] === "Y"
    ? parseFloat(mbaFactor.Factor)
    : 0;
};

// Helper function to calculate Choice of courses factor value
const calculateChoiceOfCoursesFactor = (country) => {
  const choiceOfCoursesFactor = countrySourceData.find(
    (factor) => factor.label === "Choice of courses"
  );
  return choiceOfCoursesFactor && choiceOfCoursesFactor[country] === "Y"
    ? parseFloat(choiceOfCoursesFactor.Factor)
    : 0;
};

// Helper function to calculate Internship factor value
const calculateInternshipFactor = (country) => {
  const internshipFactor = countrySourceData.find(
    (factor) => factor.label === "Internship"
  );
  return internshipFactor && internshipFactor[country] === "Y"
    ? parseFloat(internshipFactor.Factor)
    : 0;
};

// Helper function to calculate English speaking factor value
const calculateEnglishSpeakingFactor = (country) => {
  const englishSpeakingFactor = countrySourceData.find(
    (factor) => factor.label === "English speaking"
  );
  return englishSpeakingFactor && englishSpeakingFactor[country] === "Y"
    ? parseFloat(englishSpeakingFactor.Factor)
    : 0;
};

// Helper function to calculate Weather factor value
const calculateWeatherFactor = (country) => {
  const weatherFactor = countrySourceData.find(
    (factor) => factor.label === "Weather"
  );
  return weatherFactor && weatherFactor[country] === "Y"
    ? parseFloat(weatherFactor.Factor)
    : 0;
};

const calculateTuitionFeeFactor = (valueForMoneyRank) => {
  return valueForMoneyRank < 30
    ? parseFloat(
        countrySourceData.find((factor) => factor.label === "Tuition Fee")
          .Factor
      )
    : 0;
};

// Helper function to calculate Scholarship factor value
const calculateScholarshipFactor = (valueForMoneyRank) => {
  return valueForMoneyRank < 30
    ? parseFloat(
        countrySourceData.find((factor) => factor.label === "Scholarship")
          .Factor
      )
    : 0;
};

const CollegeInformationOutput = () => {
  const storedSafe = sessionStorage.getItem("safe");
  const storedAchievable = sessionStorage.getItem("achievable");
  const storedStretch = sessionStorage.getItem("stretch");
  const storedTotalGeneralValue = sessionStorage.getItem(
    "experience_general_value"
  );
  const [collegeData, setCollegeData] = useState([]);
  const [gmatScore, setGmatScore] = useState(0);
  const [gpaScore, setGpaScore] = useState(0);
  useEffect(() => {
    AxiosInstance.post(
      "api/profiler/college-information",
      {
        safe: storedSafe,
        achievable: storedAchievable,
        stretch: storedStretch,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const response = await res.data;
        setCollegeData(response);
        console.log("🚀 ~ file: index.js:54 ~ .then ~ response:", response);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const storedGmatScore = sessionStorage.getItem("gmat_value");
    const findingGmatThreshold = {
      45: 760,
      35: 740,
      25: 710,
      15: 690,
      10: 665,
      5: 635,
    };

    const value = findingGmatThreshold[storedGmatScore];
    setGmatScore(value * 0.95);
  }, []);

  useEffect(() => {
    const storedPerformance = sessionStorage.getItem("graduate_performance");

    const gpaThreshold = {
      3: 3.6,
      2.5: 3.3,
      2: 3.1,
      1.5: 3,
      1: 2.5,
    };
    const value = gpaThreshold[storedPerformance];
    setGpaScore(value);
  }, []);

  // Helper function to calculate Difficulty factor value
  const calculateDifficultyFactor = (acceptanceRate, category) => {
    if (acceptanceRate) {
      return parseFloat(acceptanceRate) * 8;
    } else {
      // Calculate the average acceptance rate for the given category
      const categoryColleges = collegeData[category];
      const nonEmptyAcceptanceRates = categoryColleges
        .filter((college) => college.acceptance_rate)
        .map((college) => parseFloat(college.acceptance_rate));

      const averageAcceptanceRate =
        nonEmptyAcceptanceRates.length > 0
          ? nonEmptyAcceptanceRates.reduce((sum, rate) => sum + rate, 0) /
            nonEmptyAcceptanceRates.length
          : 0;

      return averageAcceptanceRate * 8;
    }
  };

  const calculateGmatFactor = (averageGmat, category) => {
    if (averageGmat) {
      return (1 - (averageGmat - gmatScore) / 100) * 5.5;
    } else {
      // Calculate the average GMAT for the given category
      const categoryColleges = collegeData[category];
      const nonEmptyGmatScores = categoryColleges
        .filter((college) => college.average_gmat)
        .map((college) => parseFloat(college.average_gmat));

      const averageGmatScore =
        nonEmptyGmatScores.length > 0
          ? nonEmptyGmatScores.reduce((sum, score) => sum + score, 0) /
            nonEmptyGmatScores.length
          : 0;

      return (1 - (averageGmatScore - gmatScore) / 100) * 5.5;
    }
  };

  // Helper function to calculate GPA factor value
  const calculateGpaFactor = (undergraduateGpa, category) => {
    if (undergraduateGpa) {
      return (1 - (undergraduateGpa - gpaScore) / 100) * 5;
    } else {
      // Calculate the average GPA for the given category
      const categoryColleges = collegeData[category];
      const nonEmptyGpaScores = categoryColleges
        .filter((college) => college.undergraduate_gpa)
        .map((college) => parseFloat(college.undergraduate_gpa));

      const averageGpaScore =
        nonEmptyGpaScores.length > 0
          ? nonEmptyGpaScores.reduce((sum, score) => sum + score, 0) /
            nonEmptyGpaScores.length
          : 0;

      return (1 - (averageGpaScore - gpaScore) / 100) * 5;
    }
  };

  const calculateExperienceFactor = (experience, category) => {
    if (experience) {
      return (1 - (experience - parseInt(storedTotalGeneralValue))) * 0.2;
    } else {
      // Calculate the average GPA for the given category
      const categoryColleges = collegeData[category];
      const nonEmptyExperienceScores = categoryColleges
        .filter((college) => college.average_years_of_experience)
        .map((college) => parseFloat(college.average_years_of_experience));

      const averageExperienceScore =
        nonEmptyExperienceScores.length > 0
          ? nonEmptyExperienceScores.reduce((sum, score) => sum + score, 0) /
            nonEmptyExperienceScores.length
          : 0;

      return (
        (1 - (averageExperienceScore - parseInt(storedTotalGeneralValue))) * 0.2
      );
    }
  };
  // Separate colleges into different arrays based on categories
  const safeColleges = collegeData.safe?.map((college) => {
    return {
      ...college,
      living: calculateLivingFactor(college.country),
      mba: calculateMBAFactor(college.country),
      weather: calculateWeatherFactor(college.country),
      englishSpeaking: calculateEnglishSpeakingFactor(college.country),
      choiceOfCourses: calculateChoiceOfCoursesFactor(college.country),
      internship: calculateInternshipFactor(college.country),
      tuitionFee: calculateTuitionFeeFactor(college.value_for_money_rank),
      scholarship: calculateScholarshipFactor(college.value_for_money_rank),
      difficulty: calculateDifficultyFactor(college.acceptance_rate, "safe"),
      gmat: calculateGmatFactor(college.average_gmat, "safe"),
      gpa: calculateGpaFactor(college.undergraduate_gpa, "safe"),
      experience: calculateExperienceFactor(
        college.average_years_of_experience,
        "safe"
      ),
    };
  });

  const achievableColleges = collegeData.achievable?.map((college) => {
    return {
      ...college,
      living: calculateLivingFactor(college.country),
      mba: calculateMBAFactor(college.country),
      weather: calculateWeatherFactor(college.country),
      englishSpeaking: calculateEnglishSpeakingFactor(college.country),
      choiceOfCourses: calculateChoiceOfCoursesFactor(college.country),
      internship: calculateInternshipFactor(college.country),
      tuitionFee: calculateTuitionFeeFactor(college.value_for_money_rank),
      scholarship: calculateScholarshipFactor(college.value_for_money_rank),
      difficulty: calculateDifficultyFactor(
        college.acceptance_rate,
        "achievable"
      ),
      gmat: calculateGmatFactor(college.average_gmat, "achievable"),
      gpa: calculateGpaFactor(college.undergraduate_gpa, "achievable"),
      experience: calculateExperienceFactor(
        college.average_years_of_experience,
        "achievable"
      ),
    };
  });

  const stretchColleges = collegeData.stretch?.map((college) => {
    return {
      ...college,
      living: calculateLivingFactor(college.country),
      mba: calculateMBAFactor(college.country),
      weather: calculateWeatherFactor(college.country),
      englishSpeaking: calculateEnglishSpeakingFactor(college.country),
      choiceOfCourses: calculateChoiceOfCoursesFactor(college.country),
      internship: calculateInternshipFactor(college.country),
      tuitionFee: calculateTuitionFeeFactor(college.value_for_money_rank),
      scholarship: calculateScholarshipFactor(college.value_for_money_rank),
      difficulty: calculateDifficultyFactor(college.acceptance_rate, "stretch"),
      gmat: calculateGmatFactor(college.average_gmat, "stretch"),
      gpa: calculateGpaFactor(college.undergraduate_gpa, "stretch"),
      experience: calculateExperienceFactor(
        college.average_years_of_experience,
        "stretch"
      ),
    };
  });

  const calculateWeightage = (college) => {
    const factorsSum =
      college.living +
      college.mba +
      college.weather +
      college.englishSpeaking +
      college.choiceOfCourses +
      college.internship +
      college.tuitionFee +
      college.scholarship +
      college.difficulty +
      college.gmat +
      college.gpa +
      college.experience;

    return factorsSum + (100 - college.rank_in_2020) / 100;
  };

  // Calculate weightage and find the most relevant school names for each category
  const calculateFinalResults = (colleges) => {
    return colleges?.map((college, index) => {
      return {
        school_name: college.school_name,
        weightage: calculateWeightage(college),
      };
    });
  };

  // Calculate and get the final results for each category
  const finalResultsSafe = calculateFinalResults(safeColleges);
  const finalResultsAchievable = calculateFinalResults(achievableColleges);
  const finalResultsStretch = calculateFinalResults(stretchColleges);

  // Find the top two schools from each category based on weightage
  const topSchoolsSafe = finalResultsSafe
    ?.sort((a, b) => b.weightage - a.weightage)
    ?.slice(0, 2);

  const topSchoolsAchievable = finalResultsAchievable
    ?.sort((a, b) => b.weightage - a.weightage)
    ?.slice(0, 2);
  const topSchoolsStretch = finalResultsStretch
    ?.sort((a, b) => b.weightage - a.weightage)
    ?.slice(0, 2);

  return (
    <CollegeInformationOutputStyled>
      <div>
        <div className="section-title">
          <h2>College information</h2>
          <div>
            <h5 className="mb-3 mt-3 text-left">
              Shortlisted Colleges Based on the ranking
            </h5>
            <div className="mb-3 text-left">
              {topSchoolsSafe?.map((item) => {
                return (
                  <Card
                    className="mb-2"
                    style={{
                      width: "75%",
                      boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <img
                        height={50}
                        width={50}
                        style={{ borderRadius: "50%" }}
                        src={safeIcon}
                        alt=""
                      />
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {item.school_name} (
                        <span style={{ color: "blue" }}>Safe</span>)
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="mb-3 text-left">
              {topSchoolsAchievable?.map((item) => {
                return (
                  <Card
                    className="mb-2"
                    style={{
                      width: "75%",
                      boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <img
                        height={50}
                        width={50}
                        style={{ borderRadius: "50%" }}
                        src={achievableIcon}
                        alt=""
                      />
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {item.school_name} (
                        <span style={{ color: "blue" }}>Achievable</span>)
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="mb-3 text-left">
              {topSchoolsStretch?.map((item) => {
                return (
                  <Card
                    className="mb-2"
                    style={{
                      width: "75%",
                      boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <img
                        height={50}
                        width={50}
                        style={{ borderRadius: "50%" }}
                        src={stretchIcon}
                        alt=""
                      />
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {item.school_name} (
                        <span style={{ color: "blue" }}>Stretch</span>)
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CollegeInformationOutputStyled>
  );
};

export default CollegeInformationOutput;
