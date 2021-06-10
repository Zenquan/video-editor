import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const Timeline: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
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
    <div ref={drop} role={'Dustbin'} style={{ backgroundColor }}
      className="timeline">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}

export default Timeline;