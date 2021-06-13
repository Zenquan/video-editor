import React, { FC, useState } from 'react'
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ResourceContentWrapper } from './index.style'
import VideoPrew from '../VideoPrew'

type resourceType = {
  url: string,
  name: string
}
interface ResourceContentProps {
  currentMenu: number,
  resourceList: Array<resourceType>
}

const ResourceContent: FC<ResourceContentProps> = ({
    currentMenu,
    resourceList
  }) => {
  const [videoSrc, setVideoSrc] = useState<string>('http://www.w3schools.com/html/mov_bbb.mp4');

  const renderResourceContent = (currentMenu: number) => {
    const ffmpeg = createFFmpeg({ log: true });
    const transcode = async ({
      target: { files },
    }: {
      target: { files: File[] };
    }) => {
      const { name } = files[0];
      await ffmpeg.load();
      ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
      await ffmpeg.run("-i", name, "output.mp4");
      const data = ffmpeg.FS("readFile", "output.mp4");
      setVideoSrc(
        URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
      );
    };

    if (!currentMenu) {
      return (
        <div>
          <input type="file" id="uploader" onChange={(e: any) => transcode(e)}/>
          <VideoPrew videoList={resourceList}/>
        </div>
      )
    }
  }

  return (
    <ResourceContentWrapper>
      {renderResourceContent(currentMenu)}
    </ResourceContentWrapper>
  )
}

export default ResourceContent