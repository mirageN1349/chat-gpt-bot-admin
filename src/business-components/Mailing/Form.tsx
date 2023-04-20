import { useForm } from 'react-hook-form';

type Props = {
  isLoading?: boolean;
  onSubmit: (formData: FormType) => void;
};

type FormType = {
  message: string;
};

export function MailingForm({ isLoading, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<FormType>();

  return (
    <form className="w-full max-w-[600px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <label
          htmlFor="message"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <textarea
          id="message"
          className="min-h-[200px] max-h-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Почта"
          {...register('message')}
        />
        <button
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="submit"
        >
          {!isLoading ? 'Войти' : 'Вход...'}
        </button>
      </div>
    </form>
  );
}
