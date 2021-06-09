import React, { FC, ReactNode, useState } from 'react';
import { observer } from "mobx-react";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './index.css'

type Menu = {
  icon: ReactNode,
  text: string
}

type Menus = Array<Menu>

const Home: FC = observer(() => {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState('')

  const ffmpeg = createFFmpeg({ log: true });
  const transcode = async ({ target: { files }}: { target: { files: File[] }}) => {
    const { name } = files[0];
    await ffmpeg.load();
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name,  'output.mp4');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  }

  const menus: Menus = [
    {icon: <i className="iconfont icon-ziyuan">&#xeebf;</i>, text: '资源库'},
    {icon: <i className="iconfont icon-wenben">&#xe649;</i>, text: '文本'},
    {icon: <i className="iconfont icon-zimu">&#xe69e;</i>, text: '字幕'},
    {icon: <i className="iconfont icon-yinle">&#xe90e;</i>, text: '音乐'}
  ]

  const handleSwitchMenu = (
      e: React.MouseEvent,
      index: number
    ) => {
    setCurrentMenu(index)
  }

  return (
    <div className="home">
      <div className="action-area">
        <div className="menus">
          {
            menus && menus.map((memu: Menu, index) => {
              const { icon, text } = memu
              return (
                <li key={index}
                  className={
                    currentMenu === index
                      ? 'menu menu-active'
                      : "menu"
                  }
                  onClick={(e: React.MouseEvent) => handleSwitchMenu(e, index)}
                  >
                  {icon}
                  <p className="menu-text'">{text}</p>
                </li>
              )
            })
          }
        </div>
        <div className="resource-content">
          <input type="file" id="uploader" onChange={(e: any) => transcode(e)}/>
        </div>
        <div className="preview-panel">
          <video controls src={videoSrc}></video>
        </div>
      </div>
    <div className="timeline">
      333
    </div>
  </div>)
});

export default Home;