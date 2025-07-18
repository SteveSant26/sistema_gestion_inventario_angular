// Ejemplo de uso de la propiedad maxLength en IInputField

import { FormControl } from '@angular/forms';
import { IInputField } from '@shared/types';

// Ejemplo 1: Campo numérico con límite de caracteres
const quantityField: IInputField = {
    name: 'quantity',
    label: 'Cantidad',
    type: 'number',
    placeholder: 'Ingrese la cantidad',
    required: true,
    maxLength: 10, // Limita a 10 dígitos máximo
    control: new FormControl('')
};

// Ejemplo 2: Campo de texto con límite de caracteres
const nameField: IInputField = {
    name: 'name',
    label: 'Nombre del producto',
    type: 'text',
    placeholder: 'Ingrese el nombre',
    required: true,
    maxLength: 50, // Limita a 50 caracteres máximo
    control: new FormControl('')
};

// Ejemplo 3: Textarea con límite de caracteres
const descriptionField: IInputField = {
    name: 'description',
    label: 'Descripción',
    type: 'textarea',
    placeholder: 'Ingrese la descripción',
    required: false,
    maxLength: 500, // Limita a 500 caracteres máximo
    control: new FormControl('')
};

// Ejemplo 4: Campo sin límite de caracteres
const emailField: IInputField = {
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'ejemplo@correo.com',
    required: true,
    // Sin maxLength - no hay límite de caracteres
    control: new FormControl('')
};

/*
Notas importantes:
- La propiedad maxLength es opcional
- Se aplica tanto a inputs como a textareas
- Cuando está definida, muestra un contador de caracteres
- Especialmente útil para campos numéricos para evitar números excesivamente largos
- El contador se muestra en la esquina inferior derecha del campo
*/
