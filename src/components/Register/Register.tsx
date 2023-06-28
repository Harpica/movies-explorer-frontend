import { User } from '../../@types/types';
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
      name: 'name',
      label: 'Имя',
      props: {
        required: true,
        minLength: 2,
        maxLength: 30,
        placeholder: 'Ваше имя',
      },
    },
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

interface RegisterProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Register: React.FC<RegisterProps> = ({ setIsAuth, setCurrentUser }) => (
  <Auth
    type='register'
    {...RegisterParams}
    setIsAuth={setIsAuth}
    setCurrentUser={setCurrentUser}
  />
);

export default Register;
