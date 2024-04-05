import React from "react";
import { notification } from "antd";

function DownloadSampleDoc({ docPath }) {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Your letter is getting downloaded`,

      placement,
    });
  };

  const downloadDoc = () => {
    openNotification("topRight");
    // Construct the path to your PDF file

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = docPath;

    // Extract the filename from the URL
    const filename = docPath.substring(docPath.lastIndexOf("/") + 1);

    // Set the 'download' attribute to the extracted filename
    link.download = filename;

    // Trigger a click event to initiate the download
    link.click();
  };

  return (
    <div>
      {contextHolder}{" "}
      <button className="btn border-primary" onClick={downloadDoc}>
        Download DOC
      </button>
    </div>
  );
}

export default DownloadSampleDoc;
