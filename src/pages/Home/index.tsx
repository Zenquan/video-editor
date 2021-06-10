import React, { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { observer } from "mobx-react";
import { Player, ControlBar, ClosedCaptionButton } from 'video-react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { home } from 'services/index'
import Box from './Box'
import Timeline from './Timeline'
import './index.css'

type Menu = {
  icon: ReactNode,
  text: string
}

type Menus = Array<Menu>

const Home: FC = observer(() => {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState<string>("http://www.w3schools.com/html/mov_bbb.mp4")
  const [videoList, setVideoList] = useState<Array<{
    url: string,
    name: string
  }>>([])

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

  const fetch = async () => {
    const videoList = await home.getlist()
    console.log('videoList>>>', videoList);
    setVideoList(videoList)
  }

  useEffect(() => {
    fetch()
  }, [])

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
          <div className="video-prew">
            {/* <input type="file" id="uploader" onChange={(e: any) => transcode(e)}/> */}
            <DndProvider backend={HTML5Backend}>
              {
                videoList && videoList.map((video, index) => {
                  const { name, url } = video;
                  return (<Box key={index}>
                    <div className="video-item">
                      <img src={url} alt="" className="video-prew-cover"/>
                      {name}
                    </div>
                  </Box>)
                })
              }
            </DndProvider>
          </div>
        </div>
        <div className="preview-panel">
          <Player
            fluid={false}
            width={"100%"}
            height={"100%"}
            src={videoSrc}
          >
            <ControlBar autoHide={false}>
              <ClosedCaptionButton order={7} />
            </ControlBar>
          </Player>
        </div>
      </div>
    <DndProvider backend={HTML5Backend}>
      <Timeline/>
    </DndProvider>
  </div>)
});

export default Home;