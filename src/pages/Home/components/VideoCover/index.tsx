import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  VideoViewWrapper
} from './index.style';

import DragBox from '../DragBox';

type VideoType = {
  name: string,
  url: string
}

interface VideoCoverProps {
  videoList: Array<VideoType>
}

const VideoCover: FC<VideoCoverProps> = ({
  videoList,
}: VideoCoverProps) => {
  return (
    <VideoViewWrapper>
      <DndProvider backend={HTML5Backend}>
        {
          videoList && videoList.map((video: VideoType, index) => {
            const { name, url, } = video;
            return (<DragBox key={index} name={name}>
              <div className="video-item">
                <img src={url} alt="" className="video-prew-cover"/>
                {name}
              </div>
            </DragBox>);
          })
        }
      </DndProvider>
    </VideoViewWrapper>
  );
};

export default VideoCover;