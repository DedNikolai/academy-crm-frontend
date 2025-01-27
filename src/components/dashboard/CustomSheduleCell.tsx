import { FC } from "react";
import { Typography, TableCell } from "@mui/material";
import { isLesson } from "../../utils/isLesson";
import { ILessonFromServer } from "../../types/lesson";
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

type CustomCellTyle = {
    rowIndex: number,
    cellIndex: number,
    time: Date,
    lessons: ILessonFromServer[],
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 150,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

const CustomSheduleCell: FC<CustomCellTyle> = ({rowIndex, cellIndex, time, lessons}) => {
    const {color, borderTop, borderBottom, isText, student, isLessonTime, teacher, ticket} = isLesson(time, cellIndex, lessons);
    return (
        <HtmlTooltip
            title={
                isLessonTime ?
                <>
                    <Typography fontSize={12}>{`уч: ${student}`}</Typography>
                    <Typography fontSize={12}>{`вч: ${teacher}`}</Typography>
                </> 
                : ''
            }
    >
        <TableCell
            id={`${rowIndex*7 + cellIndex + 1}`}
            sx={{
                width: 30, 
                borderRight: 1, 
                bgcolor: color,
                cursor: isLessonTime ? 'pointer' : 'inherit',
                borderTop: borderTop,
                borderBottom: borderBottom,
            }} 
            align='center'
        >
            {
               isLessonTime ?
                    <NavLink to={`/dashboard/tickets/edit/${ticket}`}>
                        <Typography sx={{width: '30px', height: '30px', cursor: 'pointer'}} fontSize={10}>
                            
                        </Typography>
                    </NavLink>
                    : ''
            }
        </TableCell>
        </HtmlTooltip>
                                            
    )
}

export default CustomSheduleCell;