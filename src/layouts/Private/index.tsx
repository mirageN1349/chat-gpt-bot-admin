import { Header } from './Header';
import { Sidebar } from './Sidebar';

import { FiUsers } from 'react-icons/fi';
import { AiOutlineBarChart, AiOutlineMail } from 'react-icons/ai';
import { TbClipboardList } from 'react-icons/tb';

import { Outlet, useLocation, useNavigate, Navigate } from 'react-router';

import { useGetCurrentUserQuery } from '../../api/auth';

const links = [
  {
    icon: <FiUsers />,
    label: 'Пользователи',
    href: '/users',
  },
  {
    icon: <AiOutlineMail />,
    label: 'Рассылки 🔧',
    href: '/mailings',
  },
  {
    icon: <AiOutlineBarChart />,
    label: 'Статистика 🔧',
    href: '/stats',
  },
  {
    icon: <TbClipboardList />,
    label: 'Тарифы 🔧',
    href: '/tariffs',
  },
];

export function PrivateLayout() {
  const location = useLocation();

  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  const activeLink = links.find(link => link.href === location.pathname);

  if (isLoading) return <div className="font-bold">Загрузка...</div>;

  if (!isLoading && !currentUser) {
    return <Navigate to="/auth/sigin" replace />;
  }

  return (
    <div className="w-full">
      <Sidebar activeLink={activeLink?.href} links={links} />
      <div className="md:ml-64">
        <Header title={activeLink?.label} />
        <main className="mt-4 mx-auto w-[calc(100%-32px)] max-w-[1200px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
