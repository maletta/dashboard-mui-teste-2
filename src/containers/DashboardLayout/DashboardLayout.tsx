/* eslint-disable no-constant-condition */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from 'components/Sidebar/Sidebar';
import SplashScreen from 'components/SplashScreen/SplashScreen';

import * as DL from './styles';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <DL.GridContainer isCollapsed={isCollapsed}>
      <Sidebar isCollapsed={isCollapsed} onCollapseClick={setIsCollapsed} />
      <DL.Nav />
      <DL.Main>
        <Outlet />
      </DL.Main>
    </DL.GridContainer>
  );
};

export default DashboardLayout;
