import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
interface IAppProps {
  children: React.ReactNode | null | undefined;
}

const App = () => {
  return <Outlet />;
};

export default App;
