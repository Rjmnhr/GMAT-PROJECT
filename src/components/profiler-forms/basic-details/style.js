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
  .ant-card .ant-card-body {
    padding: 10px;
  }
  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > td,
  .ant-table-wrapper tfoot > tr > th,
  .ant-table-wrapper tfoot > tr > td {
    position: relative;
    padding: 10px 10px;
    overflow-wrap: break-word;
  }

  .ant-select.ant-select-in-form-item {
    width: auto;
  }
  .age-cards,
  .college-cards {
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
  }

  .age-card {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow effect */

    padding: 0.575rem 1rem;
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
  .age-card:hover {
    border-color: 1px solid #e83e8c; /* Change border color on hover */
  }

  .selected-card {
    border: 2px solid #e83e8c;
  }

  .gender-options {
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
    gap: 10px;
    flex-wrap: wrap;
  }

  .gender-option {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .gender-option:hover {
    background-color: #1890ff; /* Change background color on hover */
  }

  .selected-option {
    background-color: #1890ff; /* Background color for selected option */
  }

  .gender-icon {
    font-size: 24px;
    color: white;
  }

  .work-experience-container,
  .graduate-container,
  .other-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .work-image-container img,
  .graduate-container img,
  .other-container img {
    width: 100%;
  }

  .work-image-container {
    flex-basis: 60%;
  }
  .form {
    flex-basis: 40%;
  }
  .other-image-container {
    flex-basis: 55%;
  }
  .form-other {
    flex-basis: 45%;
  }
  .graduate-image-container {
    flex-basis: 50%;
  }
  .form-graduate {
    flex-basis: 50%;
  }
  .section-title h2::after {
    left: 0 !important;
  }
  .tab-content {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .tab-content-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .icon-labels {
    height: 100;
    width: 100;
  }
`;
