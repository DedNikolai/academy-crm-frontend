import { Days } from "./days"
import dayjs, { Dayjs } from 'dayjs';

export interface ITeacher {
    _id?: string,
    fullName: string,
    phone: string,
    email: string,
    age?: number | null,
    birthday?: Date | null,
    education?: string,
    worktimes?: IWorktime[],
    subjects: string[],
    isActive: boolean,
    balance?: number
}

export interface IWorktime {
    _id?: string,
    day: string,
    startTime: Date,
    endTime: Date,
    teacher?: ITeacher
}

export interface ISubjects {
    id?: string,
    value: string
}

export interface IWorktimeItem {
    _id?: string,
    day: string,
    startTime: Date,
    endTime: Date,
    teacher: string
}