import Switch from '../Switch/Switch';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__input-container'>
          <input
            type='text'
            id='search'
            className='search__input'
            placeholder='Фильм'
            required
          />
          <button type='submit' className='search__submit'></button>
        </div>
        <Switch />
        <div className='search__devider' />
      </form>
    </section>
  );
};

export default SearchForm;
