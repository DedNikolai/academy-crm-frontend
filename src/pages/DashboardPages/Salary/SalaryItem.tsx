import { FC, useState } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import columns from './columns/columns';
import { ISalary } from "../../../types/salary";
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteSalary from '../../../api/query/salary/useDeleteSalary'

export const SalaryItem: FC<{salary: ISalary, setPage: Function}> = ({salary, setPage}) => {
    const theme = useTheme();

    const mutation = useDeleteSalary()
    const {mutate} = mutation;
    const deleteItem = (id: string) => {
        const isAccept: boolean = window.confirm("Видалити Заарпоату?");
          if(isAccept && id) {
            mutate(id);
            setPage(0);
          }
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