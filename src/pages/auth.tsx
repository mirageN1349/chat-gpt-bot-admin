import { useSigninMutation } from '../api/auth';
import { useNavigate } from 'react-router';
import { Signin } from '../business-components/Authorization/Signin';
import { SigninDTO } from '../@types/dto/auth';

export function AuthPage() {
  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();

  const onSubmit = async (data: SigninDTO) => {
    try {
      const res = await signin(data).unwrap();
      if (res.ok) {
        navigate('/users', {
          replace: true,
        });
      }
    } catch (responseError) {
      console.error(responseError);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Signin isLoading={isLoading} onSubmit={onSubmit} />
    </div>
  );
}
