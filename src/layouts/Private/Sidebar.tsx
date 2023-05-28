import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsRobot } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type SidebarLink = {
  icon: React.ReactElement;
  label: string;
  href: string;
};

type Props = {
  className?: string;
  activeLink?: string;
  topLinks?: SidebarLink[];
  bottomLinks?: SidebarLink[];
  onSignout: () => void;
};

export function Sidebar({
  className = '',
  topLinks,
  bottomLinks,
  activeLink,
  onSignout,
}: Props) {
  return (
    <aside
      className={`${className} flex flex-col justify-between py-9 h-screen pl-7 pr-2 w-[340px] border-r-2 border-r-[#ECECEE]`}
    >
      <div className="w-full">
        <div className="px-4 flex items-center h-8 mb-9 font-semibold text-lg">
          <BsRobot className="h-8 w-8 mr-2" />
          <h3 className="mt-1">NikoGPT</h3>
        </div>
        {topLinks?.map(link => (
          <Link
            key={link.href}
            to={link.href}
            className={`${
              activeLink === link.href
                ? 'text-indigo-600 bg-indigo-600/10 hover:text-indigo-600 hover:bg-indigo-600/10'
                : ''
            } flex items-center rounded-md hover:text-indigo-600 gap-2 py-3 px-4 font-medium transition-all`}
          >
            <div className="w-6 h-6">{link.icon}</div>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <div>
        {bottomLinks?.map(link => (
          <Link
            key={link.href}
            to={link.href}
            className={`${
              activeLink === link.href
                ? 'text-indigo-600 bg-indigo-600/10 hover:text-indigo-600 hover:bg-indigo-600/10'
                : ''
            } flex items-center rounded-md hover:text-indigo-600 gap-2 py-3 px-4 font-medium transition-all`}
          >
            <div className="w-6 h-6">{link.icon}</div>
            <span>{link.label}</span>
          </Link>
        ))}
        <button
          type="button"
          className="border-2 rounded-xl border-[#ECECEE] text-black/80 p-4 mt-8 flex w-full items-center font-semibold"
          onClick={onSignout}
        >
          <BiLogOut className="w-6 h-6 mr-2" />
          Выход
        </button>
      </div>
    </aside>
  );
}
