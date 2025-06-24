import {IUser} from "../interfaces";
import { userAdapter } from "./user.adapter";

export function usersAdapter(response: any): IUser[] {
    if (!Array.isArray(response)) {
        console.warn('[usersAdapter] No es un arreglo', response);
        return [];
    }
    return response.map(userAdapter);
}