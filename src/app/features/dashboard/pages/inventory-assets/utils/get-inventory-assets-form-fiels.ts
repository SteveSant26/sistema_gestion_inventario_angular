import { FormControl, FormGroup } from '@angular/forms';
import { IInputField } from '@shared/types';

import { Category, Location, User } from '@features/dashboard/services';
import { ICategory, ILocation } from '@features/dashboard/interfaces';
import { IUser } from '@features/auth/interfaces';
import { InventoryAssetStates } from '@features/dashboard/enums/inventory-asset-states';



export function getInventoryAssetsFormFields(form: FormGroup, categoryService: Category, locationsService: Location, userService: User): IInputField[] {
    const statesOptions = Object.values(InventoryAssetStates).map(state => ({
        value: state,
        label: (state.charAt(0).toUpperCase() + state.slice(1)).replace('_', ' ')
    }));




    return [
        {
            name: 'id',
            label: 'ID del activo',
            type: 'text',
            placeholder: 'ID del activo',
            required: true,
            maxLength: 20, // Límite máximo de 20 caracteres para ID
            control: form.get('id') as FormControl,
        },
        {
            name: 'name',
            label: 'Nombre del activo',
            type: 'text',
            placeholder: 'Nombre del activo',
            required: true,
            control: form.get('name') as FormControl,
        },
        {
            name: 'description',
            label: 'Descripción del activo',
            type: 'textarea',
            placeholder: 'Descripción del activo',
            required: false,
            maxLength: 500, // Límite máximo de 500 caracteres para descripción
            control: form.get('description') as FormControl,
        },
        {
            name: 'categoryId',
            label: 'Categoría del activo',
            type: 'select',
            placeholder: 'Seleccione una categoría',
            required: true,
            control: form.get('categoryId') as FormControl,
            options: categoryService.getAll().map((category: ICategory) => ({
                value: category.id,
                label: category.name
            })),
        },
        {
            name: 'locationId',
            label: 'Ubicación del activo',
            type: 'select',
            placeholder: 'Seleccione una ubicación',
            required: true,
            control: form.get('locationId') as FormControl,
            options: locationsService.getAll().map((location: ILocation) => ({
                value: location.id,
                label: location.name
            })),
        },
        {
            name: 'personInChargeEmail',
            label: 'Asignado a usuario',
            type: 'select',
            placeholder: 'Seleccione un usuario',
            required: false,
            control: form.get('personInChargeEmail') as FormControl,
            options: userService.getAll().map((user: IUser) => ({
                value: user.email,
                label: user.name || user.email
            })),
        },
        {
            name: 'status',
            label: 'Estado del activo',
            type: 'select',
            placeholder: 'Seleccione un estado',
            required: true,
            control: form.get('status') as FormControl,
            options: statesOptions,
        },
        {
            name: 'arrivalDate',
            label: 'Fecha de llegada',
            type: 'date',
            placeholder: 'Fecha de llegada',
            required: true,
            control: form.get('arrivalDate') as FormControl,
        },
        {
            name: 'quantity',
            label: 'Cantidad',
            type: 'number',
            placeholder: 'Cantidad del activo',
            required: true,
            maxLength: 10, // Límite máximo de 10 dígitos para cantidad
            control: form.get('quantity') as FormControl,
        }
    ];
}
