import styled from "styled-components";

const VideoViewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow: auto;

  .video-prew-cover {
    width: 140px;
    height: 80px;
    margin: 20px;
  }

  .video-source {
    width: 100%;
    height: 100%;
  }

  .video-item {
    width: 180px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`;

export {
  VideoViewWrapper
};