import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;

    const passwordValue = formGroup.get('password')?.value;
    const passwordConfirmValue = formGroup.get('passwordConfirm')?.value;
    const isMatched = passwordValue === passwordConfirmValue;

    if (!isMatched) {
      return { passwordMismatch: true };
    }
    return null;
  };
}

export function lowercaseCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordValue: string = control.value;
    const validationResult =
      !!passwordValue && lowerCaseRegex.test(passwordValue);

    if (!validationResult) {
      return { unmetLowercase: true };
    }
    return null;
  };
}

export function uppercaseCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordValue: string = control.value;
    const validationResult =
      !!passwordValue && upperCaseRegex.test(passwordValue);

    if (!validationResult) {
      return { unmetUppercase: true };
    }
    return null;
  };
}

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let passwordValue: string = control.value;

    // Trim leading and trailing spaces
    passwordValue = passwordValue.trim();

    if (!passwordValue || passwordValue.length < minLength) {
      return { minLengthFailed: true };
    }

    return null;
  };
}
