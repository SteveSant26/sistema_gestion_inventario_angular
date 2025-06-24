import { FormControl, FormGroup } from '@angular/forms';
import { IInputField } from '@shared/types';

export function getLocationFormFields(form: FormGroup): IInputField[] {
    return [
        {
            name: 'id',
            label: 'ID',
            type: 'text',
            placeholder: 'ID de la ubicación',
            required: true,
            control: form.get('id') as FormControl,
        },
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre de la ubicación',
            required: true,
            control: form.get('name') as FormControl,
        },
        {
            name: 'address',
            label: 'Dirección',
            type: 'textarea',
            placeholder: 'Dirección de la ubicación',
            required: true,
            control: form.get('address') as FormControl,
        },
        {
            name: 'floors_num',
            label: 'Número de pisos',
            type: 'number',
            placeholder: 'Número de pisos en la ubicación',
            required: true,
            control: form.get('floors_num') as FormControl,
        },
        {
            name: 'capacity',
            label: 'Capacidad',
            type: 'number',
            placeholder: 'Capacidad de la ubicación',
            required: true,
            control: form.get('capacity') as FormControl,
        }
    ];
}
