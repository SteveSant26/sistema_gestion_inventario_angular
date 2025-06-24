import {IUser} from "../interfaces";

export function userAdapter(response: any): IUser {
    return {
        name: response.name,
        email: response.email,
        password: response.password,
        role: response.role,
    };
}