import styled from "styled-components";

const HomeWrapper = styled.div`
  color: #8a9099;
`

const ActionArea = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
`

const Previewpanel = styled.div`
  width: 50%;
  background: #212224;
  position: relative;
`

const Controller = styled.div`
  width: 100%;
  height: 50px;
  background: #34363B;
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  .icon-player {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    cursor: pointer;
  }
`

const BtnWrapper = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export {
  HomeWrapper,
  ActionArea,
  Previewpanel,
  Controller,
  BtnWrapper
}