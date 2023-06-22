import './FormField.css';

interface FormFieldProps {
  id: string;
  label: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, props }) => {
  return (
    <div className='form-field'>
      <label htmlFor={id} className='form-field__label'>
        {label}
      </label>
      <input type='text' id={id} className='form-field__input' {...props} />
      <p className='form-field__error'></p>
    </div>
  );
};

export default FormField;
