import { GetUsersDTO } from '../../../@types/dto/users';
import { ActionsMenu } from '../../../components/ActionsMenu';
import { Action } from '../../../components/ActionsMenu/types';

type Props = {
  user: GetUsersDTO[number];
  actions?: Action[];
};

export function UsersTableItem({ user, actions }: Props) {
  const formattedDate = new Date(user.createdAt).toLocaleString('ru-RU', {
    dateStyle: 'short',
  });
  return (
    <div className="w-full flex p-5 px-5 justify-between border-b-2 border-[#ECECEE]">
      <div className="w-[calc((100%-40px)/4)]">{user.telegramId}</div>
      <div className="w-[calc((100%-40px)/4)]">
        <div className="">{user.telegramName}</div>
        <div className="text-gray-500 text-sm">{user.telegramUsername}</div>
      </div>
      <div className="w-[calc((100%-40px)/4)]">{formattedDate}</div>
      <div className="w-[calc((100%-40px)/4)]">{user.messagesCount}</div>
      {actions && (
        <div className="px-2 pr-5 w-10">
          <ActionsMenu closeOnClick actions={actions} />
        </div>
      )}
    </div>
  );
}
