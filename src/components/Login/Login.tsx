import { User } from '../../@types/types';
import { ROUTES } from '../../utils/constants';
import Auth from '../Auth/Auth';

const LoginParams = {
  title: 'Рады видеть!',
  submit: 'Войти',
  description: 'Ещё не зарегистрированы?',
  link: ROUTES.signup,
  linkTitle: 'Регистрация',
  form: [
    {
      name: 'email',
      label: 'E-mail',
      props: {
        required: true,
        type: 'email',
        placeholder: 'email@email.com',
      },
    },
    {
      name: 'password',
      label: 'Пароль',
      props: {
        required: true,
        type: 'password',
        placeholder: '********',
      },
    },
  ],
};

interface LoginProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuth, setCurrentUser }) => (
  <Auth
    type='login'
    {...LoginParams}
    setIsAuth={setIsAuth}
    setCurrentUser={setCurrentUser}
  />
);

export default Login;
