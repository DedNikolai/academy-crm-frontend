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
// import columns from './columns/columns';
import useGetLessons from '../../../api/query/lesson/useGetLessons';
import dayjs, {Dayjs} from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ILessonFromServer } from '../../../types/lesson';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData)
// import LessonItem from './LessonItem';
function selectWeek(date: Dayjs | null) {
    return Array(7).fill(date?.toDate()).map((el, idx) =>
      new Date(el.setDate(el.getDate() - el.getDay() + idx + 1)))
}

function timesArray() {
    let array = [];
    const date = new Date();
    date.setHours(9, 0, 0, 0);

    while (date.getHours() < 22) {
        const temp = new Date(date)
        array.push(temp);
        date.setMinutes(date.getMinutes() + 30)
    }
    return array;
}

function emptyArray() {
    let arr = [];
    for (let i = 0; i < 28; i++) {
        arr.push(i);
    }

    return arr
}

export default function Journal() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [date, setDate] = React.useState<Dayjs | null>(dayjs().startOf('day'));
  const weekDays = selectWeek(date);
  const times = timesArray();
//   const {data = {docs: []}, isLoading} = useGetLessons(page, rowsPerPage, date)  

//   const isPending = false;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <Grid2 container spacing={3} sx={{padding: '20px'}} alignItems='center'>
        <Grid2 size={4} sx={{}}>
            <Typography>
                {`Розклад на 
                    ${dayjs(weekDays[0]).format('DD.MM.YYYY')} - ${dayjs(weekDays[6]).format('DD.MM.YYYY')}
                `}
            </Typography>
        </Grid2>
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
        // isLoading || isPending ? <Box sx={{textAlign: 'center', margin: '20px 0'}}><CircularProgress /></Box> :
      <>  
      <TableContainer sx={{height: '100vh'}}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
                <TableCell sx={{width: 40, borderRight: 1, borderTop: 1}} />
                {
                    weekDays.map(item => <TableCell 
                                            sx={{width: 120, borderRight: 1, borderTop: 1}}
                                            colSpan={4} 
                                            align='center'
                                            key={item.toString()}>
                                                {dayjs(item).format('DD.MM.YYYY')}
                                          </TableCell>)
                }
            </TableRow> 
            <TableRow>
                <TableCell sx={{borderRight: 1}} style={{ top: 38}}/>
                {
                    weekDays.map((item, index) => {
                        return (
                            <React.Fragment key={item.toString() + index}>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>1</TableCell>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>2</TableCell>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>3</TableCell>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>4</TableCell>
                            </React.Fragment>
                        )
                    })
                }
            </TableRow>
          </TableHead>
          <TableBody>
                {
                    times.map(item => {
                        return (
                            <TableRow key={item.toString()}>
                                <TableCell sx={{borderRight: 1, borderTop: 1}}>{dayjs(item).format('HH:mm')}</TableCell>
                                {
                                    emptyArray().map(num => <TableCell 
                                                                sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'
                                                                key={item.toString() + num}
                                                             />)
                                }
                            </TableRow>
                        )
                    })
                }
          </TableBody>
        </Table>
      </TableContainer>
      </>
     }
    </Paper>
  );
}

