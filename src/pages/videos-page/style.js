import styled from "styled-components";

export const VideosPageStyled = styled.div`
  .image-overlay {
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(
      0,
      0,
      0,
      0.5
    ); /* Adjust the alpha value for the desired opacity */
  }

  .centered-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 18px; /* Adjust the font size as needed */
    font-weight: bold; /* Add font weight if needed */
    z-index: 1; /* Set a higher z-index to keep the text above the overlay */
  }
  .card-transition-zoom-item {
    overflow: hidden;
    overflow-y: hidden;
  }

  .card-transition-zoom-item:hover .image-overlay {
    transform: scale(1.2); /* Adjust the scale factor for zooming */
    transition: transform 0.3s ease-in-out; /* Add transition for a smooth effect */
  }
`;
