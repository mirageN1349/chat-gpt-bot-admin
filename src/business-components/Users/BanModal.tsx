import { useState, ChangeEvent } from 'react';
import { Modal } from '../../components/Modal';
import { GrClose } from 'react-icons/gr';

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
  const [transition, setTransition] = useState(false);
  const [input, setInput] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <Modal
      open={open}
      onTransitionMount={() => setTransition(true)}
      onTransitionUnmount={() => setTransition(false)}
      onClose={onCancel}
    >
      <div
        className={`${
          transition ? 'opacity-1 -translate-y-1/2' : 'opacity-0 translate-y-10'
        } z-20 fixed top-1/2 left-1/2 transition-all -translate-x-1/2
        w-full flex flex-col p-4 h-screen max-w-[600px] max-h-[400px] bg-white rounded-lg`}
      >
        <h3 className="text-2xl font-bold flex items-center justify-between">
          Заблокировать пользователя?
          <button onClick={onCancel}>
            <GrClose />
          </button>
        </h3>
        <div className="my-8 grow">
          <label htmlFor="banTextarea">Причина блокировки</label>
          <textarea
            id="banTextarea"
            value={input}
            onChange={handleChangeInput}
            className="mt-2 resize-none h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
        </div>
        <div className="w-fill mt-8 shrink-0 gap-2 flex items-center">
          <button
            onClick={() => onSubmit?.(input)}
            disabled={isLoading}
            className="px-4 bg-red-500 text-white py-2 rounded-md"
          >
            {!isLoading ? 'Подтвердить' : 'Загрузка...'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 bg-gray-500 text-white py-2 rounded-md"
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
}
