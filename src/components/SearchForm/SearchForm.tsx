import useFormWithValidation from '../../hooks/useFormWithValidation';
import { SearchQuery, SwitchValue } from '../../utils/types';
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
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(defaultValues);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      searchValue: values.searchValue || '',
      isShort: values.isShort === 'true',
    });
  };
  const handleSwitcherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    onSwitcherChange({
      searchValue: values.searchValue || '',
      isShort: e.target.value === 'true',
    });
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
            pattern='[\wа-я\sё0-9\-\.,!?]+'
            id='search'
            name='searchValue'
            className='search__input'
            placeholder='Фильм'
            value={(values.searchValue as string) || ''}
            onChange={handleChange}
          />
          <button type='submit' className='search__submit' />
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
