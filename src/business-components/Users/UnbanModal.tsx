import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { GrClose } from 'react-icons/gr';

type Props = {
  open?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
};

export function UnbanModal({
  open = false,
  isLoading = false,
  onCancel,
  onSubmit,
}: Props) {
  const [transition, setTransition] = useState(false);

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
        w-full flex flex-col p-4 max-w-[600px] bg-white rounded-lg`}
      >
        <h3 className="text-2xl font-bold flex items-center justify-between">
          Разблокировать пользователя?
          <button onClick={onCancel}>
            <GrClose />
          </button>
        </h3>

        <div className="w-fill mt-8 gap-2 flex items-center">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-4 bg-red-500 text-white py-2 rounded-md"
          >
            {!isLoading ? 'Подтвердить' : 'Загрузка...'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 text-white py-2 rounded-md bg-gray-500"
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
}
