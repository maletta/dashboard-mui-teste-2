import * as React from 'react';
import { createBrowserRouter, Outlet, useMatches } from 'react-router-dom';
import styled from '@emotion/styled';

import Breadcrumbs from 'components/Breadcrumbs';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
import Login from 'containers/Login/Login';

import { pathsWithAuth } from './paths';

const User = () => {
  return (
    <div>
      <Breadcrumbs />
      <div>Página de usuários</div>
      <Outlet />
    </div>
  );
};

const Messages = () => {
  const Messages = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
  `;
  return (
    <div>
      <Breadcrumbs />
      <Messages>Página de eventos</Messages>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: pathsWithAuth.main.path,
    element: <Login />,
  },
  {
    path: pathsWithAuth.dashboard.path,
    element: <DashboardLayout />,
    children: [
      {
        path: pathsWithAuth.dashboard.children.users.children.list.path,
        element: <User />,
        handle: {
          crumb: () => <span>{'/dashboard user'}</span>,
        },
        children: [
          {
            path: 'teste2/',
            element: <Messages />,
            handle: {
              crumb: () => <span>{'/dashboard/teste2/'}</span>,
            },
          },
        ],
      },
      {
        path: '/dashboard/teste',
        element: <Messages />,
        handle: {
          crumb: () => <span>{'/dashboard/teste/'}</span>,
        },
      },
      {
        path: 'event',
        element: <Messages />,
        handle: {
          crumb: () => <span>{'/event'}</span>,
        },
      },
    ],
  },
]);

export default router;
