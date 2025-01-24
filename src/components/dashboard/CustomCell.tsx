import { FC } from "react";
import { Typography, TableCell } from "@mui/material";
import { isTeacherLesson } from "../../utils/isTeacherLesson";
import { IStudentTime } from "../../types/studentTime";
import { IWorktime } from "../../types/teacher";

type CustomCellTyle = {
    rowIndex: number,
    cellIndex: number,
    time: Date,
    lessons: IStudentTime[],
    workTimes?: IWorktime[],
    key: number
}

const CustomCell: FC<CustomCellTyle> = ({rowIndex, cellIndex, time, lessons, workTimes, key}) => {
    const {color, borderTop, borderBottom, isText, student, room} = isTeacherLesson(time, cellIndex, lessons, workTimes || []);
    return (
        <TableCell
            id={`${rowIndex*7 + cellIndex + 1}`}
            sx={{
                width: 100, 
                borderRight: 1, 
                bgcolor: color,
                borderTop: borderTop,
                borderBottom: borderBottom,
            }} 
            align='center'
            key={time.toString() + key}                                                              
        >
            {
                isText ?
                    <Typography fontSize={14} sx={{cursor: 'pointer'}}>
                        {student  + ' / ' + room}
                    </Typography>
                    : ''
            }
        </TableCell>
                                            
    )
}

export default CustomCell