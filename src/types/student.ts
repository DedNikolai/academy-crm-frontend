import { ITeacher } from "./teacher";


export interface IStudent {
    _id?: string  
    fullName: string;
    phone: string;
    subjects: string[];
    teachers: ITeacher[];
    isActive: boolean,
    email?: string,
    gender: 'Чоловіча' | 'Жіноча'
    actions?: null
}