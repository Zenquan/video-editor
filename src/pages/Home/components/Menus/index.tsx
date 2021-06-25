import React, { FC, ReactNode, useState } from 'react';
import {
  MenusWrapper,
  MenuItem
} from './index.style';

type Menu = {
  icon: ReactNode,
  text: string
}

export type MenusType = Array<Menu>

interface MenusProps {
  menus: MenusType,
  getCurrentMenu: (index: number) => void
}

const Menus: FC<MenusProps> = ({
  menus,
  getCurrentMenu,
}: MenusProps) => {
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const handleSwitchMenu = (
    e: React.MouseEvent,
    index: number
  ) => {
    setCurrentMenu(index);
    getCurrentMenu(index);
  };

  return (
    <MenusWrapper>
      {
        menus && menus.map((memu: Menu, index: number) => {
          const { icon, text, } = memu;
          return (
            <MenuItem key={index}
              className={
                currentMenu === index
                  ? 'menu-active'
                  : ''
              }
              onClick={(e: React.MouseEvent) => handleSwitchMenu(e, index)}>
              {icon}
              <p className="menu-text'">{text}</p>
            </MenuItem>
          )
        })
      }
    </MenusWrapper>)
};

export default Menus;