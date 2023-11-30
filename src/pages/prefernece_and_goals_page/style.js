import styled from "styled-components";

export const PreferenceAndGoalsPageStyled = styled.div`
  .ant-card .ant-card-body {
    padding: 10px 20px;
  }

  .age-cards,
  .college-cards {
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
  }

  .age-card {
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow effect */

    padding: 1rem 0.575rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .college-card {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow effect */

    margin-right: 12px;
    margin-top: 8px;
    margin-left: 0;
  }
  .college-card:hover {
    border-color: 1px solid #e83e8c; /* Change border color on hover */
  }
`;
