import { ILessonFromServer } from '../types/lesson';
import { Colors } from '../types/colors';

export function isLesson(row: Date, cell: number, lessons: ILessonFromServer[]) {
    let result = {isLesson: false, color: '', teacher: '', student: ''};
    lessons.filter(lesson => {
        const lessonTime = new Date(lesson.date).getHours()*60 + new Date(lesson.date).getMinutes();
        const rowTime = new Date(row).getHours()*60 + new Date(row).getMinutes();
        return rowTime === lessonTime;
    }).forEach(lesson => {
        const lesssonDay = new Date(lesson.date).getDay() - 1;
        if (lesssonDay*4 + lesson.room - 1 === cell) {
            result.isLesson = true
            result.color = Colors[lesson.subject];
            result.teacher = lesson.teacher.fullName;
            result.student = lesson.student.fullName;
        } 
    })

    return result;

}