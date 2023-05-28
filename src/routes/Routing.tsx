import { Navigate, useRoutes } from 'react-router';
import { MainPage } from '../pages/main';
import { PrivateLayout } from '../layouts/Private';
import { UsersPage } from '../pages/users';
import { Error404Page } from '../pages/404';
import { TariffsPage } from '../pages/tariffs';
import { AuthPage } from '../pages/auth';
import { PublicLayout } from '../layouts/Public';
import { MailingsPage } from '../pages/mailings';
import { SettingPage } from '../pages/settings';
import StatisticsPage from '../pages/statistics';
import { PrivateRoute } from './PrivateRoute';

export default function Routing() {
  const privateRoutes = {
    path: '',
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      { path: '/mailings', element: <MailingsPage /> },
      { path: '/settings', element: <SettingPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/tariffs', element: <TariffsPage /> },
      { path: '/stats', element: <StatisticsPage /> },
      {
        path: '/404',
        element: <Error404Page />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  };

  const publicRoutes = {
    path: '/auth',
    element: <PublicLayout />,
    children: [
      {
        path: '/auth/signin',
        element: <AuthPage />,
      },
      {
        path: '/auth/*',
        element: <Navigate to="/auth/signin" />,
      },
    ],
  };

  const routing = useRoutes([privateRoutes, publicRoutes]);
  return routing;
}
