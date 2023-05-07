import { useForm } from 'react-hook-form';
import { Modal } from '../../components/Modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

type CreateMailingDTO = {
  title: string;
  content: string;
  startDate: string;
};

type Props = {
  open: boolean;
  onSubmit: (data: CreateMailingDTO) => void;
  onCancel: () => void;
};

export function CreateModal({ open, onSubmit, onCancel }: Props) {
  const [transition, setTransition] = useState(false);

  const { handleSubmit, register } = useForm<CreateMailingDTO>();
  return (
    <Modal
      open={open}
      onTransitionMount={() => setTransition(true)}
      onTransitionUnmount={() => setTransition(false)}
      onClose={onCancel}
    >
      <form
        className={`${
          transition ? 'opacity-1 -translate-y-1/2' : 'opacity-0 translate-y-10'
        } z-20 fixed top-1/2 left-1/2 transition-all -translate-x-1/2
        w-full flex flex-col gap-5 p-4 max-w-[600px] bg-white rounded-lg`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl font-bold flex items-center justify-between">
          Создание рассылки
          <button onClick={onCancel}>
            <GrClose />
          </button>
        </h3>
        <div>
          <div className="w-full">
            <label htmlFor="title">Название</label>
            <input
              type="text"
              id="title"
              className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
              placeholder="Название"
              {...register('title')}
            />
          </div>
          <div className="w-full">
            <label htmlFor="content">Контент</label>
            <input
              type="text"
              id="content"
              className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
              placeholder="Контент"
              {...register('content')}
            />
          </div>
          <div className="w-full">
            <label htmlFor="startDate">Дата рассылки</label>
            <input
              type="text"
              id="startDate"
              className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
              placeholder="Дата начала"
              {...register('startDate')}
            />
          </div>
        </div>
        <div className="w-fill gap-2 flex items-center">
          <button
            type="submit"
            className="px-4 bg-indigo-600 text-white py-2 rounded-md"
          >
            Создать
          </button>
          <button
            onClick={onCancel}
            className="px-4 text-white py-2 rounded-md bg-gray-500"
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
}
