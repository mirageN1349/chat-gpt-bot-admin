import { BsPlus } from 'react-icons/bs';
import MailingsTable from '../business-components/Mailing/Table';

export type Mailing = {
  id: string;
  title: string;
  content: string;
  status: 'init' | 'pending' | 'sended' | 'error';
  createdAt: string;
  updatedAt: string;
  sendDate: string;
};

const mockMailings: Mailing[] = [
  {
    id: '123',
    title: 'Тестовая рассылка',
    content: 'some markdown',
    status: 'init',
    createdAt: '12.12.2001',
    updatedAt: '12.12.2001',
    sendDate: '12.12.2001',
  },
  {
    id: '1234',
    title: 'Тестовая рассылка 2',
    content: 'some markdown',
    status: 'pending',
    createdAt: '12.12.2001',
    updatedAt: '12.12.2001',
    sendDate: '12.12.2001',
  },
  {
    id: '1235',
    title: 'Тестовая рассылка 3',
    content: 'some markdown',
    status: 'sended',
    createdAt: '12.12.2001',
    updatedAt: '12.12.2001',
    sendDate: '12.12.2001',
  },
  {
    id: '1235',
    title: 'Ошибка в рассылке',
    content: 'some markdown',
    status: 'error',
    createdAt: '12.12.2001',
    updatedAt: '12.12.2001',
    sendDate: '12.12.2001',
  },
];

export function MailingsPage() {
  const mailings = mockMailings;
  return (
    <div className="w-full">
      <header className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-medium">Рассылки</div>
        <button className="flex px-4 py-2 active:scale-95 transition-all  gap-2 hover:bg-indigo-500 rounded-lg bg-indigo-600 text-white items-center">
          <BsPlus className="w-6 h-6" />
          {' '}
          Создать
        </button>
      </header>

      {mailings && <MailingsTable mailings={mailings} />}
    </div>
  );
}
