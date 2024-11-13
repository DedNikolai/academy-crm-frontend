import { Roles } from "./roles";

export interface IUser {
    _id?: string;
    fullName: string;
    email: string;
    roles: Roles[];
    verified?: boolean
}

export interface IAuth {
    email: string;
    password: string;
}

export interface IUserProfile {
    fullName: string;
    email: string;
}