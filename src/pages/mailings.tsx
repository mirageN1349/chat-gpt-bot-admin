import { BsPlus } from 'react-icons/bs';
import MailingsTable from '../business-components/Mailing/Table';
import { CreateModal } from '../business-components/Mailing/CreateModal';
import { useState } from 'react';
import Button from '../components/Button';

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
  const [createModal, setCreateModal] = useState(false);
  const mailings = mockMailings;
  return (
    <>
      <div className="w-full">
        <header className="mb-10 flex items-center justify-between">
          <div className="text-2xl font-medium">Рассылки</div>
          <Button
            onClick={() => setCreateModal(true)}
            type="button"
            className="flex items-center"
          >
            <BsPlus className="w-6 h-6" />
            Создать
          </Button>
        </header>

        {mailings && <MailingsTable mailings={mailings} />}
      </div>
      <CreateModal
        open={createModal}
        onCancel={() => setCreateModal(false)}
        onSubmit={data => console.log(data)}
      />
    </>
  );
}
