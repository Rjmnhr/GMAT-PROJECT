import styled from "styled-components";

export const ChancesOfSelectionStyled = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .clock {
    position: relative;
    width: 500px; /* Adjust the width and height as per your requirement */
    height: 500px;
    border-radius: 50%;
    border: 2px solid #000; /* Add border for the outer circle */
  }

  .clock .number {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    transform: rotate(var(--rotation));
    border: 1 px solid #000; /* Add border for the outer circle */
    display: grid;
    align-content: space-between;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* Hide overflow to create the cut effect */
  }

  .child-number {
    position: relative;
    overflow: hidden;
    width: 60%;
    margin: 0 auto;
  }

  .child-number::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    transform-origin: top;
    transform: skew(60deg);
  }

  .child-number::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    transform-origin: top right;
    transform: skew(-30deg);
  }

  .clock .number1 {
    --rotation: 30deg;
  }
  .number2 {
    --rotation: 60deg;
  }
  .number3 {
    --rotation: 90deg;
  }
  .number4 {
    --rotation: 120deg;
  }
  .number5 {
    --rotation: 150deg;
  }
  .number6 {
    --rotation: 180deg;
  }
  .number7 {
    --rotation: 210deg;
  }
  .number8 {
    --rotation: 240deg;
  }
  .number9 {
    --rotation: 270deg;
  }
  .number10 {
    --rotation: 300deg;
  }
  .number11 {
    --rotation: 330deg;
  }
  .number12 {
    --rotation: 360deg;
  }

  .outer-circle {
    position: absolute;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    overflow: hidden;
    background-color: gray;
    transform: translate(-50%, -50%); /* Center the sticker */
    top: 50%;
    left: 50%;
  }
  .outer-container {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-sticker {
    position: absolute;
    width: 70%; /* Adjust the width and height as per your requirement */
    height: 70%;
    border-radius: 50%;
    background-image: url("https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701169635/mjyhrx7lx2v8fn5tpksh.png");
    background-size: cover;
    background-position: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the sticker */
    background-color: white;
  }
`;
