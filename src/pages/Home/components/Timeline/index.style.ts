import styled from 'styled-components'

const TimelineWrapper = styled.div`
  width: 100%;
  height: 50vh;
  background: #34363b;
`

const ToolBar = styled.div`
  display: flex;
  height: 40px;
  padding: 0 30px;
  border-bottom: 1px solid #252628;
  align-items: center;
  .progress-value {
    font-size: 14px;
  }
  .slide-value {
    color: #fff;
  }
`

const TracksBox = styled.div`
  padding-left: 30px;
`

const ProgressLine = styled.div`
  width: 1px;
  height: 50vh;
  background: #fff;
  content: '';
  cursor: col-resize;
  position: relative;
  &::before {
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`

export {
  TimelineWrapper,
  ToolBar,
  ProgressLine,
  TracksBox
}