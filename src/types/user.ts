import { Roles } from "./roles";

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    roles: Roles[];
}

export interface IAuth {
    email: string;
    password: string;
}