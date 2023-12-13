import React from "react";

const GMATFocusContent = () => {
  return (
    <div
      className="scrollable-container"
      style={{ height: "80vh", overflowY: "scroll" }}
    >
      <div className="section-title">
        <h2>GMAT Focus Edition</h2>
      </div>
      <div className="text-left ">
        <h1 className="mb-3">
          Timing of the Current GMAT exam vs GMAT Focus Edition
        </h1>
        <p className="mb-3">
          The current GMAT has 65 minutes Verbal Reasoning, 62 minutes
          Quantitative Reasoning, 30 minutes Integrated Reasoning and 30 minutes
          analytical writing assessment (essay section). The total time is 3.1
          hours.{" "}
        </p>
        <p className="mb-3">
          The GMAT Focus Edition will have 45 minutes of Verbal Reasoning, 45
          minutes of Quantitative Reasoning and 45 minutes Data Insights. Total
          time is 2 hours and 15 minutes with one optional 10-minute break.
        </p>
        <img
          className="mb-3"
          src={
            "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702484008/xtxkvh9scphlakk4nvw9.png"
          }
          alt=""
        />
        <h1 className="mb-3">
          How are the current GMAT and the GMAT Focus scored?
        </h1>
        <p className="mb-3">
          The current GMAT has a total score of between 200 and 800. Verbal
          reasoning is scored between 6 and 51. Quantitative Reasoning is scored
          between 6 and 51. There’s an Analytical Writing score of 0-6 and an
          Integrated Reasoning score of 1-8. The GMAT Focus Edition has a
          single, unified score gathered from the three sections. This gives
          business schools an easier evaluation of the candidate’s ability,
          making it an attractive option for students.
        </p>
        <img
          className="mb-3"
          src={
            "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702484235/awkqvf6pr9knfv6k1dtl.png"
          }
          alt=""
        />
        <h1 className="mb-3">
          What sections do the GMAT and the GMAT Focus have?
        </h1>
        <p className="mb-3">
          The current GMAT has Quantitative reasoning, Verbal reasoning,
          Integrated Reasoning, and Analytical writing assessment. The new GMAT
          Focus Edition has just three sections: Quantitative reasoning, Verbal
          reasoning, and Data insights. This means no more essay section which
          will be welcome news to many students.
        </p>
        <img
          className="mb-3"
          src={
            "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702484581/jcuszxrvwaidtx4x08aw.png"
          }
          alt=""
        />

        <p className="mb-3">
          The current GMAT has multiple-choice questions plus an essay section.
          The new GMAT Focus Edition removes the essay section and has all
          multiple-choice questions.
        </p>
        <p className="mb-3">
          The current GMAT has the order of the sections defined, but the new
          GMAT Focus Edition allows you to complete sections in any order you
          prefer.
        </p>
        <p className="mb-3">
          The new GMAT Focus Edition is flexible. You can bookmark and review as
          many questions as possible. Change up to 3 answers per section. The
          current GMAT has no option to bookmark, edit, or review questions and
          answers.
        </p>
        <p>
          Score sending is improved with the GMAT Focus Edition. You can send
          results to 5 schools for free after you know your score in both the
          online and the test centers. The current GMAT allows you to select
          five schools to send the score for free before starting the exam.
        </p>
      </div>
    </div>
  );
};

export default GMATFocusContent;
