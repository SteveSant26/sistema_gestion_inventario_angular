import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IInputField } from '@shared/types';
import {ErrorHandler} from '@shared/utils';


@Component({
  selector: 'app-form-input',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-input.html',
})
export class FormInput {
  field = input.required<IInputField>();


  showPassword = false;

  get passwordVisibilityIcon() {
    return this.showPassword ? 'visibility' : 'visibility_off';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



  getErrorMessage(field: IInputField) {
    return ErrorHandler.getErrorMessage(field);
  }
}
