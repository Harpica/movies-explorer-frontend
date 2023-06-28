import { useReducer, useState } from 'react';
import { SwitchValue } from '../../@types/types';
import './Swtch.css';

interface SwitchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  initialState: SwitchValue;
}

const Switch: React.FC<SwitchProps> = ({ onChange, name, initialState }) => {
  const [isChecked, setIsChecked] = useState(initialState === 'true');
  const [switchValue, toggleSwitchValue] = useReducer(
    (state) => (state === 'false' ? 'true' : 'false'),
    'true'
  );
  return (
    <div className='switch'>
      <input
        type='checkbox'
        id='switch'
        className='switch__input'
        tabIndex={0}
        checked={isChecked}
        value={switchValue}
        onChange={(e) => {
          toggleSwitchValue();
          setIsChecked(!isChecked);
          onChange(e);
        }}
        name={name}
      />
      <label className='switch__label' htmlFor='switch'>
        <div className='switch__slider' />
        Короткометражки
      </label>
    </div>
  );
};

export default Switch;
