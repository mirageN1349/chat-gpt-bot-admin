import { Mailing } from '../../../pages/mailings';
import { MailingsTableItem } from './Item';

type Props = {
  className?: string;
  mailings: Mailing[];
};

export default function MailingsTable({ className = '', mailings }: Props) {
  const actions = [
    {
      title: 'Просмотр',
      className: 'hover:text-indigo-600 hover:bg-indigo-600/10',
    },
    // TODO: Нельзя редактировать отправленные рассылки
    {
      title: 'Редактировать',
      className: 'hover:text-indigo-600 hover:bg-indigo-600/10',
    },
    {
      className: 'text-red-500 hover:bg-indigo-600/10',
      title: 'Удалить',
    },
  ];

  return (
    <div className={`${className} rounded-xl border-2 border-[#ECECEE] w-full`}>
      <div className="border-b bg-[#F9F9FD] p-5 px-5 flex justify-between border-[#ECECEE]">
        <div className="w-[calc((100%-40px)/4)] text-left">Название</div>
        <div className="w-[calc((100%-40px)/4)] text-left">Статус</div>
        <div className="w-[calc((100%-40px)/4)] text-left">Дата создания</div>
        <div className="w-[calc((100%-40px)/4)] text-left">Дата отправки</div>
        <div className="w-10"></div>
      </div>
      <div>
        {mailings.length === 0 && <div>Рассылки отсутствуют</div>}
        {mailings.map(mailing => (
          <MailingsTableItem mailing={mailing} actions={actions} />
        ))}
      </div>
    </div>
  );
}
