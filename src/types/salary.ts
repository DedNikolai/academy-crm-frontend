import { ITeacher } from "./teacher";

export interface ISalary {
    _id?: string;
    payaccount: string,
    value: number,
    teacher: ITeacher,
    actions?: null,
    timestamp?: string
}

export interface IFormDataSalary {
    _id?: string;
    payaccount: string,
    value: number,
    teacher: string,
    actions?: null,
    timestamp?: string,
    teacherBalance?: number 
}