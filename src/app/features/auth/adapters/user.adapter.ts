import {User} from "../interfaces";

export function userAdapter(response: any): User {
    return {
        email: response.email,
        name: response?.name,
        password: response.password,
        role: response.role,
    };
}