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
import LessonItem from './ExpenseItem';
import { ISalary } from '../../../types/salary';
import {NavLink} from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { pagination } from '../../../constants/app';
import useGetExpenses from '../../../api/query/expense/useGetExpenses';
import { IExpense } from '../../../types/expense';

export default function Expenses() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pagination.rowsPerPage);
  const {data = {docs: []}, isLoading} = useGetExpenses(page, rowsPerPage)  
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
        <Grid2 size={4} sx={{}}><Typography>Витрати</Typography></Grid2>
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
              .map((row: IExpense) => {
                return (
                 <LessonItem  salary={row} setPage={setPage} key={row._id}/>
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
            <NavLink to='/dashboard/expense/create'>
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
