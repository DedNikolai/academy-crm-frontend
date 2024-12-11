import { Days } from "./days";
import { IStudent } from "./student";
import { ITeacher } from "./teacher";
import { ITicket } from "./ticket";
import { Status } from "./lesson-status";
import { Subjects } from "./subjects";

export interface ILesson {
    _id?: string,
    day: Days,
    date: Date,
    durationMinutes: number,
    room: number,
    teacher: ITeacher | string,
    student: IStudent | string,
    subject: Subjects,
    ticket: ITicket | string,
    status?: Status | '',
    time: Date
}

export interface IFormDataLesson {
    day: Days,
    date: Date,
    durationMinutes: number,
    room: number,
    status?: Status | '',
    time: Date
}