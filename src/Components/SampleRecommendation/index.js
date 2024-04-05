import React from "react";
import NavBar from "../../Layout/nav-bar";
import { SampleRecommendationLetterStyled } from "./style";
import { DoubleRightOutlined } from "@ant-design/icons";
import { useApplicationContext } from "../../Context/app-context";
import FooterComponent from "../../Layout/footer";
import DownloadSampleDoc from "./download";
import sampleLetter1 from "../../Documents/Sample recommendation letter 1.docx";
import sampleLetter2 from "../../Documents/Sample Recommendation letter 2.docx";
import sampleRecommendation1 from "../../Documents/SAMPLE RECOMMENDATION 1.docx";
import sampleRecommendation2 from "../../Documents/Sample Recommendation 2.docx";

const SampleRecommendationLetter = () => {
  const { isMobile } = useApplicationContext();
  return (
    <div>
      <NavBar />
      <SampleRecommendationLetterStyled>
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
            <h1 className="mb-3" style={{ fontSize: isMobile ? "" : "3.5rem" }}>
              Letter of recommendation
            </h1>

            <p className="col-10 offset-1" style={{ fontSize: "16px" }}>
              Use this sample of recommendation letter to give references to a
              former student or a former team member. Tailor this sample to fit
              your feedback on that specific person.
            </p>
          </div>
        </div>

        <div className="container  text-left  py-3 mt-3">
          <div className="d-lg-flex justify-content-between">
            <div className="col-lg-7 pr-lg-5 border-lg-right">
              <div className="section mb-5 ">
                <div className="d-lg-flex justify-content-between mb-3">
                  <h3 className="mb-3 mb-lg-0 text-primary">Sample Letter 1</h3>
                  <DownloadSampleDoc docPath={sampleLetter1} />
                </div>

                <div className="recommendation card px-3 py-3 shadow ">
                  <p>To Whom it May Concern:</p>
                  <p>
                    I would like to recommend Becky James for your MBA program.
                    Becky has worked as my assistant for the last three years.
                    During that time, she has been moving toward her goal of
                    enrolling in an MBA program by building her interpersonal
                    skills, honing her leadership ability, and gaining hands-on
                    experience in operations management.
                  </p>
                  <p>
                    As Becky's direct supervisor, I have seen her demonstrate
                    strong critical thinking skills and the leadership
                    capabilities necessary for success in the management field.
                    She has helped our company achieve many goals through her
                    valuable input as well as a persistent dedication to our
                    organizational strategy. For example, just this year Becky
                    helped to analyze our production schedule and suggested an
                    effective plan to manage bottlenecks in our production
                    process. Her contributions helped us achieve our goal of
                    minimizing scheduled and unscheduled downtime.
                  </p>
                  <p>
                    Becky may be my assistant, but she has risen to an
                    unofficial leadership role. When team members in our
                    department aren't sure what to do in a given situation, they
                    often turn to Becky for her thoughtful advice and support on
                    various projects. Becky never fails to assist them. She is
                    kind, humble, and seems very comfortable in a leadership
                    role. Several of her fellow employees have come into my
                    office and expressed unsolicited compliments in regards to
                    Becky's personality and performance.
                  </p>
                  <p>
                    I believe that Becky will be able to contribute to your
                    program in a number of ways. Not only is she well-versed in
                    the field of operations management, she also has a
                    contagious enthusiasm that encourages those around her to
                    work harder and achieve solutions for both personal and
                    professional problems. She knows how to work well as part of
                    a team and is able to model appropriate communications
                    skills in almost any given situation.
                  </p>
                  <p>
                    For these reasons, I highly recommend Becky James as a
                    candidate for your MBA program. If you have any questions
                    regarding Becky or this recommendation, please contact me.
                  </p>
                </div>
              </div>
              <div className="section mb-5 ">
                <div className="d-lg-flex justify-content-between mb-3">
                  <h3 className="mb-3 mb-lg-0 text-primary">Sample Letter 2</h3>
                  <DownloadSampleDoc docPath={sampleLetter2} />
                </div>
                <div className="recommendation card px-3 py-3 shadow">
                  <p>To Whom it May Concern:</p>
                  <p>
                    I have worked closely with Julie Johnson for the past two
                    years during which time she served as a peer advisor in the
                    Career Services Office at Concord College.
                  </p>
                  <p>
                    I found Ms. Johnson to be an exceptionally motivated and
                    talented young woman who comported herself well in all the
                    endeavors she undertook. I firmly believe that she will be
                    successful in whatever she pursues.
                  </p>
                  <p>
                    Ms. Johnson has a very sharp and inquisitive mind. She is
                    also very perceptive and able to read people and situations
                    with a great deal of accuracy.
                  </p>
                  <p>
                    Julie is strongly committed to the organizations for which
                    she works and I am confident that as she continues to mature
                    she will be an asset to society. She assertively addresses
                    problems and exhibits a maturity beyond her years in her
                    approach to situations.
                  </p>
                  <p>
                    Julie has digested large volumes of information in her role
                    as Career Peer Advisor. She has shown the ability to clearly
                    explain complex concepts to our clientele and has developed
                    very strong relationships with her peers and our
                    professional staff.
                  </p>
                  <p>
                    I am very comfortable with allowing Julie to represent the
                    office to external constituents. This confidence was
                    evidenced by my recent decision to have Julie accompany a
                    group of seniors to a recruiting conference. She effectively
                    interfaced with corporate representatives and gathered a
                    great number of employment leads for students back on
                    campus.
                  </p>
                  <p>
                    In conclusion, I am certain that Julie will shine as a
                    graduate student and go on to become a very accomplished
                    business person. She possesses the right combination of
                    drive, intelligence, and interpersonal skills required to
                    excel in school, and in life.
                  </p>
                  <p>
                    Please feel free to contact me if you have any questions
                    about this extraordinary young woman.
                  </p>
                </div>
              </div>
              <div className="section mb-5 ">
                <div className="d-lg-flex justify-content-between mb-3">
                  <h3 className="mb-3 mb-lg-0 text-primary">
                    Sample Recommendation 1
                  </h3>
                  <DownloadSampleDoc docPath={sampleRecommendation1} />
                </div>
                <div className="recommendation recommendation card px-3 py-3 shadow">
                  <p>
                    <strong>1) Context of Interaction:</strong>
                  </p>
                  <p>
                    I first met Sanjay in late 2007 when he joined Universal
                    Business Group as an Analyst. Since then, his
                    responsibilities have increased in proportion with his
                    growing role at the company. He was promoted to Senior
                    Analyst in 2009, and we have worked together extensively on
                    various projects throughout his tenure here. I have happily
                    recommended him for a recent promotion into a Manager
                    position reporting directly to me.
                  </p>
                  <p>
                    Early on as a new hire, I identified Sanjay’s ability to
                    combine analytical skills with an intuitive sense of client
                    needs, and frequently chose him to lead projects within my
                    group focused on identifying both new markets and unexplored
                    matches between company products and client desires. In this
                    capacity, Sanjay frequently worked with me both internally,
                    to generate both creative ideas and useful analytics, and
                    externally, in a direct client facing role supporting some
                    of our most complicated business-to-business negotiations.
                  </p>

                  <p>
                    <strong>2) Constructive Feedback:</strong>
                  </p>
                  <p>
                    One of Sanjay’s positive qualities is his ability to absorb
                    constructive criticism and make immediate changes to
                    implement it. He also actively seeks out feedback,
                    indicative of his desire to continually improve his
                    performance in all areas. During a recent client meeting, I
                    asked Sanjay to lead the presentation on a new product we
                    wanted to partner with the client on.
                  </p>
                  <p>
                    Sanjay was not as prepared as he normally is and stumbled a
                    bit on the subsequent client questions that delved into some
                    of our cost structure. I was able to step in and provide an
                    answer that satisfied their concerns. Later, Sanjay asked me
                    how he could have more effectively deflected the question. I
                    was impressed that Sanjay wanted to handle more of the
                    communication himself, and I think it reflects on his
                    proactive desire to handle the client relationship
                    effectively.
                  </p>

                  <p>
                    <strong>3) Success in Team Interaction:</strong>
                  </p>
                  <p>
                    Sanjay has an ability I find rare in smart young analysts,
                    and that is the ability to identify conclusions he sees as
                    self-evident, and explain his own reasoning in a measured
                    way to generate discussion with similarly.
                  </p>
                </div>
              </div>
              <div className="section mb-5 ">
                <div className="d-lg-flex justify-content-between mb-3">
                  <h3 className="mb-3 mb-lg-0 text-primary">
                    Sample Recommendation 2
                  </h3>
                  <DownloadSampleDoc docPath={sampleRecommendation2} />
                </div>
                <div className="recommendation recommendation card px-3 py-3 shadow">
                  <p>
                    <strong>1) Context of Interaction:</strong>
                  </p>
                  <p>
                    Henry joined Enviro-Energy International Inc. a little over
                    three years ago. At the time, new associates of
                    Enviro-Energy were expected to work with their managers for
                    several years to learn the complex emerging market for
                    renewable energy technologies before moving into positions
                    with direct reports and geographic market responsibilities.
                    I had already gotten to know Henry’s work through his
                    analysis of market opportunities in wind power in our most
                    important new markets in China and South Korea when EEII
                    acquired a smaller firm. Though Henry was a newer employee,
                    I trusted his track record thus far and put him in charge of
                    a small team absorbed from the smaller company.
                  </p>

                  <p>
                    <strong>2) Performance Comparison:</strong>
                  </p>
                  <p>
                    Henry stepped into a role two years ago that is, on average,
                    filled by an Enviro-Energy employee with three to five years
                    of experience with the company. I find that even for very
                    bright, well-educated individuals, it takes several years of
                    work to fully grasp this rapidly changing industry, and to
                    achieve a level of comfort that then allows for innovation
                    and leadership. Henry’s ability to produce clear analysis
                    backed up by logical explanations and arguments was apparent
                    right from his start here, and I would normally have placed
                    him on a fast track to the next role consistent with the
                    highest performers in a recruitment class.
                  </p>

                  <p>
                    <strong>3) Constructive Feedback:</strong>
                  </p>
                  <p>
                    Our acquisition required us to travel extensively through
                    China and South Korea from our home base in San Jose. These
                    trips often required Henry’s team to hit the ground running
                    after a long flight, frequently jumping into detailed
                    presentations at meetings starting only an hour or two after
                    landing. At one point, our flight was delayed a few hours,
                    and a sluggish and jetlagged team had to move straight into
                    a presentation- I noticed because I was certainly not
                    immune!
                  </p>

                  <p>
                    <strong>4) Additional Statements:</strong>
                  </p>
                  <p>
                    Henry’s position with Enviro-Energy calls for him to use his
                    sharp analytical skills on a daily basis in a fast-paced,
                    demanding work environment, and his position as a team
                    leader means his interpersonal and leadership skills are
                    tested on a daily basis. However, even on a team with a
                    well-defined goal I have seen Henry’s creativity shine
                    through, as he is constantly searching for ways for EEII to
                    improve and tackle new challenges. It’s even easier to see
                    this side of Henry outside of the workplace- part of his
                    ability to get his team through a tough transition is
                    expressed by his constant positivity and energy. It’s not
                    every team leader who will organize a weekly kickball league
                    and get 100 attendance from his department, or will harness
                    his hobbyist interest in programming to create an iPhone
                    game from scratch over a weekend for a coworker’s child’s
                    birthday. Henry is that team leader, and I feel his
                    combination of these qualities will lead him to success at
                    Stanford.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 pl-3">
              <div className="section mb-5">
                <h2 className="mb-3 text-primary">
                  What is a Recommendation Letter?
                </h2>
                <p>
                  A recommendation letter is a formal document written by
                  someone who knows an individual well and can speak to their
                  qualifications and character. It is often requested by
                  schools, employers, or organizations as part of the
                  application process.
                </p>
              </div>

              <div className="section">
                <div className="mb-5">
                  <h2 className="mb-3 text-primary">
                    How to Write a Recommendation Letter
                  </h2>
                  <p>
                    Writing a recommendation letter is a crucial task that
                    requires attention to detail and a thorough understanding of
                    the individual's qualifications. Below are detailed steps to
                    guide you through the process:
                  </p>
                </div>

                <div className="mb-5">
                  <h4 className="mb-3">1. Introduction</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Begin by
                      introducing yourself and your relationship with the person
                      you're recommending
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Clearly
                      state your position or role and how you know the
                      individual, including the duration and context of your
                      relationship.
                    </li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h4 className="mb-3">2. Overview of the Individual</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Provide a
                      brief overview of the individual's background, including
                      their academic or professional achievements and relevant
                      experiences
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Highlight
                      any notable accomplishments or contributions that
                      demonstrate their skills and capabilities.
                    </li>
                  </ul>
                </div>
                <div className="mb-5">
                  <h4 className="mb-3">3. Specific Examples and Anecdotes</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Use
                      specific examples and anecdotes to illustrate the
                      individual's skills, achievements, and character traits.
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Provide
                      detailed descriptions of situations where the individual
                      demonstrated their strengths, such as problem-solving
                      abilities, leadership skills, or teamwork.
                    </li>
                  </ul>
                </div>
                <div className="mb-5">
                  <h4 className="mb-3">4. Skills and Qualities</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Identify
                      and discuss the key skills and qualities that make the
                      individual well-suited for the position or program.
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Include
                      examples that showcase their abilities in areas such as
                      communication, critical thinking, creativity, and
                      adaptability.
                    </li>
                  </ul>
                </div>
                <div className="mb-5">
                  <h4 className="mb-3">
                    5. Academic or Professional Performance
                  </h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Evaluate
                      the individual's academic or professional performance, if
                      applicable
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Discuss
                      their performance in courses, projects, or assignments,
                      highlighting any exceptional achievements or areas of
                      improvement.
                    </li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h4 className="mb-3">6. Character Assessment</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Assess
                      the individual's character and personal qualities, such as
                      integrity, reliability, and professionalism.
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Share
                      your observations and experiences that demonstrate the
                      individual's character strengths and ethical conduct.
                    </li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h4 className="mb-3">7. Endorsement and Recommendation</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Conclude
                      the letter with a strong endorsement and recommendation
                      for the individual.
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Clearly
                      state your confidence in the individual's ability to
                      succeed in the position or program.
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Express
                      your willingness to provide further information or answer
                      any questions that the recipient may have.
                    </li>
                  </ul>
                </div>

                <div>
                  {" "}
                  <h3>8. Closing</h3>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Close the
                      letter with a polite and professional closing, such as
                      "Sincerely" or "Best Regards."
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Sign the
                      letter with your name and title, and include your contact
                      information for follow-up inquiries.
                    </li>
                  </ul>
                </div>
                <div className="mb-5">
                  <h4 className="mb-3">9. Proofreading and Finalization</h4>
                  <ul>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Before
                      finalizing the letter, carefully proofread it for grammar,
                      spelling, and punctuation errors.
                    </li>
                    <li>
                      <DoubleRightOutlined className="text-primary" /> Ensure
                      that the letter is well-organized, coherent, and free of
                      any inconsistencies or inaccuracies.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SampleRecommendationLetterStyled>
      <FooterComponent />
    </div>
  );
};

export default SampleRecommendationLetter;
