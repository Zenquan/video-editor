import React, { FC, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { TimelineWrapper, ToolBar, ProgressLine, Vframes } from "./index.style";
import { ItemTypes } from "../ItemTypes";
import { util } from "utils";
interface TimelineProps {
  vFrames: string[];
  duration: number;
  slideValue: number;
  getSlideValue: Function;
  video?: CanvasImageSource;
}

const Timeline: FC<TimelineProps> = ({
  vFrames,
  duration,
  slideValue,
  getSlideValue,
  video
}) => {
  const [posLeft, setPosLeft] = useState(30);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DragBox,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkorange";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  const handleProgressDragStart = (
    ev: React.DragEvent & { target: { id: string } }
  ) => {
    ev.dataTransfer.setData("Text", ev.target.id);
    console.log("handle_start-拖动开始");
  };

  const handleProgressDragEnd = (ev: React.MouseEvent) => {
    console.log("end ev>>>", ev);
  };

  const handleProgressDrag = (ev: React.MouseEvent) => {
    console.log("over ev>>>", ev);
    const slideValue: number = ((ev.pageX - 30) * duration) / 800;
    if (slideValue < duration) {
      setPosLeft(ev.pageX);
      getSlideValue(slideValue);
    }
  };

  const handleProgressDrop = (e: React.DragEvent) => {
    e.stopPropagation(); // 不再派发事件。解决Firefox浏览器，打开新窗口的问题。
    e.preventDefault();
    let returnObj = e.dataTransfer.getData("Text");
    if (returnObj) {
      console.log("returnObj>>>", returnObj);
      // e.target.appendChild(document.getElementById(returnObj))
    }
    console.log(returnObj + "-handle_drop-在目的地区释放");
  };

  const renderVideoFrames = () => {
    if (canvasRef && canvasRef.current) {
      const vFramesContext = canvasRef.current.getContext("2d");
      if (vFramesContext) {
        vFramesContext.fillStyle = "#FF0000";
        vFramesContext.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        video && vFramesContext.drawImage(
          video,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        // render();
        // function render() {
        //   if (
        //     vFramesContext &&
        //     canvasRef &&
        //     canvasRef.current &&
        //     video.readyState === video.HAVE_ENOUGH_DATA
        //   ) {
        //     vFramesContext.drawImage(
        //       video,
        //       0,
        //       0,
        //       canvasRef.current.width,
        //       canvasRef.current.height
        //     );
        //   }
        //   requestAnimationFrame(render);
        // }
      }
    }
  };

  useEffect(() => {
    setPosLeft(30 + 800 * (slideValue / duration));
    renderVideoFrames()
    console.log('vFrames>>>', vFrames);
  }, [slideValue, duration, vFrames]);

  return (
    <TimelineWrapper ref={drop} role={"timeline"} style={{ backgroundColor }}>
      <ToolBar>
        <div className="progress-value">
          <span className="slide-value">{util.renderTime(slideValue)}</span>/
          {util.renderTime(duration)}
        </div>
      </ToolBar>
      <ProgressLine
        draggable="true"
        style={{ transform: `translateX(${posLeft}px)` }}
        onDragStart={handleProgressDragStart}
        onDragEnd={handleProgressDragEnd}
        onDrag={handleProgressDrag}
        onDrop={handleProgressDrop}
      ></ProgressLine>
      {/* <canvas id="canvas" width="200" height="200" ref={canvasRef}></canvas> */}
      <Vframes>
        {
          vFrames && vFrames.map((vFrame, index) => (
            <img src={vFrame} alt="" key={index} className="v-frame"/>
          ))
        }
      </Vframes>
    </TimelineWrapper>
  );
};

export default Timeline;
