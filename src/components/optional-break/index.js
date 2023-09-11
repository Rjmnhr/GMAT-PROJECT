import React from "react";
import { useNavigate } from "react-router-dom";

const OptionalBreak = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container p-3 ">
        <h3 className="mb-5">Optional Break</h3>
        <p className="mb-3 text-start fs-4 ">
          At this point during the GMAT exam, you will have the opportunity to
          take an optional break. If you do not wish to take a break, you may
          continue. If you choose to take the break, notify the Test
          Administrator by raising your hand. If you exceed the time allowed for
          this break, the extra time will be deducted from the time available
          for completing the next section of the exam. This break screen is not
          timed in this Practice Exams.
        </p>
        <button
          onClick={() => navigate("/section")}
          className="btn btn-primary"
        >
          Continue Exam
        </button>
      </div>
    </div>
  );
};

export default OptionalBreak;
