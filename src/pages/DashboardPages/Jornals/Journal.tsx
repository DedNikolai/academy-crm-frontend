import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import columns from './columns/columns';
import useGetLessons from '../../../api/query/lesson/useGetLessons';
import dayjs, {Dayjs} from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ILessonFromServer } from '../../../types/lesson';
import LessonItem from './LessonItem';
import { pagination } from '../../../constants/app';

export default function Journal() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pagination.rowsPerPage);
  const [date, setDate] = React.useState<Dayjs | null>(dayjs().startOf('day'))
  const {data = {docs: []}, isLoading} = useGetLessons(page, rowsPerPage, date)  

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
        <Grid2 size={4} sx={{}}><Typography>{`Журнал занять на ${dayjs(date).format('DD-MM-YYYY')}`}</Typography></Grid2>
         <Grid2 size={8} sx={{display: 'flex', justifyContent: 'right'}}>
            <LocalizationProvider 
                dateAdapter={AdapterDayjs} 
                adapterLocale='uk'
            >
                <DatePicker
                    value={dayjs(date)}
                    onChange={(value) => setDate(value)}
                    slotProps={{ 
                            textField: { 
                            size: 'small',
                            } 
                        }}
                />
            </LocalizationProvider>
         </Grid2>
      </Grid2>  
      {
        isLoading ? <Box sx={{textAlign: 'center', margin: '20px 0'}}><CircularProgress /></Box> :
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
              .map((row: ILessonFromServer) => {
                return (
                 <LessonItem  lesson={row} key={row._id}/>
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
    </Paper>
  );
}
