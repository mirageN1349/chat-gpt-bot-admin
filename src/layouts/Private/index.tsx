import { Sidebar } from './Sidebar';

import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineBarChart, AiOutlineMail } from 'react-icons/ai';
import { TbClipboardList } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';

import { Outlet, useLocation, Navigate, useNavigate } from 'react-router';

import { useGetCurrentUserQuery, useSignoutMutation } from '../../api/auth';

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
  const navigate = useNavigate();
  const location = useLocation();

  const [signout] = useSignoutMutation();

  const handleSignout = async () => {
    try {
      const response = await signout().unwrap();
      if (response.ok) {
        navigate('/auth/signin', {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const activeLink = [...topLinks, ...bottomLinks].find(
    link => link.href === location.pathname
  );

  return (
    <div className="w-full min-h-full flex">
      <Sidebar
        className="shrink-0 fixed left-0 top-0"
        activeLink={activeLink?.href}
        topLinks={topLinks}
        bottomLinks={bottomLinks}
        onSignout={handleSignout}
      />
      <main className="w-full ml-[340px] min-[1740px]:mx-auto max-w-[1060px] px-5 py-9 grow">
        <Outlet />
      </main>
    </div>
  );
}
