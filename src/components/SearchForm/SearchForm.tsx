import { useState } from 'react';
import { NOTIFICATIONS } from '../../utils/constants';
import Switch from '../Switch/Switch';
import './SearchForm.css';

interface SearchFormProps {
  onSubmit: (searchValue: string) => Promise<void> | void;
  onSwitcherChange: (isShort: boolean) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  isShortInit: boolean;
  type: 'saved' | 'all';
  isLoading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  onSwitcherChange,
  setSearchValue,
  searchValue,
  isShortInit,
  type,
  isLoading,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const inputElement = e.currentTarget.elements.namedItem(
      'searchValue'
    ) as HTMLInputElement;
    const searchValue = inputElement.value;
    if (searchValue === '' && type === 'all') {
      setErrorMessage(NOTIFICATIONS.lessThan1Symbol);
      return;
    }
    setSearchValue(searchValue);
    onSubmit(searchValue);
  };

  const handleSwitcherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const booleanSwitcherValue = e.currentTarget.value === 'true';
    onSwitcherChange(booleanSwitcherValue);
  };

  return (
    <section className='search'>
      <form
        className='search__form'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className='search__input-container'>
          <input
            type='text'
            id='search'
            name='searchValue'
            className='search__input'
            placeholder='Фильм'
            defaultValue={searchValue || ''}
            disabled={isLoading}
          />
          <button
            type='submit'
            className='search__submit'
            aria-label='Найти фильмы'
            disabled={isLoading}
          />
        </div>
        <p className='search__error'>{errorMessage}</p>
        <Switch
          onChange={handleSwitcherChange}
          name='isShort'
          initialState={isShortInit.toString() === 'true' ? 'true' : 'false'}
        />
        <div className='search__devider' />
      </form>
    </section>
  );
};

export default SearchForm;
