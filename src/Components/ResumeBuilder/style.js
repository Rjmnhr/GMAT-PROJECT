import styled from "@emotion/styled";

export const ResumeBuilderStyled = styled.div`
  .resume-preview img {
    width: 100%;
  }

  .resume-input .info-box {
    color: #444444;
    text-align: center;
    box-shadow: 0 0 30px rgba(214, 215, 216, 0.6);
    padding: 20px 0 10px 0;
    border-radius: 4px;
  }

  .resume-input .info-box i {
    font-size: 32px;
    color: #049494;
    border-radius: 50%;
    padding: 8px;
    border: 2px dotted #f8d4d5;
  }

  .resume-input .info-box h3 {
    font-size: 20px;
    color: #777777;
    font-weight: 700;
    margin: 10px 0;
  }

  .resume-input .info-box p {
    padding: 0;
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 0;
  }

  .resume-input .php-email-form {
    box-shadow: 0 0 30px rgba(214, 215, 216, 0.6);
    padding: 30px;
    border-radius: 4px;
  }

  .resume-input .php-email-form .validate {
    display: none;
    color: red;
    margin: 0 0 15px 0;
    font-weight: 400;
    font-size: 13px;
  }

  .resume-input .php-email-form .error-message {
    display: none;
    color: #fff;
    background: #ed3c0d;
    text-align: left;
    padding: 15px;
    font-weight: 600;
  }

  .resume-input .php-email-form .error-message br + br {
    margin-top: 25px;
  }

  .resume-input .php-email-form .sent-message {
    display: none;
    color: #fff;
    background: #18d26e;
    text-align: center;
    padding: 15px;
    font-weight: 600;
  }

  .resume-input .php-email-form .loading {
    display: none;
    background: #fff;
    text-align: center;
    padding: 15px;
  }

  .resume-input .php-email-form .loading:before {
    content: "";
    display: inline-block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 0 10px -6px 0;
    border: 3px solid #18d26e;
    border-top-color: #eee;
    -webkit-animation: animate-loading 1s linear infinite;
    animation: animate-loading 1s linear infinite;
  }

  .resume-input .php-email-form input,
  .resume-input .php-email-form textarea {
    box-shadow: none;
    font-size: 14px;
    border-radius: 4px;
  }

  .resume-input .php-email-form input:focus,
  .resume-input .php-email-form textarea:focus {
    border-color: #111111;
  }

  .resume-input .php-email-form input {
    padding: 20px 15px;
  }

  .resume-input .php-email-form textarea {
    padding: 12px 15px;
  }

  .resume-input .php-email-form button[type="submit"] {
    background: #049494;
    border: 0;
    padding: 10px 32px;
    color: #fff;
    transition: 0.4s;
    border-radius: 4px;
  }

  .resume-input .php-email-form button[type="submit"]:hover {
    background: #e35052;
  }

  .resume-input input,
  textarea {
    background: #e8e8e8;
    border: none;
  }
`;
