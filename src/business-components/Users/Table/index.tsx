import { AiOutlineSearch, AiFillDelete, AiOutlineClear } from 'react-icons/ai';
import { GetUsersDTO } from '../../../@types/dto/users';
import { Checkbox } from '../../../components/Checkbox';
import { useState } from 'react';
import { UsersTableItem } from './Item';

type Props = {
  className?: string;
  users: GetUsersDTO;
  onToggleBanUsers?: (banData: { id: string; isBanned: boolean }) => void;
  onDeleteUsers?: (userIds: string[]) => void;
  onClearUsersContext?: (userIds: string[]) => void;
};

export default function UsersTable({
  className,
  users,
  onToggleBanUsers,
  onDeleteUsers,
  onClearUsersContext,
}: Props) {
  const [pickedUserIds, setPickedUserIds] = useState<string[]>([]);

  const isPicked = (id: string) => pickedUserIds.includes(id);

  const handlePickUser = (userId: string) => {
    if (!isPicked(userId)) {
      setPickedUserIds(prev => prev.concat(userId));
    } else {
      setPickedUserIds(prev => prev.filter(id => id !== userId));
    }
  };

  const pickAllUsers = () => {
    if (pickedUserIds.length === users.length) {
      setPickedUserIds([]);
    } else {
      setPickedUserIds(users.map(user => user.id));
    }
  };

  return (
    <div className={className}>
      <div className="py-3 mb-3 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-black dark:text-white font-medium">
            {pickedUserIds.length === 0
              ? `Всего пользователей: ${users.length}`
              : `Выбрано пользователей: ${pickedUserIds.length}`}
          </h3>
          {pickedUserIds.length !== 0 && (
            <div className="px-2 py-1 rounded-lg bg-slate-600 flex gap-x-2">
              <button
                onClick={() => onClearUsersContext?.(pickedUserIds)}
                className="w-10 h-10 p-2"
              >
                <AiOutlineClear className="text-white w-full h-full" />
              </button>
              <button
                onClick={() => onDeleteUsers?.(pickedUserIds)}
                className="w-10 h-10 p-2"
              >
                <AiFillDelete className="text-white w-full h-full" />
              </button>
            </div>
          )}
        </div>
        <label
          htmlFor="search"
          className="flex items-center gap-4 justify-between bg-gray-500 px-3 py-2 w-[250px] border border-black/50 rounded-md"
        >
          <AiOutlineSearch className="shrink-1 text-white" />
          <input
            id="search"
            className="bg-gray-500 grow outline-none text-white"
          />
        </label>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <Checkbox
                  id="selectAll"
                  checked={pickedUserIds.length === users.length}
                  onChange={pickAllUsers}
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Telegram id
              </th>
              <th scope="col" className="px-6 py-3">
                Никнейм
              </th>
              <th scope="col" className="px-6 py-3">
                Имя
              </th>
              <th scope="col" className="px-6 py-3">
                Роль
              </th>
              <th scope="col" className="px-6 py-3">
                Кол-во сообщений
              </th>
              <th scope="col" className="px-6 py-3">
                Дата регистрации
              </th>
              <th scope="col" className="px-6 py-3">
                Статус
              </th>
              <th className="px-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <div className="text-white">Пользователи отсутствуют</div>
            )}
            {users.map(user => (
              <UsersTableItem
                key={user.id}
                user={user}
                picked={isPicked(user.id)}
                onPickUser={() => handlePickUser(user.id)}
                onToggleBanUsers={() =>
                  onToggleBanUsers?.({
                    id: user.id,
                    isBanned: user.banned,
                  })
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
