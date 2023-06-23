/* eslint-disable no-constant-condition */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'context/auth-context';

import Sidebar from 'components/Sidebar/Sidebar';
import SplashScreen from 'components/SplashScreen/SplashScreen';

import * as DL from './styles';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { state } = useAuth();

  return (
    <DL.GridContainer isCollapsed={isCollapsed}>
      <Sidebar isCollapsed={isCollapsed} onCollapseClick={setIsCollapsed} />
      <DL.Nav />
      <DL.Main>{true ? <SplashScreen /> : <Outlet />}</DL.Main>
    </DL.GridContainer>
  );
};

export default DashboardLayout;
