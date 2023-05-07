import { Sidebar } from './Sidebar';

import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineBarChart, AiOutlineMail } from 'react-icons/ai';
import { TbClipboardList } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';

import { Outlet, useLocation, Navigate } from 'react-router';

import { useGetCurrentUserQuery } from '../../api/auth';

const topLinks = [
  {
    icon: <BiUserCircle className="w-full h-full" />,
    label: 'Пользователи',
    href: '/users',
  },
  {
    icon: <AiOutlineMail className="w-full h-full" />,
    label: 'Рассылки',
    href: '/mailings',
  },
  {
    icon: <TbClipboardList className="w-full h-full" />,
    label: 'Тарифы',
    href: '/tariffs',
  },
  {
    icon: <AiOutlineBarChart className="w-full h-full" />,
    label: 'Статистика 🔧',
    href: '/stats',
  },
];

const bottomLinks = [
  {
    icon: <FiSettings className="w-full h-full" />,
    label: 'Настройки',
    href: '/settings',
  },
];

export function PrivateLayout() {
  const location = useLocation();

  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  const activeLink = [...topLinks, ...bottomLinks].find(
    link => link.href === location.pathname
  );

  // if (isLoading) return <div className="font-bold">Загрузка...</div>;

  // if (!isLoading && !currentUser) {
  //   return <Navigate to="/auth/sigin" replace />;
  // }

  return (
    <div className="w-full min-h-full flex">
      <Sidebar
        className="shrink-0 fixed left-0 top-0"
        activeLink={activeLink?.href}
        topLinks={topLinks}
        bottomLinks={bottomLinks}
      />
      <main className="w-full ml-[340px] min-[1740px]:mx-auto max-w-[1060px] px-5 py-9 grow">
        <Outlet />
      </main>
    </div>
  );
}
