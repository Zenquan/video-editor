import React, { FC, useState } from 'react';
import { observer } from "mobx-react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ResourceContentWrapper } from './index.style';
import VideoCover from '../VideoCover';
import { homeStore } from 'stores';

type resourceType = {
  url: string,
  name: string
}
interface ResourceContentProps {
  currentMenu: number,
  resourceList: Array<resourceType>
}

const ResourceContent: FC<ResourceContentProps> = observer(({
  currentMenu,
  resourceList,
}: ResourceContentProps) => {

  const renderResourceContent = (currentMenu: number) => {
    // const { createFFmpeg, fetchFile } = (window as any).FFmpeg;
    const ffmpeg = createFFmpeg({
      log: true,
    });
    const transcode = async ({
      target: { files, },
    }: {
      target: { files: File[] };
    }) => {
      const { name, } = files[0];
      await ffmpeg.load();
      ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
      await ffmpeg.run("-i", name, "output.mp4");
      const data = ffmpeg.FS("readFile", "output.mp4");
      const videoSrc = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4", }))
      await homeStore.setVideoSrc(videoSrc);
      // await ffmpeg.run("-i", name, "-r", "1", "-f", "image2", './img/1.jpeg')
      // console.log('1>>>');
    };

    if (!currentMenu) {
      return (
        <div>
          <input type="file" id="uploader" onChange={(e: any) => transcode(e)}/>
          {/* <Button>本地上传视频</Button> */}
          <VideoCover videoList={resourceList}/>
        </div>
      );
    }
  };

  return (
    <ResourceContentWrapper>
      {renderResourceContent(currentMenu)}
    </ResourceContentWrapper>
  );
});

export default ResourceContent;