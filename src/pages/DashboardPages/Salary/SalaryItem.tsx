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
import Checkbox, {} from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import useUpdateLessonStatus from "../../../api/query/lesson/useUpdateLessonStatus";
import dayjs from 'dayjs';
import MenuProps from "../../../utils/MenuProps";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { ISalary } from "../../../types/salary";
import DeleteIcon from '@mui/icons-material/Delete';

export const SalaryItem: FC<{salary: ISalary}> = ({salary}) => {
    const theme = useTheme();

    // const mutation = useUpdateLessonStatus(setStatus, setPayout);
    // const {mutate} = mutation;
    const deleteItem = (id: string) => {
        // const isAccept: boolean = window.confirm("Видалити Вчителя?");
        //   if(isAccept && id) {
        //     mutate(id);
        //     setPage(0);
        //   }
      }

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            {columns.map((column) => {
                const value = salary[column.id];   
                if (column.id === 'actions') {
                    return (
                        <TableCell key={column.id} align={column.align}>
                            <IconButton aria-label="delete" onClick={() => deleteItem(salary._id || '')}>
                                <DeleteIcon />
                            </IconButton>
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

export default SalaryItem;