import { useState } from 'react';
import { Modal } from '../../components/Modal';

type Props = {
  open?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (banReason: string) => void;
};

export function BanModal({
  open = false,
  isLoading = false,
  onCancel,
  onSubmit,
}: Props) {
  const [input, setInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <Modal open={open} onClose={onCancel}>
      <div
        className="z-20 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
      w-full flex flex-col justify-between p-4 h-screen max-w-[600px] max-h-[400px] bg-gray-700 rounded-lg"
      >
        <h3 className="text-2xl font-bold text-white">
          Заблокировать пользователя?
        </h3>
        <textarea
          value={input}
          onChange={handleChangeInput}
          className="my-4 resize-none h-full max-h-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="w-fill gap-2 flex items-center">
          <button
            onClick={() => onSubmit?.(input)}
            disabled={isLoading}
            className="px-4 text-xl bg-red-500 text-white py-2 rounded-md"
          >
            {!isLoading ? 'Подтвердить' : 'Загрузка...'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 text-xl text-white py-2 rounded-md bg-gray-900"
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
}
