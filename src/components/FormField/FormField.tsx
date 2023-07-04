import './FormField.css';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  props,
  value,
  handleChange,
  error,
}) => (
  <div className='form-field'>
    <label htmlFor={id} className='form-field__label'>
      {label}
    </label>
    <input
      id={id}
      type='text'
      name={name}
      className='form-field__input'
      value={value || ''}
      onChange={handleChange}
      {...props}
    />
    <p className='form-field__error'>{error}</p>
  </div>
);

export default FormField;
