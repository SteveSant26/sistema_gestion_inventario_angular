import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import { IInputField } from '@shared/types';
import { Button } from "@shared/components/button/button";
import { ErrorMessageBox } from '@shared/components/error-message-box/error-message-box';
import { FormInput } from '@shared/components/input/form-input';
import { SectionHeader } from "../section-header/section-header";


@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, Button, ErrorMessageBox, FormInput, SectionHeader],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Form {
  formGroup = input.required<FormGroup>();
  inputFields = input.required<IInputField[]>();

  headerTitle = input<string>('');
  btnSubmitLabel = input<string>('Send');
  error_message = input<string>('');

  isEditing = input<boolean>(false);

  formSubmit = output<void>();
  cancelEdit = output<void>();


  onSubmit() {
    this.formSubmit.emit();
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }


}
