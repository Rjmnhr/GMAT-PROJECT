import React, { useState } from "react";
import { hiringData } from "./hiring-data";
import NavBar from "../../Layout/nav-bar";
import { HiringCompaniesComponentStyled } from "./style";
import { Select } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
const { Option } = Select;
const HiringCompaniesComponent = () => {
  const [companyFilter, setCompanyFilter] = useState(hiringData[0].company);

  const handleFilterChange = (value) => {
    setCompanyFilter(value);
  };

  return (
    <div className="hiring-companies">
      <NavBar />
      <HiringCompaniesComponentStyled>
        <div
          className="  py-5 px-3 "
          style={{
            marginTop: "80px",
            background: "#c5e6e6",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div className="container ">
            <h1>Hiring Companies</h1>
            <p>
              Explore the companies and universities they hire from to find
              potential opportunities.
            </p>
          </div>
        </div>
        <div className="d-lg-flex container text-left py-3 mt-5">
          <div className="hiring-companies-content text-left  col-lg-6  ">
            <div style={{ display: "grid", placeItems: "" }}>
              <div className="">
                <h3 className="mb-3">Choose a company</h3>
                <Select
                  defaultValue={companyFilter}
                  style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
                  onChange={handleFilterChange}
                >
                  <Option value="">Select a company</Option>
                  {hiringData.map((companyObj, index) => (
                    <Option key={index} value={companyObj.company}>
                      {companyObj.company}
                    </Option>
                  ))}
                </Select>
              </div>
              <ul>
                {companyFilter &&
                  hiringData
                    .filter((companyObj) =>
                      companyFilter
                        ? companyObj.company === companyFilter
                        : true
                    )
                    .map((companyObj, index) => (
                      <li key={index}>
                        <h5 className="mb-3">
                          List of top colleges{" "}
                          <span className="text-primary">
                            {CapitalizeFirstLetter(companyObj.company)}
                          </span>{" "}
                          is hiring from
                        </h5>
                        <ul>
                          {companyObj.hires.map((hire, hireIndex) => (
                            <li
                              data-aos="fade-right"
                              data-aos-delay={`${hireIndex + 1}00`}
                              key={hireIndex}
                            >
                              <DoubleRightOutlined className="text-primary" />{" "}
                              {hire.school}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <p>
              <span className="text-primary">McKinsey</span>,{" "}
              <span className="text-primary">
                Boston Consulting Group (BCG)
              </span>
              , <span className="text-primary">Amazon</span>,{" "}
              <span className="text-primary">Deloitte</span>,{" "}
              <span className="text-primary">Avendus Capital</span>, and{" "}
              <span className="text-primary">Deutsche Bank</span> are the top
              companies hiring MBA graduates in India.
            </p>
            <p>
              According to the latest IIM Placement Reports of 2023,{" "}
              <span className="text-primary">McKinsey</span> and{" "}
              <span className="text-primary">BCG</span> were the top recruiters
              in IIM Ahmedabad Placements, with a total of 18 offers made by{" "}
              <span className="text-primary">McKinsey</span> and{" "}
              <span className="text-primary">BCG</span>. Similarly,{" "}
              <span className="text-primary">BCG</span> made a total of 26
              offers during the IIM Bangalore Placement 2023 session.
            </p>
            <p>
              These companies offered around INR 25 - 35 LPA depending on the
              job profile and sector.
            </p>
            <p>
              In the government sector, top recruiters include{" "}
              <span className="text-primary">BSNL</span>,{" "}
              <span className="text-primary">MTNL</span>,{" "}
              <span className="text-primary">ONGC</span>,{" "}
              <span className="text-primary">NTPC</span>, and public sector
              banks like <span className="text-primary">SBI</span>. In the
              private sector, top recruiters include{" "}
              <span className="text-primary">Reliance Industries Limited</span>,{" "}
              <span className="text-primary">
                Tata Consultancy Services (TCS)
              </span>
              , and <span className="text-primary">Infosys</span>. In the IT
              sector, <span className="text-primary">Amazon</span> is a leading
              recruiter. In the finance sector, top recruiters include{" "}
              <span className="text-primary">Goldman Sachs</span>,{" "}
              <span className="text-primary">Morgan Stanley</span>,{" "}
              <span className="text-primary">BCG</span>,{" "}
              <span className="text-primary">Bain and Company</span>,{" "}
              <span className="text-primary">JP Morgan Chase &amp; Co</span>,
              and <span className="text-primary">McKinsey and Co</span>. In the
              HR sector, top recruiters include{" "}
              <span className="text-primary">Reliance Industries Limited</span>,{" "}
              <span className="text-primary">TCS</span>, and{" "}
              <span className="text-primary">Infosys</span>.
            </p>
            <p>
              <span className="text-primary">Amazon</span>,{" "}
              <span className="text-primary">Apple</span>,{" "}
              <span className="text-primary">BCG</span>,{" "}
              <span className="text-primary">Deloitte</span>,{" "}
              <span className="text-primary">JP Morgan</span>,{" "}
              <span className="text-primary">Microsoft</span>,{" "}
              <span className="text-primary">Morgan Stanley</span>, and{" "}
              <span className="text-primary">Accenture</span> are among the top
              global recruiters for MBA graduates.
            </p>
          </div>
        </div>
      </HiringCompaniesComponentStyled>
    </div>
  );
};

export default HiringCompaniesComponent;

export const CapitalizeFirstLetter = (data) => {
  // Split the string into words
  const words = data?.split(" ");
  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words?.map((word) => {
    //    capitalize the first letter and make the rest lowercase
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back together with spaces
  return capitalizedWords?.join(" ");
};
