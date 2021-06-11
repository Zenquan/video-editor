import styled from "styled-components";

const MenusWrapper = styled.div`
  width: 10%;
  background: #212224;
  min-width: 150px;
  .menu-text {
    font-size: 14px;
    margin-left: 20px;
  }

  .menu-active {
    background: #323337;
  }
`

const MenuItem = styled.li`
  list-style: none;
  padding: 3px 30px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export {
  MenusWrapper,
  MenuItem
}