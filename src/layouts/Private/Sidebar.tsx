import { Link } from 'react-router-dom';

type Link = {
  icon: React.ReactElement;
  label: string;
  href: string;
};

type Props = {
  className?: string;

  activeLink?: string;
  links?: Link[];
};

export function Sidebar({ className = '', links, activeLink }: Props) {
  return (
    <aside
      className={`${className} fixed top-0 left-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0`}
    >
      <div className="h-full px-3 pb-4 flex flex-col justify-between pb-10 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div>
          <div className="h-16 font-black flex items-center text-3xl text-gray-900 dark:text-white">
            BebraBot
          </div>
          <ul className="space-y-2 font-medium">
            {links?.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`
                  ${
                    activeLink === link.href
                      ? 'bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }
                  flex items-center p-2 text-gray-900 
                  rounded-lg dark:text-white  transition-all`}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button className="w-full items-center p-2 text-gray-900 rounded-lg dark:text-gray-900 transition-all bg-gray-100">
          Выход
        </button>
      </div>
    </aside>
  );
}
