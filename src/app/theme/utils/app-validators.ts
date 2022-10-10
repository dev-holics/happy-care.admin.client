import { FormGroup, FormControl } from '@angular/forms';

export function phoneNumberValidator(control: FormControl): {[key: string]: any} {
    const phoneNumberRegexp = /[0-9\+\-\ ]/;
    if (control.value && !phoneNumberRegexp.test(control.value)) {
        return {invalidphoneNumber: true};
    }
    return {invalidphoneNumber: false};
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
