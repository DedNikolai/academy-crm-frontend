import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, Grid2, Typography, Button } from "@mui/material";
import columns from './columns/columns';
import useGetLessons from '../../../api/query/lesson/useGetLessons';
import { ILessonFromServer } from '../../../types/lesson';
import LessonItem from './SalaryItem';
import useGetSalaries from '../../../api/query/salary/useGetLessons copy';
import { ISalary } from '../../../types/salary';
import {NavLink} from "react-router-dom";
import { useTheme } from '@mui/material/styles';

export default function Salaries() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {data = {docs: []}, isLoading} = useGetSalaries(page, rowsPerPage)  
  const theme = useTheme();
  const isPending = false;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid2 container spacing={3} sx={{padding: '20px'}} alignItems='center'>
        <Grid2 size={4} sx={{}}><Typography>Виплати зарплати</Typography></Grid2>
         <Grid2 size={8} sx={{display: 'flex', justifyContent: 'right'}}>
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
              .map((row: ISalary) => {
                return (
                 <LessonItem  salary={row} key={row._id}/>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
            <NavLink to='/dashboard/salary/create'>
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
