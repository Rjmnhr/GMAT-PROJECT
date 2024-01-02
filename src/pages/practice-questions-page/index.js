import { RightOutlined } from "@ant-design/icons";
import React from "react";
import { Card } from "antd";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
import { PracticeQuestionsPageStyled } from "./style";
import { Helmet } from "react-helmet";
const categoryNames = [
  "Quantitative Reasoning Questions",
  "Verbal Reasoning Questions",
  "Integrated Reasoning Questions",
];

const PracticeQuestionsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Practice Questions | Adeft Education</title>
        <meta
          name="description"
          content="Transform your MBA aspirations into reality with Adeft Education - a trusted consultancy with over three decades of post-MBA expertise"
        />
        <meta
          property="og:description"
          content="Transform your MBA aspirations into reality with Adeft Education - a trusted consultancy with over three decades of post-MBA expertise"
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />
      <PracticeQuestionsPageStyled>
        <div
          style={{
            background: "#62b9bf",
            paddingTop: "100px",
            minHeight: "100vh",
          }}
        >
          <div style={{}} className="section-title">
            <h2>GMAT Practice Questions</h2>
          </div>
          <div
            className="p-3 tex-left"
            style={{
              display: "grid",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            {categoryNames.map((category, index) => {
              return (
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/category-questions?q=${categoryNames[index]
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    )
                  }
                  className="col-12 col-lg-8 mb-3 test-card"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="m-0">{category}</h3>
                    <RightOutlined />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </PracticeQuestionsPageStyled>
    </>
  );
};

export default PracticeQuestionsPage;
