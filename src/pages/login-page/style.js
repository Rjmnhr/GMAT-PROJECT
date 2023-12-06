import { styled } from "styled-components";

export const LoginPageStyled = styled.div`
  .main-container {
    display: flex;
    align-items: center;
  }

  .left-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: black;
    color: white;
    padding: 20px;
    text-align: left;
  }

  .right-container {
    width: 60%;
    display: grid;
    place-items: center;
    height: 100vh;
    padding: 20px;
    background: rgb(248, 248, 248);
  }

  [id^="otp"] {
    margin: 5px;
  }

  .img_container {
    position: relative;
  }

  .img_container::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  @media (max-width: 912px) {
    .left-container {
      display: none;
    }
    .right-container {
      width: 100%;
    }
  }
`;
