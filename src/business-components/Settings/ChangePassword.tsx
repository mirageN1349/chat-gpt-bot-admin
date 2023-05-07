import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

type ChangePasswordData = {
  prevPassword: string;
  newPassword: string;
};

type Props = {
  onSubmit: (data: ChangePasswordData) => void;
};

export default function ChangePassword({ onSubmit }: Props) {
  const { handleSubmit, register, formState } = useForm<ChangePasswordData>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] gap-4 flex flex-col"
    >
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
      <Button>Сменить пароль</Button>
    </form>
  );
}
