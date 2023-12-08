import styled from "styled-components";

export const ApplicationStrategyOutputStyled = styled.div`
  .skill-matrix {
    border-collapse: collapse;
    width: 100%;
  }

  .skill-matrix th {
    margin-bottom: 5px;
  }
  .skill-matrix th,
  .skill-matrix td {
    border: none;
    padding: 5px;
    text-align: center;
  }

  .skill-matrix td {
    border-bottom: 1px solid #dddddd;
  }

  .skill-matrix th {
    background-color: #f2f2f2;
  }
`;
