import React, { FC } from 'react'
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
  const renderResourceContent = (currentMenu: number) => {
    if (!currentMenu) {
      return <VideoPrew videoList={resourceList}/>
    }
  }

  return (
    <ResourceContentWrapper>
      {renderResourceContent(currentMenu)}
    </ResourceContentWrapper>
  )
}

export default ResourceContent