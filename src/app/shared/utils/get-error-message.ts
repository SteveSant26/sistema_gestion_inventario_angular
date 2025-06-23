import { IInputField } from '@shared/types';


export class ErrorHandler {

  static getErrorMessage(field: IInputField): string | null {
  const control = field.control;

  if (control && (control.touched || control.dirty) && control.invalid) {
    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('email')) {
      return 'This must be an email.';
    }

    if (control.hasError('minlength')) {
      return `Minimum length is ${control.getError('minlength').requiredLength} characters.`;
    }
    if (control.hasError('maxlength')) {
      return `Maximun length is ${control.getError('maxlength').requiredLength} characters.`;
    }
    if (control.hasError('min')) {
      return `Value must be greater than ${control.getError('min').requiredLength}`;
    }
    if (control.hasError('noNumbers')) {
      return 'This field cannot contain numbers.';
    }
  }

  return null;
}
}

