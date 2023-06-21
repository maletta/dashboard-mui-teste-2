// import { RouteObject } from 'react-router-dom';

import { InferencePriority } from 'typescript';

// interface IPath {
//   pathId: string;
// }

// type RouteObjectWithPath = RouteObject & IPath;

// const pathsWithoutAuth: RouteObjectWithPath[] = [
//   {
//     pathId: 'login',
//     path: '/',
//   },
// ];

// const pathsWithAuth: RouteObjectWithPath[] = [
//   {
//     pathId: 'users',
//     path: '/',
//   },
//   {
//     pathId: 'messages',
//     path: '/messages',
//   },
// ];

enum PathWithAuthItems {
  messages = 'messages',
  users = 'users',
}

enum PathWithoutAuthItems {
  login = 'login',
}

interface IPathsChildren {
  [key: string]: string | null | number | undefined | IPathsChildren;
  path?: string | null;
  id?: string | number;
  children?: IPathsChildren;
}

interface IPathOptions {
  path: string | null;
  id: string | number;
  children?: IPathsChildren;
}

type IPathAuth = {
  [key in keyof typeof PathWithAuthItems]: IPathOptions;
};

type IPathWithoutAuth = {
  [key in keyof typeof PathWithoutAuthItems]: IPathOptions;
};

const pathsWithAuth = {
  main: {
    path: '/',
    id: 'main',
  },
  dashboard: {
    path: '/dashboard',
    id: 'dashboard',
    children: {
      messages: {
        id: 'messages',
        path: '/dashboard/messages',
      },
      users: {
        id: 'users',
        path: null,
        children: {
          list: {
            path: '/dashboard/users',
            id: 'user-list',
          },
          listSingle: {
            path: '/dashboard/users/:id',
            id: 'users-list',
          },
          create: {
            path: '/dashboard/users/create',
            id: 'users-create',
          },
        },
      },
    },
  },
};

const pathsWithoutAuth: IPathWithoutAuth = {
  login: {
    id: 'login',
    path: '/',
  },
};

export { pathsWithAuth, pathsWithoutAuth };
