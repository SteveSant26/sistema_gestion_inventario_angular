import { Component } from '@angular/core';
import { ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Form } from "@features/dashboard/components/form/form";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInputField } from '@shared/types';
import { ListItems } from "@features/dashboard/components/list-items/list-items";
import { ILocation } from '@features/dashboard/interfaces';
import { Location } from '@features/dashboard/services';
import { getLocationFormFields } from '@features/dashboard/pages/locations/utils';

@Component({
  selector: 'app-locations',
  imports: [Form, ListItems],
  templateUrl: './locations.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Locations {
  locationsForm!: FormGroup;
  locationsFormInputFields!: IInputField[];


  readonly formErrorMessage = signal('');
  readonly listErrorMessage = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly locationService = inject(Location);

  ngOnInit() {
    this.initLocationsForm();
    // this.locationService.loadJson('/json/locations.json')
  }


  initLocationsForm() {
    this.locationsForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      floors_num: [null, [Validators.required, Validators.min(1)]],
      capacity: [null, [Validators.required, Validators.min(1)]],
    });
    this.locationsFormInputFields = getLocationFormFields(this.locationsForm)

    const itemToEdit = this.locationService.getItemToEdit();
    if (itemToEdit) {
      this.locationsForm.setValue(itemToEdit);
    }
  }

  get btnSubmitLabel() {
    return this.locationService.isEditingNow() ? 'Actualizar ubicación' : 'Agregar ubicación';
  }


  addLocation() {
    console.log(this.locationsForm.valid);
    if (this.locationsForm.invalid) {
      console.log('invalid');
      this.locationsForm.markAllAsTouched();
      this.formErrorMessage.set('Complete los campos requeridos');
      return;
    }

    const location = this.locationsForm.value;

    if (this.locationService.isEditingNow()) {
      this.locationService.updateById(this.locationService.getItemToEdit()?.id!, location);
      this.locationService.cancelEdit();
      this.locationsForm.reset();
      alert('Ubicación actualizada');
    }
    else {
      if (this.locationService.existsById(location.id)) {
        this.formErrorMessage.set('Ya existe una ubicación con ese ID');
        return;
      }
      this.locationService.add(location);
      alert('Ubicación agregada');
    }
    this.formErrorMessage.set('');

  }

  removeLocation(item: ILocation) {
    this.locationService.deleteById(item.id);
    alert('Ubicación eliminada');
  }

  editLocation(item: ILocation) {

    this.locationsForm.setValue(item);
    this.locationService.startEdit(item);
    this.formErrorMessage.set('');
  }

  cancelEdit() {
    this.locationService.cancelEdit();
    this.formErrorMessage.set('');
    this.locationsForm.reset();
  }

  get isEditing() {
    return this.locationService.isEditingNow();
  }

  get locations() {
    console.log(this.locationService.getAll())
    return this.locationService.getAll();
  }


}
