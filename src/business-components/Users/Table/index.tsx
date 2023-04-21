import { AiOutlineSearch } from 'react-icons/ai';
import { GetUsersDTO } from '../../../@types/dto/users';
import { UsersTableItem } from './Item';
import {
  Chip,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Stack,
  TextField,
} from '@mui/material';

type Props = {
  className?: string;
  users: GetUsersDTO;
  onBanUser: (banData: { id: string; isBanned: boolean }) => void;
  onDeleteUsers: (userIds: string) => void;
  onClearUsersContext: (userIds: string) => void;
};

export default function UsersTable({
  className,
  users,
  onDeleteUsers,
  onBanUser,
  onClearUsersContext,
}: Props) {
  const userActions = (user: GetUsersDTO[number]) => {
    return [
      {
        title: 'Перейти',
      },
      {
        title: 'Очистить контекст',
        onClick: () => onClearUsersContext(user.id),
      },
      {
        title: !user.banned ? 'Заблокировать' : 'Разблокировать',
        className: !user.banned ? 'text-red-500' : 'text-green-500',
        onClick: () => onBanUser({ id: user.id, isBanned: user.banned }),
      },
      {
        title: 'Удалить',
        className: 'text-red-500',
        onClick: () => onDeleteUsers(user.id),
      },
    ];
  };

  return (
    <div className={className}>
      <div className="py-3 mb-3 h-12 flex items-center justify-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5">Всего пользователей:</Typography>
          <Chip color="primary" label={users.length} />
        </Stack>
        <TextField label="Поиск" />
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col">Telegram id</TableCell>
              <TableCell scope="col">Никнейм</TableCell>
              <TableCell scope="col">Имя</TableCell>
              <TableCell scope="col">Роль</TableCell>
              <TableCell scope="col">Кол-во сообщений</TableCell>
              <TableCell scope="col">Дата регистрации</TableCell>
              <TableCell scope="col">Статус</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <div className="text-white">Пользователи отсутствуют</div>
            )}
            {users.map(user => (
              <UsersTableItem
                key={user.id}
                user={user}
                actions={userActions(user)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
