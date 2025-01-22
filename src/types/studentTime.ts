import { IStudent } from "./student";
import { ITeacher } from "./teacher";

export interface IStudentTime {
    _id?: string,
    day: string,
    startTime: Date,
    duration: number,
    room?: number
    teacher: ITeacher,
    student: IStudent,
    subject: string
}

export interface IStudentTimeForm {
    _id?: string,
    day: string,
    startTime: Date,
    duration: number,
    room?: number
    teacher: string,
    student: string,
    subject: string
}