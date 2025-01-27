import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid2, Typography, Box, CircularProgress } from "@mui/material";
import dayjs, {Dayjs} from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import localeData from 'dayjs/plugin/localeData';
import useGetWeekLessons from '../../../api/query/lesson/useGetWeekLessons';
import { selectWeek } from '../../../utils/selectWeek';
import { timesArray, cellsArray} from '../../../utils/timesArray';
import { isLesson } from '../../../utils/isLesson';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { NavLink } from 'react-router-dom';
import { Subjects } from '../../../types/subjects';
import { Rooms } from '../../../constants/app';
import CustomSheduleCell from '../../../components/dashboard/CustomSheduleCell';


dayjs.extend(localeData)

export default function Shedule() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs().startOf('day'));
  const weekDays = selectWeek(date);
  const times = timesArray();
  const {data = {docs: []}, isLoading} = useGetWeekLessons(date);

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
         <Grid2 size={2} display='flex'>{`${Subjects.VOCAL} - `}<Brightness1Icon sx={{color: '#00e5ff'}}/></Grid2>
         <Grid2 size={2} display='flex'>{`${Subjects.PIANO} - `}<Brightness1Icon sx={{color: '#ffef62'}}/></Grid2>
         <Grid2 size={2} display='flex'>{`${Subjects.GUITAR} - `}<Brightness1Icon sx={{color: '#ffa733'}}/></Grid2>
         <Grid2 size={2} display='flex'>{`${Subjects.DRUMS} - `}<Brightness1Icon sx={{color: '#91ff35'}}/></Grid2>
      </Grid2>  
      {
        isLoading ? <Box sx={{textAlign: 'center', margin: '20px 0'}}><CircularProgress /></Box> :
      <>  
      <TableContainer sx={{height: '100vh', width: '100%'}} className='shedule'>
        <Table stickyHeader aria-label="sticky table" size="small" >
          <TableHead>
            <TableRow>
                <TableCell 
                    sx={{width: 40, borderRight: 1, borderTop: 1}}
                    style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }} 
                />
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
                <TableCell 
                    sx={{borderRight: 1}} 
                    style={{ top: 38, position: 'sticky', left: 0, backgroundColor: '#fff' }}
                />
                {
                    weekDays.map((item, index) => {
                        return (
                            <React.Fragment key={item.toString() + index}>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>{Rooms.ROOM1}</TableCell>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>{Rooms.ROOM2}</TableCell>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>{Rooms.ROOM3}</TableCell>
                                <TableCell style={{ top: 38}} sx={{width: 30, borderRight: 1, borderTop: 1}} align='center'>{Rooms.ROOM4}</TableCell>
                            </React.Fragment>
                        )
                    })
                }
            </TableRow>
          </TableHead>
          <TableBody>
                {
                    times.map((item, rowIndex) => {
                        return (
                            <TableRow key={item.toString()}>
                                <TableCell
                                    id={`${rowIndex*28}`} 
                                    sx={{borderRight: 1, borderTop: 1}}
                                    style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }} 
                                >
                                    {dayjs(item).format('HH:mm')}
                                </TableCell>
                                {
                                    cellsArray().map((num, cellIndex) => {
                                        return (
                                            <CustomSheduleCell
                                                rowIndex={rowIndex}
                                                cellIndex={cellIndex}
                                                time={item}
                                                lessons={data} 
                                                key={item.toString() + num}
                                            />
                                            // <TableCell
                                            //     id={`${rowIndex*28 + cellIndex + 1}`}
                                            //     sx={{
                                            //         width: 30, 
                                            //         borderRight: 1, 
                                            //         cursor: isLesson(item, cellIndex, data).isLessonTime ? 'pointer' : 'inherit',
                                            //         bgcolor: isLesson(item, cellIndex, data).isLessonTime ? isLesson(item, cellIndex, data).color : 'inherit',
                                            //         borderTop: isLesson(item, cellIndex, data).borderTop,
                                            //         borderBottom: isLesson(item, cellIndex, data).borderBottom,
                                                    
                                            //         }} 
                                            //     align='center'
                                            //     key={item.toString() + num}                                                              
                                            // >
                                            //     {
                                            //         isLesson(item, cellIndex, data).isText ?
                                            //         <NavLink to={`/dashboard/tickets/edit/${isLesson(item, cellIndex, data).ticket}`}>
                                            //             <Typography fontSize={10} sx={{cursor: 'pointer'}}>
                                            //                 {isLesson(item, cellIndex, data).student  + ' / ' + isLesson(item, cellIndex, data).teacher}
                                            //             </Typography>
                                            //         </NavLink>
                                            //         : ''
                                            //     }
                                            // </TableCell>
                                        )
                                    })
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

