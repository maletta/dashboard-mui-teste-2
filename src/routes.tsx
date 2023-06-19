import * as React from 'react';
import { createBrowserRouter, Outlet, useMatches } from 'react-router-dom';
import styled from '@emotion/styled';

import Breadcrumbs from 'components/Breadcrumbs';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';

const User = () => {
  return (
    <div>
      <Breadcrumbs />
      <div>usuário</div>
      <Outlet />
    </div>
  );
};

const Event = () => {
  const EventS = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
  `;
  return (
    <div>
      <Breadcrumbs />
      <EventS>event</EventS>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <User />,
        handle: {
          crumb: (data: any) => <span>{'/dashboard user'}</span>,
        },
        children: [
          {
            path: 'teste2/',
            element: <Event />,
            handle: {
              crumb: (data: any) => <span>{'/dashboard/teste2/'}</span>,
            },
          },
        ],
      },
      {
        path: '/dashboard/teste',
        element: <Event />,
        handle: {
          crumb: (data: any) => <span>{'/dashboard/teste/'}</span>,
        },
      },
      {
        path: 'event',
        element: <Event />,
        handle: {
          crumb: (data: any) => <span>{'/event'}</span>,
        },
      },
    ],
  },
]);

export default router;
