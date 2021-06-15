import styled from 'styled-components';

const TimelineWrapper = styled.div`
  width: 100%;
  background: #34363b;
  position: relative;
`;

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
`;

const TracksBox = styled.div`
  padding-left: 30px;
`;

const ProgressLine = styled.div`
  width: 1px;
  height: 50vh;
  background: #fff;
  content: '';
  cursor: col-resize;
  position: relative;
  user-select: auto;
  z-index: 10;
  &::before {
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Vframes = styled.div`
  position: absolute;
  top: 60px;
  left: 31px;
  display: flex;
  width: calc(100% - 30px);
  overflow-y: auto;
  .v-frame {
    width: 200px;
    height: 50px;
  }
`;

export {
  TimelineWrapper,
  ToolBar,
  ProgressLine,
  TracksBox,
  Vframes
};