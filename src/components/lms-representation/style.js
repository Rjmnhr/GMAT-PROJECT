import styled from "styled-components";

export const LMSRepresentationStyled = styled.div`
  /* MyComponent.css */

  /* MyComponent.css */
  /* MyComponent.css */

  .circle-container {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 50px auto;
  }

  .big-circle {
    width: 100px;
    height: 100px;
    border: 1px solid #ecf0f1;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1); /* Adjust the gap by modifying the last value (10px) */
  }

  .small-circle {
    width: 150px;
    height: 150px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    color: black;
    transition: background-color 0.3s, color 0.3s; /* Add transition effect for background-color and color */
    font-weight: 500;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1); /* Adjust the gap by modifying the last value (10px) */
  }

  .small-circle:hover {
    background: #12486b;
    color: white;
    cursor: pointer;
  }

  .left::before,
  .right::before {
    content: "";
    position: absolute;
    width: calc(
      25% + 1px
    ); /* Adjust to connect to the center of the small circle */
    height: 2px; /* Line height */
    background-color: #ecf0f1; /* Line color */
  }

  .top::before,
  .bottom::before {
    content: "";
    position: absolute;
    width: 2px; /* Adjust to connect to the center of the small circle */
    height: calc(25% + 1px); /* Line height */
    background-color: #ecf0f1; /* Line color */
  }
  .top {
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
  }

  .top::before {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .right {
    top: 50%;
    right: -50px;
    transform: translateY(-50%);
  }

  .right::before {
    top: 50%;
    left: -25%;
    transform: translateY(-50%);
  }

  .bottom {
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  }

  .bottom::before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .left {
    top: 50%;
    left: -50px;
    transform: translateY(-50%);
  }

  .left::before {
    top: 50%;
    right: -25%;
    transform: translateY(-50%);
  }

  .product-card img {
    width: 100%;
    height: 100%;
  }

  .hover-card {
    background-color: rgba(71, 209, 195, 0.6);
  }
  .hover-sub-card {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .hover-sub-card:hover {
    background-color: transparent;
    color: #049494 !important;
    cursor: pointer;
  }
  .hover-card:hover {
    background-color: white;
  }
  @media (max-width: 728px) {
    .circle-container {
      width: 280px;
      height: 280px;
      margin: 50px auto;
    }

    .big-circle {
      width: 75px;
      height: 75px;
    }

    .small-circle {
      width: 100px;
      height: 100px;
      font-size: 14px;
    }
    .extra-block {
      width: 100%;
      height: 50px;
      background: #62b9bf;
    }
  }
`;
