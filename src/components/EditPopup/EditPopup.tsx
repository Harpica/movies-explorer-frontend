import { useState } from 'react';
import { User } from '../../@types/types';
import mainApi from '../../HTTP/MainApi';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import FormField from '../FormField/FormField';
import Popup, { PopupProps } from '../Popup/Popup';
import './EditPopup.css';

const editFormParams = [
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
];

interface EditPopupProps extends PopupProps {
  user: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const EditPopup: React.FC<EditPopupProps> = ({
  user,
  setCurrentUser,
  ...props
}) => {
  const {
    values, handleChange, errors, isValid, resetForm, ref,
  } = useFormWithValidation({
    name: user.name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');

  const updateUserData = async (userData: Omit<User, '_id'>) => {
    try {
      setIsLoading(true);
      const newUser = await mainApi.updateUserData(userData);
      setCurrentUser(newUser);
      props.closePopup();
    } catch (err) {
      if (err instanceof Error) {
        setApiErrorMessage(err.message);
        return;
      }
      setApiErrorMessage('Что-то пошло не так :С');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popup {...props}>
      <form className='popup-form' ref={ref}>
        <fieldset className='popup-form__fieldset'>
          {editFormParams.map((field) => (
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
        <p className='popup-form__api-error'>{apiErrorMessage}</p>
        <div className='popup-form__button-container'>
          <button
            type='submit'
            className='popup-form__submit'
            disabled={
              !isValid
              || (user.name === values.name && user.email === values.email)
              || isLoading
            }
            onClick={(e) => {
              e.preventDefault();
              updateUserData(values as Omit<User, '_id'>);
            }}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            type='button'
            className='popup-form__cancel'
            onClick={() => {
              resetForm({
                name: user.name,
                email: user.email,
              });
              props.closePopup();
            }}
          >
            Отменить
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default EditPopup;
