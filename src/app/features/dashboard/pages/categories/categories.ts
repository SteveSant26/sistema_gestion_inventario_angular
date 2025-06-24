import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Form } from "@features/dashboard/components/form/form";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInputField } from '@shared/types';
import { ListItems } from "@features/dashboard/components/list-items/list-items";
import { ICategory } from '@features/dashboard/interfaces';
import { Category } from '@features/dashboard/services';
import { getCategoryFormFields } from '@features/dashboard/pages/categories/utils';
import { Auth } from '@features/auth/services';

@Component({
  selector: 'app-categories',
  imports: [Form, ListItems],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './categories.html'
})
export class Categories {
  categoriesForm!: FormGroup;
  categoriesFormInputFields!: IInputField[];


  readonly formErrorMessage = signal('');
  readonly listErrorMessage = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(Category);
  private authService = inject(Auth);

  ngOnInit() {
    this.initCategoriesForm();
    // this.categoryService.loadJson('/json/categories.json')

  }


  initCategoriesForm() {
    this.categoriesForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', []],
    });

    this.categoriesFormInputFields = getCategoryFormFields(this.categoriesForm)
    const itemToEdit = this.categoryService.getItemToEdit();
    if (itemToEdit) {
      this.categoriesForm.setValue(itemToEdit);
    }
  }

  get btnSubmitLabel() {
    return this.categoryService.isEditingNow() ? 'Actualizar categoría' : 'Agregar categoría';
  }


  addCategory() {
    console.log(this.categoriesForm.valid);
    if (this.categoriesForm.invalid) {
      console.log('invalid');
      this.categoriesForm.markAllAsTouched();
      this.formErrorMessage.set('Complete los campos requeridos');
      return;
    }

    const category = this.categoriesForm.value;

    if (this.categoryService.isEditingNow()) {
      this.categoryService.updateById(this.categoryService.getItemToEdit()?.id!, category);
      this.categoryService.cancelEdit();
      this.categoriesForm.reset();
      this.categoriesForm.markAsPristine();
      alert('Categoria actualizada');
    }
    else {
      if (this.categoryService.existsById(category.id)) {
        this.formErrorMessage.set('Ya existe una categoría con ese ID');
        return;
      }
      this.categoryService.add(category);
      alert('Categoria agregada');
    }


    this.formErrorMessage.set('');

  }

  removeCategory(item: ICategory) {
    this.categoryService.deleteById(item.id);
    alert('Categoria eliminada');
  }

  editCategory(item: ICategory) {

    this.categoriesForm.setValue(item);
    this.categoryService.startEdit(item);
    this.formErrorMessage.set('');
  }

  cancelEdit() {
    this.categoryService.cancelEdit();
    this.formErrorMessage.set('');
    this.categoriesForm.reset();
  }

  get isEditing() {
    return this.categoryService.isEditingNow();
  }

  get categories() {
    return this.categoryService.getAll();
  }

    get isAdmin() {
    return this.authService.isAdmin();
  }
}
