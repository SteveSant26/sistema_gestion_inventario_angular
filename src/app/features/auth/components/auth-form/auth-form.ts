import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


import { IInputField } from '@shared/types';
import { Button } from "@shared/components/button/button";
import { ErrorMessageBox } from "@shared/components/error-message-box/error-message-box";
import { FormInput } from "@shared/components/input/form-input";


@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, Button, ErrorMessageBox, FormInput],
  templateUrl: './auth-form.html',

  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AuthForm {
  formGroup = input.required<FormGroup>();
  inputFields = input.required<IInputField[]>();
  btnSubmitLabel = input<string>('Send');
  error_message = input<string>('');

  formSubmit = output<void>();

  onSubmit() {
    this.formSubmit.emit();
  }
}
