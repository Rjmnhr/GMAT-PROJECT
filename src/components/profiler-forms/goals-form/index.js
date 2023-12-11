import { Card, Form } from "antd";
import { useEffect, useState } from "react";
import { BasicDetailsFormStyled } from "../basic-details/style";

const longTermGoalsOptions = [
  {
    value: "Own business/venture",
    text: "Own business/venture",
    label: "Own business/venture",
  },
  {
    value: "General Manager",
    text: "General Manager of a business unit or function",
    label: "General Manager",
  },
  { value: "CEO", text: "CEO of a business unit/function", label: "CEO" },
  {
    value: "Partner",
    text: "Partner of a consulting firm",
    label: "Partner",
  },
];

const shortTermGoalsOptions = [
  {
    value: "Own business/venture",
    text: "Own business/venture",
    label: "Own business/venture",
  },
  {
    value: "Product Manager",
    text: "Product Manager",
    label: "Product Manager",
  },
  {
    value: "Management Consulting",
    text: "Management Consulting",
    label: "Management Consulting",
  },
  {
    value: "Investment Banking",
    text: "Investment Banking/Private Equity",
    label: "Investment Banking",
  },
  {
    value: "Sales and Marketing",
    text: "Sales and Marketing",
    label: "Sales and Marketing",
  },
  {
    value: "Senior Manager",
    text: "Senior Manager (Finance, IT, Supply Chain)",
    label: "Senior Manager",
  },
];
const GoalsForm = ({ onUpdateProgress, onFormValidation }) => {
  const [selectedLongTerm, setSelectedLongTerm] = useState(
    JSON.parse(sessionStorage.getItem("goalsInputObject"))?.longTermGoals
  );
  const [selectedShortTerm, setSelectedShortTerm] = useState(
    JSON.parse(sessionStorage.getItem("goalsInputObject"))?.longTermGoals
  );

  const [isMobile, setIsMobile] = useState(false);

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
  useEffect(() => {
    // Store default values in sessionStorage when the component is rendered for the first time
    const defaultValues = {
      longTermGoals: longTermGoalsOptions[0].label,
      shortTermGoals: shortTermGoalsOptions[0].label,
    };
    sessionStorage.setItem(
      "goalsInputObject-default",
      JSON.stringify(defaultValues)
    );

    // Set form values based on the default values
    // You may need to replace this with the actual form library's method to set form values
    // For example, if you are using Ant Design Form, it would be form.setFieldsValue(defaultValues);
  }, []);

  useEffect(() => {
    // Update session storage whenever form values change
    const formValues = {
      longTermGoals: selectedLongTerm,
      shortTermGoals: selectedShortTerm,
    };
    sessionStorage.setItem("goalsInputObject", JSON.stringify(formValues));
    const nonEmptyCount = [selectedLongTerm, selectedShortTerm].filter(
      Boolean
    ).length;

    onUpdateProgress("goalsInputObject", nonEmptyCount);
    onFormValidation("goalsInputObject", 6);
    //eslint-disable-next-line
  }, [selectedLongTerm, selectedShortTerm]);

  const handleCardClick = (key, value) => {
    if (key === "longTermGoals") {
      setSelectedLongTerm(value);
    } else {
      setSelectedShortTerm(value);
    }
  };

  return (
    <BasicDetailsFormStyled>
      <div className="col-lg-10 p-0 p-lg-3 ">
        <Form className="p-0" name="goalsForm">
          <div>
            <div>
              <div>
                <h5 className="text-left mb-2">Long Term Goals </h5>
                <div className="college-cards">
                  {longTermGoalsOptions.map((option) => (
                    <Card
                      className={`college-card ${
                        selectedLongTerm === option.label ? "selected-card" : ""
                      }`}
                      key={option.label}
                      onClick={() =>
                        handleCardClick("longTermGoals", option.label)
                      }
                      style={{
                        width: `${isMobile ? "100%" : ""}`,
                      }}
                    >
                      <p>{option.label}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-left mb-2">Short Term Goals </h5>
                <div className="college-cards">
                  {shortTermGoalsOptions.map((option) => (
                    <Card
                      className={`college-card ${
                        selectedShortTerm === option.label
                          ? "selected-card"
                          : ""
                      }`}
                      key={option.label}
                      onClick={() =>
                        handleCardClick("shortTermGoals", option.label)
                      }
                      style={{
                        width: `${isMobile ? "100%" : ""}`,
                      }}
                    >
                      <p>{option.label}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </BasicDetailsFormStyled>
  );
};

export default GoalsForm;
