import { useForm } from 'react-hook-form';

type Props = {
  onSubmit: () => void;
};

export default function ProfileSettings({ onSubmit }: Props) {
  const { handleSubmit, register, formState } = useForm();

  const { isDirty } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] gap-4 flex flex-col"
    >
      <div className="w-full">
        <label htmlFor="prevPassword">Имя</label>
        <input
          type="text"
          id="name"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Имя"
          {...register('name')}
        />
      </div>
      <div className="w-full">
        <label htmlFor="newPassword">Фамилия</label>
        <input
          type="text"
          id="surname"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Фамилия"
          {...register('surname')}
        />
      </div>
      <div className="w-full">
        <label htmlFor="newPassword">Почта</label>
        <input
          type="email"
          id="email"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Почта"
          {...register('email')}
        />
      </div>
      <button
        className="w-full disabled:bg-gray-500 disabled:active:scale-100 px-4 py-2 active:scale-95 transition-all text-center gap-2 hover:bg-indigo-500 rounded-lg bg-indigo-600 text-white"
        type="submit"
      >
        Обновить профиль
      </button>
    </form>
  );
}
