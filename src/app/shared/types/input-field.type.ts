import { FormControl } from "@angular/forms";

export interface IInputField {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "checkbox" | "textarea"
    placeholder?: string
    autocomplete?: "given-name" | "family-name" | "username" | "email" | "current-password" | "new-password"
    required: boolean
    control: FormControl
}  

