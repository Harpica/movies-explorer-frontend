import { useState, useCallback } from 'react';
import { User } from '../../@types/types';
import mainApi from '../../HTTP/MainApi';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { getInputValidators } from '../../utils/utils';
import { Validator } from '../../utils/validator';
import FormField from '../FormField/FormField';
import Popup, { PopupProps } from '../Popup/Popup';
import './EditPopup.css';

const editFormParams = [
  {
    name: 'name',
    label: 'Имя',
    validator: new Validator({ required: true, minLength: 2, maxLength: 30 }),
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
    validator: new Validator({ required: true, isEmail: true }),
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
  closePopup,
  isOpen,
}) => {
  const { values, handleChange, errors, isValid, resetForm, ref } =
    useFormWithValidation(getInputValidators(editFormParams), {
      name: user.name,
      email: user.email,
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiNotification, setApiNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  }>({ type: 'success', message: '' });

  const updateUserData = async (userData: Omit<User, '_id'>) => {
    try {
      setIsLoading(true);
      const newUser = await mainApi.updateUserData(userData);
      setCurrentUser(newUser);
      setApiNotification({
        type: 'success',
        message: 'Данные успешно сохранены!',
      });
    } catch (err) {
      if (err instanceof Error) {
        setApiNotification({ type: 'error', message: err.message });
        return;
      }
      setApiNotification({ type: 'error', message: 'Что-то пошло не так :С' });
    } finally {
      setIsLoading(false);
    }
  };

  const onPopupClose = useCallback(() => {
    closePopup();
    setApiNotification({ type: 'success', message: '' });
  }, [closePopup]);

  return (
    <Popup closePopup={onPopupClose} isOpen={isOpen}>
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
        <p
          className={`popup-form__notification
            ${
              apiNotification.type === 'error'
                ? 'popup-form__notification_type_error'
                : ''
            }
          `}
        >
          {apiNotification.message}
        </p>
        <div className='popup-form__button-container'>
          <button
            type='submit'
            className='popup-form__submit'
            disabled={
              !isValid ||
              (user.name === values.name && user.email === values.email) ||
              isLoading
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
              onPopupClose();
            }}
          >
            Закрыть
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default EditPopup;
