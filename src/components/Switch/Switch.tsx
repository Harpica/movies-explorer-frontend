import './Swtch.css';

const Switch = () => {
  return (
    <label className='switch' htmlFor='checkbox'>
      <input type='checkbox' id='checkbox' className='switch__input' />
      <div className='switch__slider'></div>
      Короткометражки
    </label>
  );
};

export default Switch;
