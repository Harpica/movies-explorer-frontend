import './Auth.css';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FormField from '../FormField/FormField';

interface AuthProps {
  title: string;
  submit: string;
  description: string;
  link: string;
  linkTitle: string;
  form: Array<{
    id: string;
    label: string;
    props: React.InputHTMLAttributes<HTMLInputElement>;
  }>;
}

const Auth: React.FC<AuthProps> = ({
  title,
  submit,
  description,
  link,
  linkTitle,
  form,
}) => {
  return (
    <section className='auth'>
      <div className='auth__container'>
        <header className='auth__header'>
          <Logo />
          <h1 className='auth__title'>{title}</h1>
        </header>
        <form className='form'>
          <fieldset className='form__fieldset'>
            {form.map((field, _i) => (
              <FormField {...field} key={field.id} />
            ))}
          </fieldset>
          <div className='form__button-container'>
            <button type='submit' className='form__submit'>
              {submit}
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
