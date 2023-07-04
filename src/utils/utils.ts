import { SCREEN_WIDTH } from './constants';
import { Validator } from './validator';

export const findCardsGridCongig = (width: number) => {
  if (width > SCREEN_WIDTH.large) {
    return { init: 12, add: 3 };
  }
  if (width < SCREEN_WIDTH.large && width > SCREEN_WIDTH.medium) {
    return { init: 8, add: 2 };
  }
  return { init: 5, add: 2 };
};

export const getInputValidators = (
  formParams: Array<{
    name: string;
    label: string;
    validator: Validator;
    props: React.InputHTMLAttributes<HTMLInputElement>;
  }>
) => {
  return formParams.reduce(
    (prevValue: { [key: string]: Validator }, currEl) => {
      prevValue[currEl.name] = currEl.validator;
      return prevValue;
    },
    {}
  );
};

export const getLocalStorageValue = <T>(key: string, fallbackValue: T) => {
  const valueStringifyed = window.localStorage.getItem(key);
  if (valueStringifyed !== null) {
    return JSON.parse(valueStringifyed) as T;
  }
  return fallbackValue;
};
