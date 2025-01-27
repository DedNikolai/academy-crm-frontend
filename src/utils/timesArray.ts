import { shedule, teacherShedule } from "../constants/app";
import { ILessonFromServer } from "../types/lesson";
import { IStudentTime } from "../types/studentTime";

export function timesArray() {
    let array = [];
    const date = new Date();
    date.setHours(shedule.dayStartTime, 0, 0, 0);

    while (date.getHours() < shedule.dayEndTime) {
        const temp = new Date(date)
        array.push(temp);
        date.setMinutes(date.getMinutes() + shedule.timeInterval)
    }
    return array;
}

export function cellsArray() {
    let arr = [];
    let length = shedule.daysPerWeek*shedule.roomsCount;
    
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr
}

export function teacherCellsArray() {
    let arr = [];
    let length = teacherShedule.daysPerWeek*teacherShedule.roomsCount;
    
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr
}