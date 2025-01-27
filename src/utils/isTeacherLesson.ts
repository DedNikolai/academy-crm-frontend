import { Colors } from '../types/colors';
import { IStudentTime } from '../types/studentTime';
import { Days } from '../types/days';
import { Subjects } from '../types/subjects';
import { IWorktime } from '../types/teacher';

export function isTeacherLesson(row: Date, cell: number, lessons: IStudentTime[], workTimes: IWorktime[]) {
    let result = {
        isLesson: false, 
        color: 'inherit', 
        teacher: '', 
        student: '', 
        duration: 0, 
        subject: '', 
        room: '',
        isWorkTime: false,
        borderTop: '1px solid black',
        borderBottom: '',
        isText: false
    };
    const rowTime = new Date(row).getHours()*60 + new Date(row).getMinutes();

    workTimes.filter(workTime => {
        
        const startTime = new Date(workTime.startTime).getHours()*60 + new Date(workTime.startTime).getMinutes();
        const endTime = new Date(workTime.endTime).getHours()*60 + new Date(workTime.endTime).getMinutes();
        return rowTime >= startTime && rowTime <= endTime;
    }).forEach(worktime => {
        const weekDays = Object.keys(Days);
        weekDays.shift();
        weekDays.push(Days.SUNDAY);
        const woktimeDay = weekDays.indexOf(worktime.day);

        if (woktimeDay === cell) {
            result.isWorkTime = true;
            result.color = '#eeeeee'
        }
    })

    lessons.filter(lesson => {
        const lessonStart = new Date(lesson.startTime).getHours()*60 + new Date(lesson.startTime).getMinutes();
        const lessonEnd = lessonStart + lesson.duration;
        return rowTime + 1 > lessonStart && rowTime < lessonEnd - 1;

    }).forEach(lesson => {
        const weekDays = Object.keys(Days);
        weekDays.shift();
        weekDays.push(Days.SUNDAY)
        const lesssonDay = weekDays.indexOf(lesson.day);

        if (lesssonDay === cell) {
            result.isLesson = true
            result.color = Colors[lesson.subject];
            result.student = lesson.student.fullName;
            result.duration = lesson.duration;
            result.subject = Subjects[lesson.subject as keyof typeof Subjects];
            result.room = lesson.room?.toString() || '';
            
            const lessonStart = new Date(lesson.startTime).getHours()*60 + new Date(lesson.startTime).getMinutes();
            const lessonEnd = lessonStart + lesson.duration;

            if (rowTime === lessonStart && lesson.duration === 60) {
                result.isText = true
                result.borderBottom = 'none'
            }

            if (rowTime === lessonStart && lesson.duration === 30) {
                result.isText = true
            }

            if (rowTime === lessonEnd - 30 && lesson.duration === 60) {
                result.borderTop = 'none'
                
            }
        } 
    })

    return result;

}