import { useRef, useState, useEffect } from 'react';
import { SearchQuery, SwitchValue } from '../../@types/types';
import Switch from '../Switch/Switch';
import './SearchForm.css';

interface SearchFormProps {
  onSubmit: (searchQuery: SearchQuery) => Promise<void> | void;
  onSwitcherChange: (searchQuery: SearchQuery) => void;
  defaultValues?: {
    [key: string]: string;
  };
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  onSwitcherChange,
  defaultValues,
}) => {
  const [values, setValues] = useState<{
    [key: string]: string;
  }>({});

  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      searchValue: values.searchValue || '',
      isShort: values.isShort === 'true',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
  };

  const handleSwitcherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    onSwitcherChange({
      searchValue: values.searchValue || '',
      isShort: e.target.value === 'true',
    });
  };

  useEffect(() => {
    if (defaultValues !== undefined) {
      setValues(defaultValues);
    }
  }, [defaultValues]);

  return (
    <section className='search'>
      <form
        ref={ref}
        className='search__form'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className='search__input-container'>
          <input
            type='text'
            pattern='[\wа-я\sё0-9\-\.,!?]+'
            id='search'
            name='searchValue'
            className='search__input'
            placeholder='Фильм'
            value={(values.searchValue as string) || ''}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='search__submit'
            aria-label='Найти фильмы'
          />
        </div>
        <Switch
          onChange={handleSwitcherChange}
          name='isShort'
          initialState={(defaultValues?.isShort as SwitchValue) || 'false'}
        />
        <div className='search__devider' />
      </form>
    </section>
  );
};

export default SearchForm;
