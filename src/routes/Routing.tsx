import { Navigate, useRoutes } from 'react-router';
import { MainPage } from '../pages/main';
import { PrivateLayout } from '../layouts/Private';
import { UsersPage } from '../pages/users';
import { Error404Page } from '../pages/404';
import { TariffsPage } from '../pages/tariffs';
import { AuthPage } from '../pages/auth';
import { PublicLayout } from '../layouts/Public';
import { CreateMailingsPage } from '../pages/mailings/create';
import { MailingsPage } from '../pages/mailings';

export default function Routing() {
  const privateRoutes = {
    path: '',
    element: <PrivateLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      { path: '/mailings', element: <MailingsPage /> },
      { path: '/mailings/create', element: <CreateMailingsPage /> },
      // { path: '/mailings', element: <CreateMailingsPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/tariffs', element: <TariffsPage /> },
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
