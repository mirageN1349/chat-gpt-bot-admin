import { GetUsersDTO } from '../../../@types/dto/users';
import { getFormattedDate } from '../../../utils/getFormattedDate';
import { ActionsMenu } from '../../../components/ActionsMenu';
import { Action } from '../../../components/ActionsMenu/types';
import { TableRow, TableCell } from '@mui/material';

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
    <TableRow>
      <TableCell scope="row">{user.telegramId}</TableCell>
      <TableCell>{user.telegramUsername}</TableCell>
      <TableCell>{user.telegramName}</TableCell>
      <TableCell>{userRoles}</TableCell>
      <TableCell>{user.messagesCount}</TableCell>
      <TableCell>{getFormattedDate(user.createdAt)}</TableCell>
      <TableCell>
        {user.banned && (
          <div className="py-1 px-2 bg-red-500 rounded-md text-white flex items-center justify-center">
            Заблокирован
          </div>
        )}
      </TableCell>
      {actions && (
        <TableCell className="px-2">
          <ActionsMenu closeOnClick actions={actions} />
        </TableCell>
      )}
    </TableRow>
  );
}
