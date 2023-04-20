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
  return (
    <div className={className}>
      <div className="py-3 mb-3 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-black dark:text-white font-medium">
            Всего пользователей: {users.length}
          </h3>
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
              <UsersTableItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
