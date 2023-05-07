import { Modal } from '../../components/Modal';

type Props = {
  open?: boolean;
  mailing?: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
};

export function SendModal({
  mailing,
  open = false,
  isLoading = false,
  onCancel,
  onSubmit,
}: Props) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div
        className="z-20 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
      w-full flex flex-col justify-between p-4 h-screen max-w-[600px] max-h-[400px] bg-gray-700 rounded-lg"
      >
        <h3 className="text-2xl font-bold text-white">
          Опубликовать рассылку?
        </h3>

        <p>{mailing}</p>

        <div className="w-fill gap-2 flex items-center">
          <button
            type="button"
            onClick={onSubmit}
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
