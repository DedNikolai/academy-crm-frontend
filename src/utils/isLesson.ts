import { ILessonFromServer } from '../types/lesson';
import { Colors } from '../types/colors';
import { shedule } from '../constants/app';

export function isLesson(row: Date, cell: number, lessons: ILessonFromServer[]) {
    let result = {
        isLessonTime: false, 
        color: '', 
        teacher: '', 
        student: '', 
        duration: 0, 
        ticket: '',
        borderTop: '1px solid black',
        borderBottom: '',
        isText: false
    };
    const rowTime = new Date(row).getHours()*60 + new Date(row).getMinutes();
    
    lessons.filter(lesson => {
        const lessonStart = new Date(lesson.date).getHours()*60 + new Date(lesson.date).getMinutes();
        const lessonEnd = lessonStart + lesson.durationMinutes;
        return rowTime + 1 > lessonStart && rowTime < lessonEnd - 1;
    }).forEach(lesson => {
        const lesssonDay = new Date(lesson.date).getDay() - 1;
        if (lesssonDay*shedule.roomsCount + lesson.room - 1 === cell) {
            result.isLessonTime = true
            result.color = Colors[lesson.subject];
            result.teacher = lesson.teacher.fullName;
            result.student = lesson.student.fullName;
            result.duration = lesson.durationMinutes;
            result.ticket = lesson.ticket._id;

            const lessonStart = new Date(lesson.date).getHours()*60 + new Date(lesson.date).getMinutes();
            const lessonEnd = lessonStart + lesson.durationMinutes;

            if (rowTime === lessonStart && lesson.durationMinutes === 60) {
                result.isText = true
                result.borderBottom = 'none'
            }

            if (rowTime === lessonStart && lesson.durationMinutes === 30) {
                result.isText = true
            }

            if (rowTime === lessonEnd - 30 && lesson.durationMinutes === 60) {
                result.borderTop = 'none'
                
            }
        } 
    })

    return result;

}