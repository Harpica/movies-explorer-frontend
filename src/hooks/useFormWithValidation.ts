import { useCallback, useEffect, useRef, useState } from 'react';

const useFormWithValidation = (defaultValues?: { [key: string]: string }) => {
  const [values, setValues] = useState<{
    [key: string]: string;
  }>(defaultValues || {});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ref !== undefined && ref.current !== null) {
      setIsValid(ref.current.checkValidity());
    }
  }, [ref]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(ref.current!.checkValidity());
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
