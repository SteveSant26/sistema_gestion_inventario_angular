import { RolesEnum } from "../config";

export interface IUser {
    name: string;
    email: string;
    password?: string;
    role: RolesEnum;
}

