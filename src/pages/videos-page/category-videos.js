import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd"; // Assuming you have Modal from antd
import NavBar from "../../Layout/nav-bar";
import YouTube from "react-youtube";
import { categories } from "./videos-data";

const categoryNames = [
  "GMAT Quant videos",
  "GMAT Verbal videos",
  "GMAT IR videos",
  "Profile building videos",
  "Essays for college admissions",
  "College admits and successful students",
  "Others",
];

const CategoryVideos = () => {
  const location = useLocation();
  const categoryName = new URLSearchParams(location.search).get("v");

  const [selectedVideo, setSelectedVideo] = useState(null);

  const categoryIndex = categoryNames.findIndex(
    (name) => name.toLowerCase().replace(/\s+/g, "-") === categoryName
  );

  if (categoryIndex === -1) {
    return (
      <div>
        <NavBar />
        <div style={{ marginTop: "100px" }}>
          <h2>Category not found</h2>
        </div>
      </div>
    );
  }

  const categoryVideos = categories[categoryIndex];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "100px" }}>
        <h2>{categoryNames[categoryIndex]}</h2>
        <div className="mb-3">
          {categoryVideos
            .filter((video) => !video.title.includes("GRE"))
            .map((video) => (
              <div
                className="container"
                key={video.videoId}
                onClick={() => handleVideoClick(video)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card border m-1 p-1 bg-light d-flex  align-items-center text-left"
                  style={{ flexDirection: "row" }}
                >
                  <img
                    width={32}
                    height={32}
                    src={
                      "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1701852034/xwk1mym8fnijajizoiqv.png"
                    }
                    alt="video"
                  />
                  <div>
                    <p
                      style={{ fontWeight: "bold", margin: "0" }}
                      className="px-3 text-left"
                    >
                      {video.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {selectedVideo && (
          <Modal
            title={selectedVideo.title}
            visible={!!selectedVideo}
            onCancel={closeModal}
            footer={null}
          >
            <YouTube
              videoId={selectedVideo.videoId}
              opts={{ width: "100%", height: "300" }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CategoryVideos;
