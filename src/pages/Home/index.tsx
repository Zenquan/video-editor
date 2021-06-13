import React, { FC, useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactPlayer from "react-player";
import { home } from "services/index";
import Menus, { MenusType } from "./components/Menus";
import ResourceContent from "./components/ResourceContent";
import Timeline from "./components/Timeline";
import { homeStore } from 'stores'
import {
  HomeWrapper,
  ActionArea,
  Previewpanel,
  Controller,
  BtnWrapper,
} from "./index.style";

const Home: FC = observer(() => {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState<string>('http://www.w3schools.com/html/mov_bbb.mp4');
  const [resourceList, setResourceList] = useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [slideValue, setSlideValue] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [vFrames, setVFrames] = useState<string[]>([]);

  const isActive = homeStore.getIsActive();
  const menus: MenusType = [
    { icon: <i className="iconfont icon-ziyuan">&#xeebf;</i>, text: "资源库" },
    { icon: <i className="iconfont icon-wenben">&#xe649;</i>, text: "文本" },
    { icon: <i className="iconfont icon-zimu">&#xe69e;</i>, text: "字幕" },
    { icon: <i className="iconfont icon-yinle">&#xe90e;</i>, text: "音乐" },
  ];

  const playBackwardStep = () => {
    handleSliderChange(0)
  };

  const playerback = () => {
    slideValue && handleSliderChange(slideValue - 1)
  };

  const playOrPause = () => {
    setPlaying(!playing);
    if (!playing) {
      // drawFrame()
    }
  };

  const playerforward = () => {
    slideValue < duration && handleSliderChange(slideValue + 1)
  };

  const playerForwardStep = () => {
    handleSliderChange(duration)
  };

  // 视频进度条改变
  const handleSliderChange = (value: number)=> {
    setSlideValue(value) // 设置进度条当前值
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(parseFloat(''+value))
    }  // 改变视频进度
  };

    // 视频总时长
  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  // 当前播放进度
  const handleProgress = (value: {
    playedSeconds: number
  }) => {
    setSlideValue(value.playedSeconds) // 设置进度条当前值
    if (value.playedSeconds === duration) {
      setPlaying(false)
    }
  }

  const controls = [
    {
      icon: (
        <i className="iconfont icon-player-backward-step icon-player">
          &#xea2d;
        </i>
      ),
      fn: playBackwardStep,
    },
    {
      icon: (
        <i className="iconfont icon-playerback_filled icon-player">&#xe6c1;</i>
      ),
      fn: playerback,
    },
    {
      icon: playing ? (
        <i className="iconfont icon-player-play icon-player">&#xea2e;</i>
      ) : (
        <i className="iconfont icon-player-pause icon-player">&#xea2b;</i>
      ),
      fn: playOrPause,
    },
    {
      icon: (
        <i className="iconfont icon-playerforward_filled icon-player">
          &#xe6c0;
        </i>
      ),
      fn: playerforward,
    },
    {
      icon: (
        <i className="iconfont icon-player-forward-step icon-player">
          &#xea2c;
        </i>
      ),
      fn: playerForwardStep,
    },
  ];

  const fetch = async () => {
    // const resourceList = await home.getlist();
    // console.log("resourceList>>>", resourceList);
    setResourceList([
      {
        "url": "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
        "name": "mov_bbb.mp4"
      },
      {
          "url": "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
          "name": "mov_bbb.mp4"
      },
      {
          "url": "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
          "name": "mov_bbb.mp4"
      },
      {
          "url": "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
          "name": "mov_bbb.mp4"
      },
      {
          "url": "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
          "name": "mov_bbb.mp4"
      }
    ]);
  };

  const getCurrentMenu = (currentMenu: number) => {
    setCurrentMenu(currentMenu);
  };

  const getSlideValue = (slideValue: number) => {
    handleSliderChange(slideValue)
  }

  const saveFrame = (blob: Blob) => {
    console.log('blob>>>', blob);
    blobs.push(blob)
    setBlobs(blobs)
  }

  const drawFrame = () => {
    const canvas: {
      width: number,
      height: number,
      getContext: Function,
      toBlob: Function
    } = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
    console.log('canvas>>>', canvas,);
    if (playerRef && playerRef.current) {
      setPlaying(false)
      const video = playerRef.current
      canvas.width = 200
      canvas.height = 50
      const player = document.getElementById('player'),
        img = new Image();
      img.setAttribute("crossOrigin",'Anonymous')
      ctx.drawImage(player?.childNodes[0], 0, 0);
      img.src = canvas.toBlob(saveFrame, 'image/jpeg');
      console.log('img>>>', img);
      if (slideValue < duration) {
        setPlaying(true)
      }
    }
  }
  const revokeURL = (e: React.MouseEvent) => {
    URL.revokeObjectURL(videoSrc);
  }

  const onend = (e: React.MouseEvent) => {
    var img: HTMLImageElement;
    // do whatever with the frames
    for (var i = 0; i < blobs.length; i++) {
      if (i % 10 === 0) {
        console.log('array[i]>>>', blobs[i]);
        img = new Image();
        img.setAttribute("crossOrigin",'Anonymous')
        img.onload = revokeURL;
        img.src = URL.createObjectURL(blobs[i]);
        console.log('img>>>', img);
        // document.getElementById('vframs').appendChild(img);
      }
    }
    // we don't need the video's objectURL anymore
    URL.revokeObjectURL(videoSrc);
  }

  const setVFrame = () => {
    if (isActive) {
      setVFrames([
        "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
        "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
        "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
        "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
        "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
        "http://qugsjkhq2.hn-bkt.clouddn.com/mov_bbb.mp4_preview.jpg",
      ])
    }
  }

  useEffect(() => {
    fetch();
    setVFrame()
  }, [isActive]);

  return (
    <HomeWrapper>
      {console.log('blobs>>>', blobs)}
      <ActionArea>
        <Menus menus={menus} getCurrentMenu={getCurrentMenu} />
        <ResourceContent
          currentMenu={currentMenu}
          resourceList={resourceList}
        />
        <Previewpanel>
          <ReactPlayer
            id={'player'}
            ref={playerRef}
            url={videoSrc}
            width={"100%"}
            height={"100%"}
            playing={playing}
            onDuration={handleDuration}
            onSeek={e => console.log('onSeek', e)} // 当媒体使用seconds参数搜索时调用
            progressInterval={100} // onProgress 回调的速度  太大会导致进度条走动不平滑
            onProgress={handleProgress}
            onError={e => console.error(e)}
          ></ReactPlayer>
          <Controller>
            <BtnWrapper>
              {controls &&
                controls.map((control, index: number) => {
                  const { icon, fn } = control;
                  return (
                    <div onClick={fn} key={index}>
                      {icon}
                    </div>
                  );
                })}
            </BtnWrapper>
          </Controller>
        </Previewpanel>
      </ActionArea>
      <DndProvider backend={HTML5Backend}>
        <Timeline vFrames={vFrames}
          slideValue={slideValue}
          duration={duration}
          getSlideValue={getSlideValue}
          />
      </DndProvider>
    </HomeWrapper>
  );
});

export default Home;
