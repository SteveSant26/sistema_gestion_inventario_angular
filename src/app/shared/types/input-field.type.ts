import { FormControl } from "@angular/forms";

export interface IInputField {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "checkbox" | "textarea" | "number" | "date" | "select" | "radio" | "file"
    options?: { value: string; label: string }[] 
    placeholder?: string
    autocomplete?: "given-name" | "family-name" | "username" | "email" | "current-password" | "new-password"
    required: boolean
    control: FormControl
}

