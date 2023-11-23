import styled from "styled-components";

export const BasicDetailsFormStyled = styled.div`
  .ant-form-item .ant-form-item-label {
    text-align: left;
  }
  .ant-form-item-required::before {
    display: none !important;
  }

  .custom-error-message {
    font-size: 10px;
  }

  .ant-form-item .ant-form-item-explain-error {
    font-size: 12px;
  }
`;
