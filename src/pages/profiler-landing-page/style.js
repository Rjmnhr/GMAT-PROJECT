import styled from "@emotion/styled";

export const ProfilerLandingPageStyled = styled.div`
  #hero::before {
    background: white !important;
  }

  #hero h2,
  h1,
  a {
    color: black !important;
  }

  .cta {
    position: relative;
    margin: auto;
    padding: 12px 18px;
    transition: all 0.2s ease;
    border: none;
    background: none;
    cursor: pointer;
  }

  .cta:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: #049494;
    height: 50px;
    transition: all 0.3s ease;
    width: 100%;
  }

  .cta span {
    position: relative;
    font-family: "Ubuntu", sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: white;
  }

  .cta svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: white;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  .cta:hover:before {
    width: 100%;
  }

  .cta:hover svg {
    transform: translateX(0);
  }

  .cta:active {
    transform: scale(1);
  }
`;
