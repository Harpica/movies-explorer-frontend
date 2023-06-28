import { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, UserCredentials } from '../../@types/types';
import mainApi from '../../HTTP/MainApi';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { ROUTES } from '../../utils/constants';
import FormField from '../FormField/FormField';
import Logo from '../Logo/Logo';
import './Auth.css';

interface AuthProps {
  type: 'login' | 'register';
  title: string;
  submit: string;
  description: string;
  link: string;
  linkTitle: string;
  form: Array<{
    name: string;
    label: string;
    props: React.InputHTMLAttributes<HTMLInputElement>;
  }>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Auth: React.FC<AuthProps> = ({
  type,
  title,
  submit,
  description,
  link,
  linkTitle,
  form,
  setIsAuth,
  setCurrentUser,
}) => {
  const {
    values, handleChange, errors, isValid, ref,
  } = useFormWithValidation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const authUser = useCallback(
    async (userData: UserCredentials | Omit<UserCredentials, 'name'>) => {
      try {
        setIsLoading(true);
        let user;
        if (type === 'register') {
          user = await mainApi.registerUser(userData as UserCredentials);
        } else {
          user = await mainApi.loginUser(userData);
        }
        setIsAuth(true);
        setCurrentUser(user);
        navigate(ROUTES.movies);
      } catch (err) {
        if (err instanceof Error) {
          setApiErrorMessage(err.message);
          return;
        }
        setApiErrorMessage('Что-то пошло не так :С');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsAuth, setCurrentUser, navigate, type],
  );

  return (
    <section className='auth'>
      <div className='auth__container'>
        <header className='auth__header'>
          <Logo />
          <h1 className='auth__title'>{title}</h1>
        </header>
        <form
          ref={ref}
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            authUser(values as UserCredentials | Omit<UserCredentials, 'name'>);
          }}
        >
          <fieldset className='form__fieldset'>
            {form.map((field) => (
              <FormField
                {...field}
                key={field.name}
                name={field.name}
                id={field.name}
                value={values[field.name]}
                error={errors[field.name]}
                handleChange={handleChange}
              />
            ))}
          </fieldset>
          <p className='form__api-error'>{apiErrorMessage}</p>
          <div className='form__button-container'>
            <button type='submit' className='form__submit' disabled={!isValid}>
              {isLoading ? 'Загрузка...' : submit}
            </button>
            <div className='form__link-container'>
              <p className='form__link-description'>{description}</p>
              <NavLink className='form__link' to={link}>
                {linkTitle}
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
