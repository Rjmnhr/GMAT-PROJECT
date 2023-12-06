import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Modal } from "antd"; // Assuming you have Modal from antd
import NavBar from "../../components/nav-bar";
import YouTube from "react-youtube";
import { categories } from "../../components/youtube-videos";

const categoryNames = [
  "GMAT Quant videos",
  "GMAT Verbal videos",
  "GMAT IR",
  "Profile building",
  "Essays for college admissions",
  "College admits and successful students",
  "Others",
];

const CategoryVideos = () => {
  const location = useLocation();
  const categoryName = new URLSearchParams(location.search).get("v");
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVideos = categoryVideos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedVideo(null); // Reset selected video when changing page
  };

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
          {paginatedVideos.map((video) => (
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
                    className=" px-3 text-left"
                  >
                    {video.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          current={currentPage}
          total={categoryVideos.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />

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
