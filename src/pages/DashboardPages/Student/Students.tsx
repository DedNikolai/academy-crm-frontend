import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";
import { Box, Button, CircularProgress, Grid2 } from "@mui/material";
import useGetStudents from '../../../api/query/student/useGetStudents';
import { IStudent } from '../../../types/student';
import columns from './columns/columns';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useDeleteStudent from '../../../api/query/student/useDeleteStudent';
import CancelIcon from '@mui/icons-material/Cancel';
import { pagination } from '../../../constants/app';

export default function Students() {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pagination.rowsPerPage);
  const [params, setParams] = React.useState<string>('')
  const {data = {docs: []}, isLoading} = useGetStudents(page, rowsPerPage, params)  
  const mutation = useDeleteStudent()
  const {mutate, isPending} = mutation;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(e.target.value)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteItem = (id: string) => {
    const isAccept: boolean = window.confirm("Видалити Вчителя?");
      if(isAccept && id) {
        mutate(id);
        setPage(0);
      }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid2 container spacing={3} sx={{padding: '20px'}} alignItems='center'>
        <Grid2 size={4} sx={{}}><h2>Учні</h2></Grid2>
         <Grid2 size={8} sx={{display: 'flex', justifyContent: 'right'}}>
            <OutlinedInput
                placeholder='Пошук'
                sx={{width: 300}}
                size='small'
                type={'text'}
                value={params}
                onChange={onChangeParams}
                endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {}}
                                >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
            />
            <IconButton onClick={() => setParams('')}>
                <HighlightOffIcon sx={{color: theme.status.error}}/>
            </IconButton>
         </Grid2>
      </Grid2>  
      {
        isLoading || isPending ? <Box sx={{textAlign: 'center', margin: '20px 0'}}><CircularProgress /></Box> :
      <>  
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {data.docs
              .map((row: IStudent) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'isActive') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                              {
                                row.isActive ? <CheckBoxIcon sx={{color: theme.status.success}} />
                                : <CancelIcon sx={{color: theme.status.error}} />
                              }      
                            </TableCell>
                        )
                      }
                      if (column.id === 'actions') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <NavLink to={`/dashboard/students/edit/${row._id}`}>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </NavLink>
                                <IconButton aria-label="delete" onClick={() => deleteItem(row._id || '')}>
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={pagination.items}
        component="div"
        count={data.totalDocs}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </>
     }
        <Grid2 sx={{padding: '20px', textAlign: 'right'}}>
            <NavLink to='/dashboard/students/create'>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{bgcolor: theme.status.success, width: theme.button.width}}
                >
                    Додати
                </Button>
            </NavLink>
        </Grid2>
    </Paper>
  );
}
