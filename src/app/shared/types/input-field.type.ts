interface IInputField {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "checkbox"
    placeholder?: string
    autocomplete?: "given-name" | "family-name" | "username" | "email" | "current-password" | "new-password"
    required: boolean
}  

export default IInputField;