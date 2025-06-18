import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import IInputField from '@shared/types/input-field.type';
import ErrorHandler from '@shared/utils/get-error-message';


@Component({
  selector: 'app-auth-form',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule], 
  templateUrl: './auth-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AuthForm {
  formGroup = input.required<FormGroup>();
  inputFields = input<IInputField[]>();
  btnSubmitLabel = input<string>('Send');

  formSubmit = output<void>();
  showPassword = false;

  get passwordVisibilityIcon() {
    return this.showPassword ? 'visibility' : 'visibility_off';
  }
  OnSubmit() {
    if (this.formGroup().valid) {
      this.formSubmit.emit();
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: IInputField) {
    return ErrorHandler.getErrorMessage(this.formGroup(), field.name);
  }
}
