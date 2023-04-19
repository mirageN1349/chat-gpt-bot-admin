import React from 'react';
import { useForm } from 'react-hook-form';

type SigninData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: SigninData) => void;
  isLoading?: boolean;
};

export function Signin({ isLoading = false, onSubmit }: Props) {
  const { handleSubmit, register } = useForm<SigninData>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] gap-4 flex flex-col items-center"
    >
      <h1 className="font-bold text-3xl dark:text-white">Вход</h1>
      <div className="w-full">
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Почта
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Почта"
          {...register('email')}
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Пароль
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Пароль"
          {...register('password')}
        />
      </div>
      <button
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="submit"
      >
        {!isLoading ? 'Войти' : 'Вход...'}
      </button>
    </form>
  );
}
