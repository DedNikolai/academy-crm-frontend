import { ITeacher } from "./teacher";


export interface IStudent {
    _id: string  
    fullName: string;
    phone: string;
    subjects: string[];
    teachers: ITeacher[];
    isActive: boolean,
    email?: string,
    gender: 'Чоловіча' | 'Жіноча' | ''
    actions?: null,
    birthday?: Date | null,
    parents?: string
}

export interface IFormStudent {
    _id?: string  
    fullName: string;
    phone: string;
    subjects: string[];
    teachers: string[];
    isActive: boolean,
    email?: string,
    gender: string
    actions?: null,
    birthday?: Date | null,
    parents?: string
}