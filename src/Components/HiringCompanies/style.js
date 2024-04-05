import styled from "styled-components";

export const HiringCompaniesComponentStyled = styled.div`
  .hiring-companies {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
  }

  .hiring-companies-content {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  select {
    font-size: 1rem;
    padding: 10px;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  .hiring-companies-content {
    text-align: center; /* Initially centered */
    transition: transform 0.3s ease; /* Add transition for smooth animation */
  }

  .results-visible {
    transform: translateX(-1%); /* Push to left when results are visible */
  }

  .select-container {
    width: 100%;
    display: inline-block;
    text-align: left; /* Align select options to the left */
  }
`;
