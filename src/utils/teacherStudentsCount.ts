import { IFormStudent } from "../types/student";
import { ITeacher } from "../types/teacher";

export function teacherStudentsCount(teachers: ITeacher[], students: IFormStudent[]) {

    return teachers.map((teacher: ITeacher) => {
        let count = 0;
        students.forEach((student: IFormStudent) => {
            if (teacher._id && student.teachers.includes(teacher._id)) {
                count++
            }
        })

        return count;
    })
}