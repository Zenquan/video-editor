import React, { CSSProperties, ReactElement, FC } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

export interface BoxProps {
  name?: string,
  children?: ReactElement | String | Number
}

interface DropResult {
  name: string
}

const Box: FC<React.PropsWithChildren<BoxProps>> = ({ name, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1
  return (
    <div
      ref={drag}
      role="Box"
      style={{ opacity }}
      data-testid={`box-${name}`}
    >
      {
        children ? children : name
      }
    </div>
  )
}

export default Box;