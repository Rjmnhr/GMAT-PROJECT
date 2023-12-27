import React, { useEffect, useState } from "react";
import AxiosInstance from "../axios";
import { Card, Skeleton } from "antd";
import safeIcon from "../../icons/shield.png";
import achievableIcon from "../../icons/medal.png";
import stretchIcon from "../../icons/achievement.png";
import collegeIcon from "../../icons/graduation-hat.png";
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

const careerSourceData = [
  {
    label: "Financial services",
    "Own business/venture": 1,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "consulting",
    "Own business/venture": 1,
    "Product Manager": 0,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "Technology",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "manufacturing",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "financial",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "consumer products",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "IT",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "health care",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "marketing",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "general management",
    "Own business/venture": 1,
    "Product Manager": 0,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "corporate sectors",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "software/internet",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "business development",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "Telecom",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "marketing/sales",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "building/construction",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "human resources",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "Investment Banking/Brokerage",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "food/beverage",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "media/gaming",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "energy",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "professional services",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 0,
  },
  {
    label: "real estate",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "transportation",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "Retail",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "internet/ecommerce",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "social impact",
    "Own business/venture": 1,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "energy/utilities",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "healt care",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "supply chain",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "operations/logistics",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "logistics",
    "Own business/venture": 0,
    "Product Manager": 0,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 0,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "construction",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "other",
    "Own business/venture": 1,
    "Product Manager": 1,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "others",
    "Own business/venture": 1,
    "Product Manager": 1,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "undefined",
    "Own business/venture": 1,
    "Product Manager": 1,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "Industry",
    "Own business/venture": 1,
    "Product Manager": 1,
    "Management Consulting": 1,
    "Investment Banking/Private Equity": 1,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
  {
    label: "development",
    "Own business/venture": 0,
    "Product Manager": 1,
    "Management Consulting": 0,
    "Investment Banking/Private Equity": 0,
    "Sales and Marketing": 1,
    "Senior Manager (Finance, IT, Supply Chain)": 1,
  },
];

const internationalFactorValues = {
  0: 0.5,
  20: 0.5,
  30: 0.6,
  40: 0.7,
  50: 0.85,
  60: 1,
};

const calculateLivingFactor = (country, importance) => {
  const livingFactor = countrySourceData.find(
    (factor) => factor.label === "Living"
  );
  return livingFactor && livingFactor[country] === "Y"
    ? parseFloat(livingFactor.Factor) * (importance ? importance : 1)
    : 0;
};

// Helper function to calculate MBA factor value
const calculateMBAFactor = (
  country,
  importance,
  international_students,
  international_mobility_rank
) => {
  const internationalFactor =
    parseFloat(international_students) * 0.75 +
    parseFloat(international_mobility_rank) * 0.25;

  const mbaFactor = countrySourceData.find((factor) => factor.label === "MBA");

  // Get the closest internationalFactor value from the internationalFactorValues object
  const closestInternationalFactor = Object.keys(
    internationalFactorValues
  ).reduce((prev, curr) =>
    Math.abs(curr - internationalFactor) < Math.abs(prev - internationalFactor)
      ? curr
      : prev
  );
  console.log(
    "🚀 ~ file: index.js:473 ~ calculateMBAFactor ~ closestInternationalFactor:",
    closestInternationalFactor
  );

  const internationalFactorValue =
    internationalFactorValues[closestInternationalFactor];

  return mbaFactor && mbaFactor[country] === "Y"
    ? parseFloat(mbaFactor.Factor) *
        (importance ? importance : 1) *
        internationalFactorValue
    : 0;
};
// Helper function to calculate Choice of courses factor value
const calculateChoiceOfCoursesFactor = (country, importance) => {
  const choiceOfCoursesFactor = countrySourceData.find(
    (factor) => factor.label === "Choice of courses"
  );
  return choiceOfCoursesFactor && choiceOfCoursesFactor[country] === "Y"
    ? parseFloat(choiceOfCoursesFactor.Factor) * (importance ? importance : 1)
    : 0;
};

// Helper function to calculate Internship factor value
const calculateInternshipFactor = (country, importance) => {
  const internshipFactor = countrySourceData.find(
    (factor) => factor.label === "Internship"
  );
  return internshipFactor && internshipFactor[country] === "Y"
    ? parseFloat(internshipFactor.Factor) * (importance ? importance : 1)
    : 0;
};

// Helper function to calculate English speaking factor value
const calculateEnglishSpeakingFactor = (country, importance) => {
  const englishSpeakingFactor = countrySourceData.find(
    (factor) => factor.label === "English speaking"
  );
  return englishSpeakingFactor && englishSpeakingFactor[country] === "Y"
    ? parseFloat(englishSpeakingFactor.Factor) * (importance ? importance : 1)
    : 0;
};

// Helper function to calculate Weather factor value
const calculateWeatherFactor = (country, importance) => {
  const weatherFactor = countrySourceData.find(
    (factor) => factor.label === "Weather"
  );
  return weatherFactor && weatherFactor[country] === "Y"
    ? parseFloat(weatherFactor.Factor) * (importance ? importance : 1)
    : 0;
};

const calculateTuitionFeeFactor = (valueForMoneyRank, importance) => {
  return valueForMoneyRank < 30
    ? parseFloat(
        countrySourceData.find((factor) => factor.label === "Tuition Fee")
          .Factor * (importance ? importance : 1)
      )
    : 0;
};

// Helper function to calculate Scholarship factor value
const calculateScholarshipFactor = (valueForMoneyRank, importance) => {
  return valueForMoneyRank < 30
    ? parseFloat(
        countrySourceData.find((factor) => factor.label === "Scholarship")
          .Factor * (importance ? importance : 1)
      )
    : 0;
};

const calculateCareerThreshold = (
  college,
  careerSourceData,
  selectedOption
) => {
  const choices = [
    college.top_career_choice_1,
    college.top_career_choice_2,
    college.top_career_choice_3,
    college.top_career_choice_4,
  ];

  const factorValues = choices.map((choice, index) => {
    const label = `top_career_choice_${index + 1}`;
    const choiceObject = careerSourceData.find((obj) => obj.label === label);

    if (choiceObject) {
      const choiceValue = choiceObject[selectedOption] || 0;
      return choiceValue * (4 - index);
    }
    return 0;
  });

  const sum = factorValues.reduce((acc, val) => acc + val, 0);
  return sum === 0 ? 3 : sum;
};

const calculateCareerFactor = (
  employedAtThreeMonths,
  salaryTodayUS,
  careerThreshold
) => {
  // Extract leftmost two characters from employedAtThreeMonths
  const leftAF3Two = employedAtThreeMonths.toString().slice(0, 2);
  // Extract leftmost three characters from employedAtThreeMonths
  const leftAF3Three = employedAtThreeMonths.toString().slice(0, 3);

  // Convert salaryTodayUS from currency format to a number
  const numericSalaryTodayUS = parseFloat(
    salaryTodayUS.replace(/[^0-9.-]+/g, "")
  );

  const firstResult =
    ((numericSalaryTodayUS * parseInt(leftAF3Two, 10)) / 100 / 220000) * 8;
  const secondResult =
    ((numericSalaryTodayUS * parseInt(leftAF3Three, 10)) / 100 / 220000) * 8;
  const thirdResult =
    ((numericSalaryTodayUS * parseInt(leftAF3Two, 10)) / 100 / 220000) * 5;

  const condition = firstResult < 1 ? secondResult : thirdResult;
  const finalResult = condition + careerThreshold * 1;

  return finalResult;
};
const CollegeInformationOutput = () => {
  const storedSafe = sessionStorage.getItem("safe");
  const storedAchievable = sessionStorage.getItem("achievable");
  const storedStretch = sessionStorage.getItem("stretch");
  const storedTotalGeneralValue = sessionStorage.getItem(
    "experience_general_value"
  );
  const storedCountries = JSON.parse(
    sessionStorage.getItem("selectedCountries")
  );
  const storedPreferenceInput = JSON.parse(
    sessionStorage.getItem("preferenceInputObject")
  );
  const storedGoalsInput = JSON.parse(
    sessionStorage.getItem("goalsInputObject")
  );
  const [collegeData, setCollegeData] = useState([]);
  const [gmatScore, setGmatScore] = useState(0);
  const [gpaScore, setGpaScore] = useState(0);
  const selectedOption = storedGoalsInput?.shortTermGoals;
  useEffect(() => {
    AxiosInstance.post(
      "api/profiler/college-information",
      {
        safe: storedSafe,
        achievable: storedAchievable,
        stretch: storedStretch,
        countries: storedCountries?.join(","),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const response = await res.data;
        console.log("🚀 ~ file: index.js:631 ~ .then ~ response:", response);
        setCollegeData(response);
        sessionStorage.setItem("form-filled", true);
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
      living: calculateLivingFactor(
        college.country,
        storedPreferenceInput.livingCountry
      ),
      mba: calculateMBAFactor(
        college.country,
        storedPreferenceInput.internationalMBA,
        college.international_students,
        college.international_mobility_rank
      ),
      weather: calculateWeatherFactor(
        college.country,
        storedPreferenceInput.weather
      ),
      englishSpeaking: calculateEnglishSpeakingFactor(
        college.country,
        storedPreferenceInput.englishSpeaking
      ),
      choiceOfCourses: calculateChoiceOfCoursesFactor(
        college.country,
        storedPreferenceInput.choiceOfCourses
      ),
      internship: calculateInternshipFactor(
        college.country,
        storedPreferenceInput.internship
      ),
      tuitionFee: calculateTuitionFeeFactor(
        college.value_for_money_rank,
        storedPreferenceInput.tuitionFee
      ),
      scholarship: calculateScholarshipFactor(
        college.value_for_money_rank,
        storedPreferenceInput.scholarship
      ),
      careerThreshold: calculateCareerThreshold(
        college,
        careerSourceData,
        selectedOption
      ),
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
      living: calculateLivingFactor(
        college.country,
        storedPreferenceInput.livingCountry
      ),
      mba: calculateMBAFactor(
        college.country,
        storedPreferenceInput.internationalMBA,
        college.international_students,
        college.international_mobility_rank
      ),
      weather: calculateWeatherFactor(
        college.country,
        storedPreferenceInput.weather
      ),
      englishSpeaking: calculateEnglishSpeakingFactor(
        college.country,
        storedPreferenceInput.englishSpeaking
      ),
      choiceOfCourses: calculateChoiceOfCoursesFactor(
        college.country,
        storedPreferenceInput.choiceOfCourses
      ),
      internship: calculateInternshipFactor(
        college.country,
        storedPreferenceInput.internship
      ),
      tuitionFee: calculateTuitionFeeFactor(
        college.value_for_money_rank,
        storedPreferenceInput.tuitionFee
      ),
      scholarship: calculateScholarshipFactor(
        college.value_for_money_rank,
        storedPreferenceInput.scholarship
      ),
      careerThreshold: calculateCareerThreshold(
        college,
        careerSourceData,
        selectedOption
      ),
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

      living: calculateLivingFactor(
        college.country,
        storedPreferenceInput.livingCountry
      ),
      mba: calculateMBAFactor(
        college.country,
        storedPreferenceInput.internationalMBA,
        college.international_students,
        college.international_mobility_rank
      ),
      weather: calculateWeatherFactor(
        college.country,
        storedPreferenceInput.weather
      ),
      englishSpeaking: calculateEnglishSpeakingFactor(
        college.country,
        storedPreferenceInput.englishSpeaking
      ),
      choiceOfCourses: calculateChoiceOfCoursesFactor(
        college.country,
        storedPreferenceInput.choiceOfCourses
      ),
      internship: calculateInternshipFactor(
        college.country,
        storedPreferenceInput.internship
      ),
      tuitionFee: calculateTuitionFeeFactor(
        college.value_for_money_rank,
        storedPreferenceInput.tuitionFee
      ),
      scholarship: calculateScholarshipFactor(
        college.value_for_money_rank,
        storedPreferenceInput.scholarship
      ),
      careerThreshold: calculateCareerThreshold(
        college,
        careerSourceData,
        selectedOption
      ),
      difficulty: calculateDifficultyFactor(college.acceptance_rate, "stretch"),
      gmat: calculateGmatFactor(college.average_gmat, "stretch"),
      gpa: calculateGpaFactor(college.undergraduate_gpa, "stretch"),
      experience: calculateExperienceFactor(
        college.average_years_of_experience,
        "stretch"
      ),
    };
  });

  // Adding Career factor value to each category
  const safeCollegesWithCareerFactor = safeColleges?.map((college) => {
    return {
      ...college,
      careerFactor: calculateCareerFactor(
        college.employed_at_three_months,
        college.salary_today_us,
        college.careerThreshold
      ),
    };
  });

  const achievableCollegesWithCareerFactor = achievableColleges?.map(
    (college) => {
      return {
        ...college,
        careerFactor: calculateCareerFactor(
          college.employed_at_three_months,
          college.salary_today_us,
          college.careerThreshold
        ),
      };
    }
  );

  const stretchCollegesWithCareerFactor = stretchColleges?.map((college) => {
    return {
      ...college,
      careerFactor: calculateCareerFactor(
        college.employed_at_three_months,
        college.salary_today_us,
        college.careerThreshold
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
      college.experience +
      college.careerFactor;

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
  const finalResultsSafe = calculateFinalResults(safeCollegesWithCareerFactor);
  const finalResultsAchievable = calculateFinalResults(
    achievableCollegesWithCareerFactor
  );
  const finalResultsStretch = calculateFinalResults(
    stretchCollegesWithCareerFactor
  );

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

  let combinedTopColleges;

  if (topSchoolsSafe && topSchoolsAchievable && topSchoolsStretch) {
    combinedTopColleges = [
      ...topSchoolsSafe,
      ...topSchoolsAchievable,
      ...topSchoolsStretch,
    ];
  }

  // Sort combinedTopColleges based on weightage
  const sortedCombinedTopColleges = combinedTopColleges?.sort(
    (a, b) => b.weightage - a.weightage
  );

  return (
    <CollegeInformationOutputStyled>
      <div>
        {topSchoolsSafe && topSchoolsAchievable && topSchoolsStretch ? (
          <div>
            <h3 lassName="mb-5"><strong>College Information</strong></h3>
            <div className="d-lg-flex">
              <div className="col-lg-6 p-0 p-lg-2 col-12">
                <h5 className="mb-3 mt-3 text-left">
                  Top colleges based on FT rankings
                </h5>
                <div className="mb-3 text-left">
                  {topSchoolsSafe?.map((item) => {
                    return (
                      <Card
                        className="mb-2"
                        style={{
                          width: "100%",
                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            height={30}
                            width={30}
                            style={{ borderRadius: "50%" }}
                            src={safeIcon}
                            alt=""
                          />
                          <p
                            style={{
                              fontSize: "18px",
                              marginLeft: "10px",
                            }}
                          >
                            {item.school_name}{" "}
                            <span
                              style={{
                                color: "blue",

                                fontWeight: "normal",
                              }}
                            >
                              (Safe)
                            </span>
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
                          width: "100%",
                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            height={30}
                            width={30}
                            style={{ borderRadius: "50%" }}
                            src={achievableIcon}
                            alt=""
                          />
                          <p
                            style={{
                              fontSize: "18px",
                              marginLeft: "10px",
                            }}
                          >
                            {item.school_name}{" "}
                            <span
                              style={{
                                color: "blue",

                                fontWeight: "normal",
                              }}
                            >
                              (Achievable)
                            </span>
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
                          width: "100%",
                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            height={30}
                            width={30}
                            style={{ borderRadius: "50%" }}
                            src={stretchIcon}
                            alt=""
                          />
                          <p
                            style={{
                              fontSize: "18px",
                              marginLeft: "10px",
                            }}
                          >
                            {item.school_name}{" "}
                            <span
                              style={{
                                color: "blue",

                                fontWeight: "normal",
                              }}
                            >
                              (Stretch)
                            </span>
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-6 p-0 p-lg-2 col-12">
                <h5 className="mb-3 mt-3 text-left">
                  Top colleges based on your background
                </h5>
                <div className="mb-3 text-left">
                  {sortedCombinedTopColleges?.map((item) => {
                    return (
                      <Card
                        className="mb-2"
                        style={{
                          width: "100%",
                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            height={30}
                            width={30}
                            style={{ borderRadius: "50%" }}
                            src={collegeIcon}
                            alt=""
                          />
                          <p
                            style={{
                              fontSize: "18px",
                              marginLeft: "10px",
                            }}
                          >
                            {item.school_name}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </CollegeInformationOutputStyled>
  );
};

export default CollegeInformationOutput;
