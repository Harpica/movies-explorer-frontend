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
      id: 'email',
      label: 'E-mail',
      props: {
        required: true,
        type: 'email',
        placeholder: 'email@email.com',
      },
    },
    {
      id: 'password',
      label: 'Пароль',
      props: {
        required: true,
        type: 'password',
        placeholder: '********',
      },
    },
  ],
};

const Login = () => {
  return <Auth {...LoginParams} />;
};

export default Login;
