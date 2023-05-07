import { ActionsMenu } from '../../../components/ActionsMenu';
import { Action } from '../../../components/ActionsMenu/types';
import { Mailing } from '../../../pages/mailings';

type Props = {
  mailing: Mailing;
  actions?: Action[];
};

const statuses = {
  init: {
    text: 'Создана',
    className: 'bg-gray-300',
  },
  pending: {
    text: 'Ожидает отправки',
    className: 'bg-yellow-400',
  },
  sended: {
    text: 'Отправлена',
    className: 'bg-green-600 text-white',
  },
  error: {
    text: 'Произошла ошибка',
    className: 'bg-red-500 text-white',
  },
} as const;

export function MailingsTableItem({ mailing, actions }: Props) {
  const createdDate = new Date(mailing.createdAt).toLocaleString('ru-RU', {
    dateStyle: 'short',
  });
  const sendDate = new Date(mailing.sendDate).toLocaleString('ru-RU', {
    dateStyle: 'short',
  });

  const formattedStatus = statuses[mailing.status];

  return (
    <div className="w-full flex p-5 px-5 justify-between last:border-none border-b-2 border-[#ECECEE]">
      <div className="w-[calc((100%-40px)/4)]">{mailing.title}</div>
      <div className="w-[calc((100%-40px)/4)]">
        <div
          className={`${formattedStatus.className} w-fit py-1 px-2 rounded-full text-sm`}
        >
          {formattedStatus.text}
        </div>
      </div>
      <div className="w-[calc((100%-40px)/4)]">{createdDate}</div>
      <div className="w-[calc((100%-40px)/4)]">{sendDate}</div>
      {actions && (
        <div className="px-2 pr-5 w-10">
          <ActionsMenu closeOnClick actions={actions} />
        </div>
      )}
    </div>
  );
}
