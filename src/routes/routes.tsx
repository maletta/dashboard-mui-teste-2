import * as React from 'react';
import { createBrowserRouter, Outlet, useMatches, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import App from 'App';
import AuthGuard from 'guard/auth-guard';

import Breadcrumbs from 'components/Breadcrumbs';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
import Login from 'containers/Login/Login';

import { pathsWithAuth } from './paths';

const User = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Breadcrumbs />
      <p>Usuários</p>
      <div onClick={() => navigate('/dashboard/messages')}>Ir para messages</div>
      <Outlet />
    </div>
  );
};

const Messages = () => {
  const navigate = useNavigate();

  const Messages = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
  `;
  return (
    <div>
      <Breadcrumbs />
      <p>Messages</p>
      <Messages onClick={() => navigate('/dashboard/users')}>Ir para usuarios</Messages>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: pathsWithAuth.main.path,
        element: <Login />,
      },
      {
        path: pathsWithAuth.dashboard.path,
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
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
            path: '/dashboard/messages',
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
    ],
  },
]);

export default router;
