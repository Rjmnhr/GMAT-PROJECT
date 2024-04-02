import styled from "styled-components";

export const ProfilerPageStyled = styled.div`
  .background-container {
    background: url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1700829772/esg3s03v8mowch7yfzat.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
  }

  .ant-progress.ant-progress-circle .ant-progress-text {
    font-size: 10px;
  }

  .MuiTabs-indicator {
    position: absolute;
    height: 5px !important;
    bottom: 0px;
    width: 100%;
    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: rgb(0, 128, 128) !important;
  }

  .MuiButtonBase-root  {
    border-bottom: 5px solid #cfcecc !important;
    padding: 0 !important;
    margin-left: 15px !important;
  }

  .Mui-selected {
    color: rgb(0, 128, 128) !important;
  }

  @media (max-width: 912px) {
    .background-container {
      background: none;
    }
    .MuiTabs-root .MuiBox-root {
      padding: 0;
    }
  }
`;
