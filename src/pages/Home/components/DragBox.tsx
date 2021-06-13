import React, { ReactNode, FC } from 'react'
import { useDrag } from 'react-dnd'
import { observer } from "mobx-react";
import { ItemTypes } from './ItemTypes'
import { homeStore } from 'stores'
export interface DragBoxProps {
  name?: string,
  children: ReactNode
}

interface DropResult {
  name: string,
}

const DragBox: FC<React.PropsWithChildren<DragBoxProps>> = observer(({ name, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DragBox,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        homeStore.setIsActive(item && dropResult);
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
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
      role="DragBox"
      style={{ opacity }}
      data-testid={`DragBox-${name}`}
    >
      {children}
    </div>
  )
})

export default DragBox;