import { Navigate } from 'react-router';
import { useGetCurrentUserQuery } from '../api/auth';
import React, { PropsWithChildren } from 'react';

type Props = {
  children: React.ReactElement;
};

export function PrivateRoute({ children }: Props) {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  if (isLoading) return <div className="font-bold">Загрузка...</div>;

  if (!isLoading && !currentUser) {
    return <Navigate to="/auth/sigin" replace />;
  }

  return children;
}
