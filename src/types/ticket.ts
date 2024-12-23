import { ILesson } from "./lesson";
import { IStudent } from "./student";
import { Subjects } from "./subjects";
import { ITeacher } from "./teacher";

export interface IFormDataTicket {
    title: string,
    startDate: Date,
    endDate: Date,
    teacher: string,
    price: number,
    subject: string,
    generalAmount: number,
}

export interface ITicket {
    _id?: string,
    title: string,
    startDate: Date,
    endDate: Date,
    student: string,
    teacher: string,
    price: number,
    subject: string,
    generalAmount: number,
    usedAmount?: number,
    transferred?: number,
    lessons?: ILesson[]
}

export interface IEditTicket {
    _id?: string,
    title: string,
    startDate: Date,
    endDate: Date,
    teacher: string,
    price: number,
    subject: string,
    generalAmount: number,
    student?: string,
    lessons?: ILesson[]
}

export interface ITicketFromServer {
    _id: string,
    title: string,
    startDate: Date,
    endDate: Date,
    student: IStudent,
    teacher: ITeacher,
    price: number,
    subject: Subjects,
    generalAmount: number,
    lessons: ILesson[],    
}
