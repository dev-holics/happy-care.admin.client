import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumberRegexp = /[- +()0-9]{10,14}/g;
    const validPhoneNumber = phoneNumberRegexp.test(control.value);
    return (control.value && !validPhoneNumber) ? {invalidphoneNumber: {value: control.value}} : null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    const validPassword = passwordRegexp.test(control.value);
    return (control.value && !validPassword) ? {invalidPassword: {value: control.value}} : null;
  };
}

export function phoneNumberFormat(phoneNumberKey: string) {
  return (group: FormGroup) => {
      const value = group.controls[phoneNumberKey].value;
      const phoneNumberRegexp = /[- +()0-9]{10,14}/g;
      const validPhoneNumber = phoneNumberRegexp.test(value);
      if (!validPhoneNumber && value) {
        return  group.controls[phoneNumberKey].setErrors({invalidPhoneNumber: true})
      }
  }
}

export function passwordFormat(passwordKey: string) {
  return (group: FormGroup) => {
      const value = group.controls[passwordKey].value;
      const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
      const validPhoneNumber = passwordRegexp.test(value);
      if (!validPhoneNumber && value) {
        return  group.controls[passwordKey].setErrors({invalidPassword: true})
      }
  }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}
