import React from "react";
import YouTube from "react-youtube";
import NavBar from "../../components/nav-bar";

export const VideoPlayer = ({ videoId, title }) => {
  const opts = {
    height: "195",
    width: "320",
    playerVars: {
      autoplay: 0, // 1 for autoplay
    },
  };

  return (
    <div
      className="card border m-1 bg-light d-flex flex-column align-items-stretch"
      style={{ padding: "0", height: "auto" }}
    >
      <YouTube videoId={videoId} opts={opts} />

      <p
        style={{ fontWeight: "bold", width: "320px" }}
        className="mt-1 mb-3 px-3 text-left  "
      >
        {title}
      </p>
    </div>
  );
};

const VideosPage = () => {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "100px" }}>
        <div className="section-title my-3">
          <h2>Adeft Consulting</h2>
        </div>
        <div className="d-flex flex-wrap justify-content-around mb-3  ">
          <VideoPlayer videoId={"HvpEReMgpX4"} title="Adeft MBA Decide" />

          <VideoPlayer
            videoId={"btQGWfga_HE"}
            title="Sentence correction | Demo class 2 | Adeft Consulting"
          />

          <VideoPlayer
            videoId={"Qgf3dDE8a5c"}
            title="
Adeft Webinar: MBA Admissions - Last second tricks and checklist before you hit submi"
          />

          <VideoPlayer
            videoId={"q42UOQwxzzk"}
            title="Testimonial | Manas Srivastava | Cornell Graduate MBA Class of 2020-21"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"kiOiuanML9U"}
            title="Webinar: How to make your applications stand out - Exclusively for round 2 applicants"
          />

          <VideoPlayer
            videoId={"RYcRdpnbz_U"}
            title="Testimonial | Tirth Ganatra | ESCP university admission holder along with Scholarship"
          />

          <VideoPlayer
            videoId={"ta3tV_aDb2E"}
            title="AdefBuilding a winning application profile - Exclusive webinar for ROUND 1 Education"
          />

          <VideoPlayer
            videoId={"ZB3bVQ2_VcQ"}
            title="Answering Wharton essays - Know about Top MBA essays. An Informative series"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"8xM_ATdCwho"}
            title="Webinar: Live question solving of CR and Unique strategies to get adapted by Indradeep Mazumdar"
          />
          <VideoPlayer
            videoId={"4b8oBSxCYE4"}
            title="Introduction to SAT and live question solving by Ansua Dutta - Live webinary"
          />

          <VideoPlayer
            videoId={"FAGslxEjWtg"}
            title="5 Most common MBA Essays - Live webinar by Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"6IHjmV-jJfs"}
            title="Debunking the myths of MBA Admission - Live webinar"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"ghvzpRsUxpw"}
            title="Introduction to our approach towards SAT coaching"
          />

          <VideoPlayer
            videoId={"Ya8nc49MroE"}
            title="Ankit's video testimonial for GMAT Coaching"
          />

          <VideoPlayer
            videoId={"3HzA7xinDDk"}
            title="Unique strategies to attempt Verbal questions - Live Interactive webinar"
          />

          <VideoPlayer
            videoId={"Fhohdv_iFnA"}
            title="Introduction to our GMAT Coaching Program"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"hWYnkKDtPK0"}
            title="Introduction to our Admission Consulting Program"
          />
          <VideoPlayer videoId={"MqktAocqJ-Y"} title="Your career goals" />

          <VideoPlayer
            videoId={"adBeErFO43I"}
            title="STEM Career Counseling for students - Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"apo4r8QNFTw"}
            title="Your unique life story for MBA admissions - Indradeep Mazumdar"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"4PYAhdceCg8"}
            title="The Journey of being admitted to a Top B School - One on One with Cornell admit"
          />

          <VideoPlayer
            videoId={"mJHrneLFWYo"}
            title="Key things admissions committees look for - Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"xGfj_Vfyap4"}
            title="STEM Career Counseling for students - Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"0poqJSWiZc4"}
            title="Career options after MBA"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"4N5VEVj7Gr0"}
            title="Study and Work Abroad - Indradeep Mazumdar"
          />
          <VideoPlayer
            videoId={"pXTQWbcg-Kk"}
            title="GMAT100 - Reading Comprehension 1 continued - Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"XLd1rJ3t55E"}
            title="GMAT100 - Reading Comprehension 1 - Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"tEo4grTryk4"}
            title="GMAT 100 - Sentence Correction 1"
          />
        </div>
        {/*--------------------------------------------------------------------------- */}
        <div className="d-flex flex-wrap justify-content-around mb-3 ">
          <VideoPlayer
            videoId={"lTys0y8Aw0c"}
            title="GMAT 100 - Critical Reasoning 1 - Indradeep Mazumdar"
          />

          <VideoPlayer
            videoId={"cb6ZdC7UvL0"}
            title="GMAT 100 - Sentence Correction 2"
          />

          <VideoPlayer
            videoId={"Y52K7s4Zv-0"}
            title="Sentence correction - Demo class"
          />

          <VideoPlayer
            videoId={"xO2mjfm52Ss"}
            title="ISB webinar - Getting the best out of an MBA ft. ISB Alum Anusha Rajagopalan and Tarun Mansukhani"
          />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
