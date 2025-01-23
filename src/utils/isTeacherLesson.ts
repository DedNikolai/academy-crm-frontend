import { ILessonFromServer } from '../types/lesson';
import { Colors } from '../types/colors';
import { teacherShedule } from '../constants/app';
import { IStudentTime } from '../types/studentTime';
import { Days } from '../types/days';
import { Subjects } from '../types/subjects';

export function isTeacherLesson(row: Date, cell: number, lessons: IStudentTime[]) {
    let result = {isLesson: false, color: '', teacher: '', student: '', duration: 0, subject: '', room: ''};
    lessons.filter(lesson => {
        const lessonTime = new Date(lesson.startTime).getHours()*60 + new Date(lesson.startTime).getMinutes();
        const rowTime = new Date(row).getHours()*60 + new Date(row).getMinutes();
        return rowTime === lessonTime;
    }).forEach(lesson => {
        const lesssonDay = Object.keys(Days).indexOf(lesson.day);
        if (lesssonDay === cell) {
            result.isLesson = true
            result.color = Colors[lesson.subject];
            result.student = lesson.student.fullName;
            result.duration = lesson.duration;
            result.subject = Subjects[lesson.subject as keyof typeof Subjects];
            result.room = lesson.room?.toString() || ''
        } 
    })

    return result;

}