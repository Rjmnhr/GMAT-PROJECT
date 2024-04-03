import React from "react";

export const SectionDividerFocusQuant = () => {
  return (
    <>
      <div className="container p-3 ">
        <h3 className="mb-3">Quantitative Section Instructions</h3>
        <h4>21 Questions </h4>

        <h4>Time - 45 minutes</h4>
        <p className="mb-3 text-left fs-4 ">
          When you take the GMAT exam, you will have a specific amount of time
          to review these instructions. In the GMAT Official Practice Exams,
          this instruction screen is not timed, so you may want to spend extra
          time reviewing it.
        </p>
        <p className="mb-3 text-left fs-4">
          In the Quantitative section, there are two types of questions: Problem
          Solving and Data Sufficiency.
        </p>
        <p className="mb-3 text-left fs-4">
          For each Problem Solving question, solve the problem and select the
          best of the answer choices give.
        </p>

        <p className="mb-3 text-left fs-4">
          Each Data Sufficiency problem consists of a question and two
          statements, labeled (1) and (2), which contain certain data. Using
          these data and your knowledge of mathematics and everyday facts (such
          as the number of days in July or the meaning of the word
          counterclockwise), decide whether the data given are sufficient for
          answering the question and then select one of the following answer
          choices:
        </p>

        <ul className="mb-3 text-left ">
          <li>
            {" "}
            <p className="text-left fs-4">
              Statement (1) ALONE is sufficient, but statement (2) alone is not
              sufficient to answer the question asked
            </p>
          </li>
          <li>
            <p className="text-left fs-4">
              Statement (2) ALONE is sufficient, but statement (1) alone is not
              sufficient to answer the question asked
            </p>
          </li>
          <li>
            <p className="text-left fs-4">
              BOTH statements (1) and (2) TOGETHER are sufficient to answer the
              question asked, but NEITHER statement ALONE is sufficient to
              answer the question asked.
            </p>
          </li>
          <li>
            <p className="text-left fs-4">
              EACH statement ALONE is sufficient to answer the question asked.
            </p>
          </li>
          <li>
            <p className="text-left fs-4">
              Statements (1) and (2) TOGETHER are NOT sufficient to answer the
              question asked, and additional data specific to the problem are
              needed.
            </p>
          </li>
        </ul>

        <p className="text-left fs-4">
          Note: In data sufficiency problems that ask for the value of a
          quantity, the data given in the statements are sufficient only when it
          is possible to determine exactly one numerical value for the quantity.
        </p>
      </div>
    </>
  );
};

export const SectionDividerFocusVerbal = () => {
  return (
    <div className="container p-3 ">
      <h3 className="mb-3">Verbal Section Instructions</h3>
      <h4>23 Questions</h4>

      <h4>Time - 45 minutes</h4>
      <p className="mb-3 text-left fs-4 ">
        When you take the GMAT exam, you will have a specific amount of time to
        review these instructions. In the GMAT Official Practice Exams, this
        instruction screen is not timed, so you may want to spend extra time
        reviewing
      </p>
      <p className="mb-3 text-left fs-4">
        There are three types of questions in the Verbal section: Critical
        Reasoning, Reading Comprehension, and Sentence Correction.
      </p>
      <p className="mb-3 text-left fs-4">
        For each question, select the best answer of the choices given.
      </p>

      <p className="mb-3 text-left fs-4">
        Each of the Critical Reasoning questions is based on a short argument, a
        set of statements, or a plan of action.
      </p>

      <p className="text-left fs-4">
        Each of the Reading Comprehension questions is based on the content of a
        passage. After reading the passage, answer all questions pertaining to
        it on the basis of what is stated or implied in the passage.
      </p>

      <p className="mb-3 text-left fs-4">
        Each of the Sentence Correction questions presents a sentence, part or
        all of which is underlined. Beneath the sentence you will find five ways
        of phrasing the underlined part. The first of these repeats the
        original; the other four are different. Follow the requirements of
        standard written English to choose your answer, paying attention to
        grammar, word choice, and sentence construction. Select the answer that
        produces the most effective sentence: your answer should make the
        sentence dear, exact, and free of grammatical error. It should also
        minimize awkwardness, ambiguity, and redundancy.
      </p>
    </div>
  );
};

export const SectionDividerFocusDataInsights = () => {
  return (
    <div className="container p-3 ">
      <h3 className="mb-3">Data Insights Instructions</h3>
      <h4>20 Questions</h4>

      <h4>Time - 45 minutes</h4>
      <p className="mb-3 text-left fs-4 ">
        Several question types are used in Data Insights. Some require use of
        both quantitative and verbal skills. Some involve use of graphics,
        tables, or text material. The questions also use various response
        formats.
      </p>
      <p className="mb-3 text-left fs-4">
        There are four question formats in this section:
      </p>
      <p className="mb-3 text-left fs-4">
        Multi-Source Reasoning. Click on the tabs and examine all the relevant
        information from text, charts, and tables to answer the questions.
      </p>

      <p className="mb-3 text-left fs-4">
        Table Analysis. A table is to be analyzed to find whether answer
        statements are accurate.
      </p>

      <p className="text-left fs-4">
        Graphics Interpretation. Interpret a graph or graphical image and select
        the option from a drop-down list to accurately complete response
        statements.
      </p>

      <p className="mb-3 text-left fs-4">
        Two-Part Analysis. Two-component task is presented for a solution, with
        answer options provided in a two-column table format.
      </p>

      <p className="mb-3 text-left fs-4">
        For each question, review the text, graphic, or text material provided
        and respond to the task that is presented.
      </p>
    </div>
  );
};
