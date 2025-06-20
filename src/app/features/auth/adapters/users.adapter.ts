import User from "../models/user";
import { userAdapter } from "./user.adapter";

export function usersAdapter(response: any): User[] {
    if (!Array.isArray(response)) {
        console.warn('[usersAdapter] No es un arreglo', response);
        return [];
    }
    return response.map(userAdapter);
}