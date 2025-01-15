import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import columns from './columns/columns';
import useGetTickets from '../../../api/query/ticket/useGetTickets';
import { ITicket } from '../../../types/ticket';
import useDeleteTicket from '../../../api/query/ticket/useDeleteTicket';
import { Status } from '../../../types/lesson-status';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';

export default function Tickets() {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {data = {docs: []}, isLoading} = useGetTickets(page, rowsPerPage)  
  const mutation = useDeleteTicket()
  const {mutate, isPending} = mutation;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteItem = (id: string) => {
    const isAccept: boolean = window.confirm("Видалити Абонемент?");
      if(isAccept && id) {
        mutate(id);
        setPage(0);
      }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid2 container spacing={3} sx={{padding: '20px'}} alignItems='center'>
        <Grid2 size={4} sx={{}}><h2>Абонементи</h2></Grid2>
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
              .map((row: ITicket & {actions: null}) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'actions') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <NavLink to={`/dashboard/tickets/edit/${row._id}`}>
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
                      if (column.id === 'isPaid') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                              {row.isPaid ? 
                                <CheckIcon sx={{color: theme.status.success}}/> 
                                : 
                                <ClearIcon sx={{color: theme.status.error}}/>}
                            </TableCell>
                        )
                      }
                      if (column.id === 'usedAmount') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                              {row.lessons?.filter(lesson => lesson.status === Status.SUCCESS).length}
                            </TableCell>
                        )
                      }
                      if (column.id === 'transferred') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                              {row.lessons?.filter(lesson => lesson.status === Status.TRANSFERED).length}
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
        {/* <Grid2 sx={{padding: '20px', textAlign: 'right'}}>
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
        </Grid2> */}
    </Paper>
  );
}
