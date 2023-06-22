import { ROUTES } from '../../utils/constants';
import Auth from '../Auth/Auth';

const RegisterParams = {
  title: 'Добро пожаловать!',
  submit: 'Зарегистрироваться',
  description: 'Уже зарегистрированы?',
  link: ROUTES.signin,
  linkTitle: 'Войти',
  form: [
    {
      id: 'name',
      label: 'Имя',
      props: {
        required: true,
        minLendth: 2,
        maxLength: 30,
        placeholder: 'Ваше имя',
      },
    },
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

const Register = () => {
  return <Auth {...RegisterParams} />;
};

export default Register;
