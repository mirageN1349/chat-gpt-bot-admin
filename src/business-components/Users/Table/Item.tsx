import React, { useState } from 'react';
import { GetUsersDTO } from '../../../@types/dto/users';
import { Checkbox } from '../../../components/Checkbox';
import { getFormattedDate } from '../../../utils/getFormattedDate';
import { HiDotsVertical } from 'react-icons/hi';
import { ActionsMenu } from '../../../components/ActionsMenu';
import { useNavigate } from 'react-router';
import { Action } from '../../../components/ActionsMenu/types';

type Props = {
  user: GetUsersDTO[number];
  picked?: boolean;
  actions?: Action[];
  onPickUser?: () => void;
  onToggleBanUsers?: () => void;
};

export function UsersTableItem({
  user,
  actions,
  picked = false,
  onPickUser,
  onToggleBanUsers,
}: Props) {
  const userRoles = user.roles.map(role => role.value).join(', ');

  return (
    <tr
      className={`${
        picked ? 'bg-blue' : ''
      } bg-white odd:bg-gray-50 dark:odd:bg-gray-800 border-b dark:bg-gray-900 dark:border-gray-700`}
    >
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
      {actions && (
        <td className="px-2">
          <ActionsMenu closeOnClick actions={actions} />
        </td>
      )}
    </tr>
  );
}
