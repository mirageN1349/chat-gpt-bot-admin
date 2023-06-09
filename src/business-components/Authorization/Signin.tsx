import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

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
      <h1 className="font-bold text-3xl">Вход</h1>
      <div className="w-full">
        <label htmlFor="email">Почта</label>
        <input
          type="email"
          id="email"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Почта"
          {...register('email')}
        />
      </div>
      <div className="w-full">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          className="mt-1 rounded-lg outline-none w-full gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
          placeholder="Пароль"
          {...register('password')}
        />
      </div>
      <Button className="w-full" disabled={isLoading} type="submit">
        {!isLoading ? 'Войти' : 'Вход...'}
      </Button>
    </form>
  );
}
