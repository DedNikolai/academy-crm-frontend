import { IStudent } from "./student";
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
    remainAmount: number,
    transferred: number
}

export interface IEditTicket {
    title: string,
    startDate: Date,
    endDate: Date,
    teacher: string,
    price: number,
    subject: string,
    generalAmount: number,
    remainAmount: number,
    transferred: number
}

