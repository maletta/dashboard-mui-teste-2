import React, { useState } from 'react';

import MenuList from './MenuList';
import * as M from './styles';

interface IMenu {
  isCollapsed?: boolean;
}
const Menu: React.FC<IMenu> = ({ isCollapsed }) => {
  return <MenuList isCollapsed={isCollapsed} />;
};

export default Menu;
