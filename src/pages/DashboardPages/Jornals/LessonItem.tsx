import { FC, useState } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {NavLink} from "react-router-dom";
import columns from './columns/columns';
import { ILesson, ILessonFromServer } from '../../../types/lesson';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { Status } from "../../../types/lesson-status";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import useUpdateLessonStatus from "../../../api/query/lesson/useUpdateLessonStatus";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ILessonItemType {
    lesson: ILessonFromServer
}

export const LessonItem: FC<ILessonItemType> = ({lesson}) => {
    const theme = useTheme();
    const [status, setStatus] = useState<string>(lesson.status)
    const mutation = useUpdateLessonStatus(setStatus);
    const {mutate} = mutation;

    const onChange = (e: SelectChangeEvent) => {
        const updatedLesson: ILesson = {
            ...lesson,
            status: e.target.value as Status,
            student: lesson.student._id,
            ticket: lesson.ticket._id
        }
        mutate(updatedLesson);
    }

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            {columns.map((column) => {
                const value = lesson[column.id];
                if (column.id === 'actions') {
                    return (
                        <TableCell key={column.id} align={column.align}>
                            <NavLink to={`/dashboard/tickets/edit/${lesson.ticket._id}`}>
                                <IconButton aria-label="edit">
                                    <BookOnlineIcon />
                                </IconButton>
                            </NavLink>
                        </TableCell>
                    )
                }
                if (column.id === 'status') {
                    return (
                        <TableCell key={column.id} align={column.align}>
                            <Select
                                id="status"
                                value={status}
                                onChange={onChange}
                                renderValue={(selected) => selected}
                                MenuProps={MenuProps}
                                size="small"
                                sx={{minWidth: 100}}
                            >
                                {Object.values(Status).map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={name === status} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                                <MenuItem value={''}>Очистити</MenuItem>                    
                             </Select>
                        </TableCell>
                    )
                }     
                return (
                    <TableCell key={column.id} align={column.align}>
                    {column.format ? column.format(value) : value}
                    </TableCell>
                );
                })}
        </TableRow>
    )
}

export default LessonItem;