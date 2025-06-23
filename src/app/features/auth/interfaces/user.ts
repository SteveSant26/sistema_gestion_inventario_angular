import {RolesEnum}  from "../config";

export interface User {
    email: string;
    name: string;
    password: string;
    role: RolesEnum;
}

