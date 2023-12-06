import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import NavBar from "../../components/nav-bar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { categories } from "../../components/youtube-videos";
import { Card, Skeleton } from "antd";
const { Meta } = Card;

export const VideoPlayer = ({ videoId, title }) => {
  const [isLoading, setIsLoading] = useState(true); // create a loading state

  const apiKey = "AIzaSyB_CXM0xSppTVHYT-cFxVDm_d_uV1lckBU";
  const opts = {
    height: "195",
    width: "320",
    playerVars: {
      autoplay: 0, // 1 for autoplay

      apiKey: apiKey, // Add the apiKey property here
    },
  };

  const handleVideoReady = () => {
    setIsLoading(false); // set loading state to false when video is loaded
  };

  return (
    <div>
      <Card
        style={{
          width: "100%",
          border: "none",
        }}
        cover={
          <div>
            <div className={`${isLoading ? "d-none" : ""}`}>
              <YouTube
                videoId={videoId}
                opts={opts}
                onReady={handleVideoReady}
              />
            </div>
            <div className={`${isLoading ? "" : "d-none"} p-2`}>
              <Skeleton />
            </div>
          </div>
        }
      >
        <Meta title={title} />
      </Card>
    </div>
  );
  // <div
  //   className="card border m-1 bg-light d-flex flex-column align-items-stretch"
  //   style={{ padding: "0", height: "300px" }}
  // >

  //   <YouTube videoId={videoId} opts={opts} />
  //   <p
  //     style={{ fontWeight: "bold", width: "320px" }}
  //     className="mt-1 mb-3 px-3 text-left"
  //   >
  //     {title}
  //   </p>
  // </div>
};

const VideoCarousel = ({ videos }) => {
  const slider = React.useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState(isMobile ? 1 : 8); // Number of initially visible videos
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setVisibleVideos(2);
      } else {
        setVisibleVideos(8);
      }
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    beforeChange: (current, next) => {
      // Your original beforeChange logic
      if (next + visibleVideos === videos.length) {
        setVisibleVideos((prevVisible) =>
          Math.min(prevVisible + 4, videos.length)
        );
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider ref={slider} {...settings}>
        {videos.slice(0, visibleVideos).map((video) => (
          <VideoPlayer
            key={video.videoId}
            videoId={video.videoId}
            title={video.title}
          />
        ))}
      </Slider>
      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <LeftOutlined onClick={() => slider?.current?.slickPrev()} />
        <RightOutlined onClick={() => slider?.current?.slickNext()} />
      </div>
    </div>
  );
};

const categoryNames = [
  "GMAT Quant videos",
  "GMAT Verbal videos",
  "GMAT IR",
  "Profile building",
  "Essays for college admissions",
  "College admits and successful students",
  "Others",
];
const VideosPage = () => {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "100px" }}>
        <div className="section-title my-3">
          <h2>Adeft Consulting</h2>
        </div>
        {categories.map((videos, index) => (
          <div key={index} className="mb-3">
            <div className="ml-3  text-left d-lg-flex justify-content-between align-items-center mb-3">
              <h4 className="text-primary" style={{ fontWeight: "bold" }}>
                {categoryNames[index]}
              </h4>
              <Link
                style={{ marginRight: "20px" }}
                to={`/category-videos?v=${categoryNames[index]
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <span className=" d-flex justify-content-lg-between align-items-center">
                  {" "}
                  See more {""} <RightOutlined />
                </span>
              </Link>
            </div>
            <VideoCarousel videos={videos} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
