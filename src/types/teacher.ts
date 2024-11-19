import { Days } from "./days"
import { Subjects } from "react-hook-form"

export interface ITeacher {
    _id?: string,
    fullName: string,
    phone: string,
    email: string,
    age: number,
    birthday?: Date,
    education?: string,
    worktimes?: IWorktime[],
    subjects: ISubjects[]
}

export interface IWorktime {
    day: Days,
    startTime: Date,
    endTime: Date,
    teacher: ITeacher
}

export interface ISubjects {
    id?: string,
    value: string
}