import { tlds } from '@hapi/tlds';
import Joi from 'joi';

export class Validator {
  private minLength: number;
  private maxLength: number;
  private required: boolean;
  private isEmail: boolean;
  constructor({
    minLength = 0,
    maxLength = 0,
    required = false,
    isEmail = false,
  }) {
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.required = required;
    this.isEmail = isEmail;
  }
  public validate(value: string) {
    if (
      this.minLength !== 0 &&
      value.length < this.minLength &&
      value.length > 0
    ) {
      return {
        errorMessage: `Минимальное количество символов: ${this.minLength}`,
        isValid: false,
      };
    } else if (this.maxLength !== 0 && value.length >= this.maxLength) {
      return {
        errorMessage: `Максимальное количество символов: ${this.maxLength}`,
        isValid: false,
      };
    } else if (this.required !== false && value.length < 1) {
      return {
        errorMessage: `Данное поле обязательно к заполнению`,
        isValid: false,
      };
    } else if (this.isEmail === true && !this.isValidEmail(value)) {
      return {
        errorMessage: `Введите корректный email`,
        isValid: false,
      };
    } else {
      return { errorMessage: '', isValid: true };
    }
  }
  private isValidEmail(email: string) {
    const rules = Joi.string()
      .required()
      .email({ tlds: { allow: tlds } });

    return rules.validate(email).error === undefined;
  }
}
