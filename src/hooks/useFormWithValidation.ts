import { useCallback, useEffect, useRef, useState } from 'react';
import { Validator } from '../utils/validator';

const useFormWithValidation = (
  inputsValidators: { [key: string]: Validator },
  defaultValues?: { [key: string]: string }
) => {
  const [values, setValues] = useState<{
    [key: string]: string;
  }>(defaultValues || {});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [validities, setValidities] = useState<{ [key: string]: boolean }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);

  const validate = (inputName: string, inputValue: string) => {
    const { errorMessage, isValid } =
      inputsValidators[inputName].validate(inputValue);
    setValues({ ...values, [inputName]: inputValue });
    setErrors({ ...errors, [inputName]: errorMessage });
    setValidities({ ...validities, [inputName]: isValid });
  };

  useEffect(() => {
    if (
      Object.values(values).length === Object.values(inputsValidators).length &&
      Object.values(validities).every((validity) => validity === true)
    ) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }, [validities, values, inputsValidators]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    validate(name, value);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    ref,
  };
};

export default useFormWithValidation;
