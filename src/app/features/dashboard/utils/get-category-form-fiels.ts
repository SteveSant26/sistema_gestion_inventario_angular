import { FormControl, FormGroup } from '@angular/forms';
import { IInputField } from '@shared/types';

export function getCategoryFormFields(form: FormGroup): IInputField[] {
    return [
        {
            name: 'id',
            label: 'ID',
            type: 'text',
            placeholder: 'ID de la categoría',
            required: true,
            control: form.get('id') as FormControl,
        },
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre de la categoría',
            required: true,
            control: form.get('name') as FormControl,
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            placeholder: 'Descripción de la categoría',
            required: false,
            control: form.get('description') as FormControl,
        },
    ];
}
