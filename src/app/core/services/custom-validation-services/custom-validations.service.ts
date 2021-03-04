import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationsService {

  constructor() { }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? {} : { invalidPassword: true };
    };
  }

  mobileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp(/^(05)([0-9]{8})*$/);
      const valid = regex.test(control.value);
      return valid ? {} : { invalidPhone: true };
    };
  }
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp(/^(011|012|013|014|015|016|017)([0-9]{7})*$/);
      const valid = regex.test(control.value);
      return valid ? {} : { invalidPhone: true };
    };
  }
  nationalIDValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp(/^[1][1-9]\d{8}$/);
      const valid = regex.test(control.value);
      return valid ? {} : { invalidID: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  validateFileSize(size: number) {
    if(size>5120000){
      return false;
    }
    return true;
  }
}
