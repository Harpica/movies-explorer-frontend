import './Swtch.css';

const Switch = () => {
  return (
    <div className='switch'>
      <input
        type='checkbox'
        id='switch'
        className='switch__input'
        tabIndex={0}
      />
      <label className='switch__label' htmlFor='switch'>
        <div className='switch__slider' />
        Короткометражки
      </label>
    </div>
  );
};

export default Switch;
