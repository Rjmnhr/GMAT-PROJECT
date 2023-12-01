import styled from "styled-components";

export const ProfilerPageStyled = styled.div`
  .background-container {
    background: url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1700829772/esg3s03v8mowch7yfzat.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
  }

  .css-1aquho2-MuiTabs-indicator {
    position: absolute;
    height: 5px;
    bottom: 0px;
    width: 100%;
    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: rgb(0, 128, 128);
  }

  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: rgb(0, 128, 128);
  }

  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    border-bottom: 5px solid #cfcecc;
    padding: 0;
    margin-left: 15px;
  }
  @media (max-width: 912px) {
    .background-container {
      background: none;
    }
  }
`;
