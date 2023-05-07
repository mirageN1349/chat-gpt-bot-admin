import React from 'react';
import { useForm } from 'react-hook-form';

type ChangePasswordData = {
  prevPassword: string;
  newPassword: string;
};

type Props = {
  onSubmit: (data: ChangePasswordData) => void;
};

export default function ChangePassword({ onSubmit }: Props) {
  const { handleSubmit, register } = useForm<ChangePasswordData>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] gap-4 flex flex-col"
    >
      <h1 className="text-xl">Смена пароля</h1>
      <div className="w-full">
        <label htmlFor="prevPassword">Актуальный пароль</label>
        <input
          type="password"
          id="prevPassword"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Пароль"
          {...register('prevPassword')}
        />
      </div>
      <div className="w-full">
        <label htmlFor="newPassword">Новый пароль</label>
        <input
          type="password"
          id="newPassword"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Новый пароль"
          {...register('newPassword')}
        />
      </div>
      <button
        className="w-full px-4 py-2 active:scale-95 transition-all text-center gap-2 hover:bg-indigo-500 rounded-lg bg-indigo-600 text-white"
        type="submit"
      >
        Сменить пароль
      </button>
    </form>
  );
}
