import { Component,ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Form } from "@features/dashboard/components/form/form";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInputField } from '@shared/types';
import { ListItems } from "@features/dashboard/components/list-items/list-items";
import { getInventoryAssetsFormFields } from '@features/dashboard/pages/inventory-assets/utils';
import { InventoryAsset } from '@features/dashboard/services/inventory-asset';
import { IInventoryAsset } from '@features/dashboard/interfaces';
import { Category, User, Location } from '@features/dashboard/services';
import { Auth } from '@features/auth/services';

@Component({
  selector: 'app-inventory-assets',
  imports: [Form, ListItems],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inventory-assets.html'
})
export class InventoryAssets {

  inventoryAssetsForm!: FormGroup;
  inventoryAssetsFormInputFields!: IInputField[];


  readonly formErrorMessage = signal('');
  readonly listErrorMessage = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly inventoryAssetService = inject(InventoryAsset);
  private readonly userService = inject(User);
  private readonly categoryService = inject(Category);
  private readonly locationsService = inject(Location);
  private readonly authService = inject(Auth);

  ngOnInit() {
    this.initInventoryAssetsForm();
    this.inventoryAssetService.loadJson('/json/inventory-assets.json')
  }


  initInventoryAssetsForm() {
    this.inventoryAssetsForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],
      personInChargeEmail: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });

    this.inventoryAssetsFormInputFields = getInventoryAssetsFormFields(this.inventoryAssetsForm, this.categoryService, this.locationsService, this.userService);
    const itemToEdit = this.inventoryAssetService.getItemToEdit();
    if (itemToEdit) {
      this.inventoryAssetsForm.patchValue(itemToEdit);
    }
  }

  get btnSubmitLabel() {
    return this.inventoryAssetService.isEditingNow() ? 'Actualizar activo' : 'Agregar activo';
  }


  addInventoryAsset() {
    if (this.inventoryAssetsForm.invalid) {
      this.inventoryAssetsForm.markAllAsTouched();
      this.formErrorMessage.set('Complete los campos requeridos');
      return;
    }

    const inventory_asset = this.inventoryAssetsForm.value;

    if (this.inventoryAssetService.isEditingNow()) {
      this.inventoryAssetService.updateById(this.inventoryAssetService.getItemToEdit()?.id!, inventory_asset);

      this.inventoryAssetService.cancelEdit();
      this.inventoryAssetsForm.reset();
      this.inventoryAssetsForm.markAsPristine();
      alert('Activo actualizado');
    }
    else {
      if (this.inventoryAssetService.updateById(inventory_asset.id, inventory_asset)) {
        this.formErrorMessage.set('Ya existe un activo con ese id');
        return;
      }
      this.inventoryAssetService.add(inventory_asset);
      alert('Activo agregado');
    }


    this.formErrorMessage.set('');

  }

  removeInventoryAsset(item: IInventoryAsset) {
    this.inventoryAssetService.deleteById(item.id);
    alert('Activo eliminado');
  }

  editInventoryAsset(item: IInventoryAsset) {

    this.inventoryAssetsForm.patchValue(item);

    this.inventoryAssetService.startEdit(item);
    this.formErrorMessage.set('');
  }

  cancelEdit() {
    this.inventoryAssetService.cancelEdit();
    this.formErrorMessage.set('');
    this.inventoryAssetsForm.reset();
  }

  get isEditing() {
    return this.inventoryAssetService.isEditingNow();
  }

  get inventoryAssets() {
    return this.inventoryAssetService.getAll();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
