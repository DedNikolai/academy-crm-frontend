import { shedule } from "../constants/app";
import { ILessonFromServer } from "../types/lesson";

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

export function cellsArray(row: Date, lessons: ILessonFromServer[]) {
    const rowTime = new Date(row).getHours()*60 + new Date(row).getMinutes();
    let arr = [];
    let length = shedule.daysPerWeek*shedule.roomsCount;
    if (rowTime > shedule.dayStartTime*60) {
        let prevTime = rowTime - shedule.timeInterval;
        lessons.filter(lesson => {
                const lessonTime = new Date(lesson.date).getHours()*60 + new Date(lesson.date).getMinutes();
                return prevTime === lessonTime;
            }).forEach(lesson => {
                if (lesson.durationMinutes === 60) {
                    length -= 1;
                } 
            })
    }
    
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr
}