import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { TimelineWrapper, ToolBar } from './index.style';
import { ItemTypes } from '../ItemTypes'

interface TimelineProps {
  vFrames: string[],
  duration: number,
  slideValue: number
}

const Timeline: FC<TimelineProps> = ({vFrames, duration, slideValue}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DragBox,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkorange'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <TimelineWrapper ref={drop} role={'timeline'} style={{ backgroundColor }}
      >
      <ToolBar>
        <div>{slideValue} / {duration}</div>
      </ToolBar>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </TimelineWrapper>
  )
}

export default Timeline;