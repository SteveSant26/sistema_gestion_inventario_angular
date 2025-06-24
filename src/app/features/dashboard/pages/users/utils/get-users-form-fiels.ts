import { FormControl, FormGroup } from '@angular/forms';
import { IInputField } from '@shared/types';

import { RolesEnum } from '@features/auth/config';


export function getUserFormFields(form: FormGroup): IInputField[] {
    const rolesOptions = Object.values(RolesEnum).map(role => ({
        value: role,
        label: role.charAt(0).toUpperCase() + role.slice(1) 
    }));
    return [
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del usuario',
            required: true,
            control: form.get('name') as FormControl,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Email del usuario',
            required: true,
            control: form.get('email') as FormControl,
        },
        {
            name: 'password',
            label: 'Contraseña',
            type: 'password',
            placeholder: 'Contraseña del usuario',
            required: true,
            control: form.get('password') as FormControl,
        },
        {
            name: 'role',
            label: 'Rol',
            type: 'select',
            options: rolesOptions,
            placeholder: 'Rol del usuario',
            required: true,
            control: form.get('role') as FormControl,
        },
    ];
}
