import { GetUsersDTO } from '../../../@types/dto/users';
import Button from '../../../components/Button';
import { UsersTableItem } from './Item';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

type Pager = {
  size: number;
  total: number;
  current: number;
  hasNextPage: boolean;
  onNext: () => void;
  onPrev: () => void;
};

type Props = {
  pager: Pager;
  className?: string;
  users: GetUsersDTO;
  onBanUser: (banData: { id: string; isBanned: boolean }) => void;
  onDeleteUsers: (userIds: string) => void;
  onClearUsersContext: (userIds: string) => void;
};

export default function UsersTable({
  pager,
  className,
  users,
  onDeleteUsers,
  onBanUser,
  onClearUsersContext,
}: Props) {
  const userActions = (user: GetUsersDTO[number]) => [
    {
      title: 'Перейти',
      className: 'hover:text-indigo-600 hover:bg-indigo-600/10',
    },
    {
      title: 'Очистить контекст',
      onClick: () => onClearUsersContext(user.id),
      className: 'hover:text-indigo-600 hover:bg-indigo-600/10',
    },
    {
      title: !user.banned ? 'Заблокировать' : 'Разблокировать',
      className: `${
        !user.banned ? 'text-red-500' : 'text-green-500'
      } hover:bg-indigo-600/10`,
      onClick: () => onBanUser({ id: user.id, isBanned: user.banned }),
    },
    {
      title: 'Удалить',
      className: 'text-red-500 hover:bg-indigo-600/10',
      onClick: () => onDeleteUsers(user.id),
    },
  ];

  return (
    <div className={`${className} rounded-xl border-2 border-[#ECECEE] w-full`}>
      <div className="border-b bg-[#F9F9FD] py-4 px-5 flex justify-between border-[#ECECEE]">
        <div className="w-[calc((100%-40px)/4)] text-left">TelegramId</div>
        <div className="w-[calc((100%-40px)/4)] text-left">Имя</div>
        <div className="w-[calc((100%-40px)/4)] text-left">
          Дата регистрации
        </div>
        <div className="w-[calc((100%-40px)/4)] text-left">
          Кол-во сообщений
        </div>
        <div className="w-10" />
      </div>
      <div>
        {users.length === 0 && (
          <div className="mx-4 my-2">Пользователи не найдены</div>
        )}
        {users.map(user => (
          <UsersTableItem
            key={user.id}
            user={user}
            actions={userActions(user)}
          />
        ))}
      </div>
      {users.length !== 0 && (
        <div className="bg-[#F9F9FD] flex items-center justify-between py-4 px-5">
          <Button
            className="text-white"
            disabled={pager.current === 1}
            onClick={pager.onPrev}
          >
            <BiChevronLeft className="w-6 h-6" />
          </Button>

          <div className="text-center text-lg">
            {pager.current}/{pager.total}
          </div>

          <Button
            className="text-white"
            disabled={pager.current >= pager.total}
            onClick={pager.onNext}
          >
            <BiChevronRight className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
}
