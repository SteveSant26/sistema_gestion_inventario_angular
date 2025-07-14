import { Component } from '@angular/core';
import { ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Form } from "@features/dashboard/components/form/form";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInputField } from '@shared/types';
import { ListItems } from "@features/dashboard/components/list-items/list-items";
import { getUserFormFields } from '@features/dashboard/pages/users/utils';
import { User } from '@features/dashboard/services/users';
import { IUser } from '@features/auth/interfaces';
import { Auth } from '@features/auth/services';


@Component({
  selector: 'app-users',
  imports: [Form, ListItems],
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users {

  usersForm!: FormGroup;
  usersFormInputFields!: IInputField[];


  readonly formErrorMessage = signal('');
  readonly listErrorMessage = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(User);



  ngOnInit() {
    this.initUsersForm();
  }


  initUsersForm() {
    this.usersForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });

    this.usersFormInputFields = getUserFormFields(this.usersForm)
    const itemToEdit = this.userService.getItemToEdit();
    if (itemToEdit) {
      this.usersForm.patchValue(itemToEdit);
    }
  }

  get btnSubmitLabel() {
    return this.userService.isEditingNow() ? 'Actualizar usuario' : 'Agregar usuario';
  }


  addUser() {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched();
      this.formErrorMessage.set('Complete los campos requeridos');
      return;
    }

    const user = this.usersForm.value;

    if (this.userService.isEditingNow()) {
      console.log('editing user');
      console.log(this.userService.getItemToEdit());
      this.userService.updateByEmail(this.userService.getItemToEdit()?.email!, user);

      this.userService.cancelEdit();
      this.usersForm.reset();
      this.usersForm.markAsPristine();
      alert('Usuario actualizado');
    }
    else {
      if (this.userService.existsByEmail(user.email)) {
        this.formErrorMessage.set('Ya existe un usuario con ese email');
        return;
      }
      this.userService.add(user);
      alert('Usuario agregado');
    }


    this.formErrorMessage.set('');

  }

  removeUser(item: IUser) {
    this.userService.deleteByEmail(item.email);
    alert('Usuario eliminado');
  }

  editUser(item: IUser) {

    console.log('Editing user:', item);
    this.usersForm.patchValue(item);

    this.userService.startEdit(item);
    this.formErrorMessage.set('');
  }

  cancelEdit() {
    this.userService.cancelEdit();
    this.formErrorMessage.set('');
    this.usersForm.reset();
  }

  get isEditing() {
    return this.userService.isEditingNow();
  }

  get users() {
    return this.userService.getAll();
  }

}
