import React, { useState } from 'react';
import { GetUsersDTO } from '../../../@types/dto/users';
import { Checkbox } from '../../../components/Checkbox';
import { getFormattedDate } from '../../../utils/getFormattedDate';
import { HiDotsVertical } from 'react-icons/hi';
import { ActionsMenu } from '../../../components/ActionsMenu';
import { useNavigate } from 'react-router';

type Props = {
  user: GetUsersDTO[number];
  picked?: boolean;
  onPickUser?: () => void;
  onToggleBanUsers?: () => void;
};

export function UsersTableItem({
  user,
  picked = false,
  onPickUser,
  onToggleBanUsers,
}: Props) {
  const userRoles = user.roles.map(role => role.value).join(', ');

  const actions = [
    {
      title: 'Перейти',
    },
    {
      title: 'Очистить контекст',
    },
    {
      title: !user.banned ? 'Заблокировать' : 'Разблокировать',
      className: !user.banned ? 'text-red-500' : 'text-green-500',
    },
    {
      title: 'Удалить',
      className: 'text-red-500',
      onClick: onToggleBanUsers,
    },
  ];

  return (
    <tr
      className={`${
        picked ? 'bg-blue' : ''
      } bg-white odd:bg-gray-50 dark:odd:bg-gray-800 border-b dark:bg-gray-900 dark:border-gray-700`}
    >
      <th className="px-6 py-4">
        <Checkbox id={user.id} checked={picked} onChange={onPickUser} />
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.telegramId}
      </th>
      <td className="px-6 py-4">{user.telegramUsername}</td>
      <td className="px-6 py-4">{user.telegramName}</td>
      <td className="px-6 py-4">{userRoles}</td>
      <td className="px-6 py-4">{user.messagesCount}</td>
      <td className="px-6 py-4">{getFormattedDate(user.createdAt)}</td>
      <td className="px-6 py-4">
        {user.banned && (
          <div className="py-1 px-2 bg-red-500 rounded-md text-white flex items-center justify-center">
            Заблокирован
          </div>
        )}
      </td>
      <td className="px-2">
        <ActionsMenu actions={actions} />
      </td>
    </tr>
  );
}
