import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UserDetailPage /> },
      {
        path: 'about',
        lazy: async () => {
          const { default: AboutPage } = await import('./pages/AboutPage');
          return { Component: AboutPage };
        },
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
