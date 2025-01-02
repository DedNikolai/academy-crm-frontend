import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid2, Typography, Box, CircularProgress, Divider } from "@mui/material";
import dayjs, {Dayjs} from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import localeData from 'dayjs/plugin/localeData';
import useGetWeekLessons from '../../../api/query/lesson/useGetWeekLessons';
import { selectWeek } from '../../../utils/selectWeek';
import { timesArray, emptyArray} from '../../../utils/timesArray';
import { isLesson } from '../../../utils/isLesson';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Colors } from '../../../types/colors';


dayjs.extend(localeData)

export default function Shedule() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs().startOf('day'));
  const weekDays = selectWeek(date);
  const times = timesArray();
  const {data = {docs: []}, isLoading} = useGetWeekLessons(date)  

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
         <Grid2 size={2} display='flex'>Вокал - <Brightness1Icon sx={{color: '#00e5ff'}}/></Grid2>
         <Grid2 size={2} display='flex'>Фортепіано - <Brightness1Icon sx={{color: '#ffef62'}}/></Grid2>
         <Grid2 size={2} display='flex'>Гітара - <Brightness1Icon sx={{color: '#ffa733'}}/></Grid2>
         <Grid2 size={2} display='flex'>Ударні - <Brightness1Icon sx={{color: '#91ff35'}}/></Grid2>
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
                                <TableCell 
                                    sx={{borderRight: 1, borderTop: 1}}
                                    style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }} 
                                >
                                    {dayjs(item).format('HH:mm')}
                                </TableCell>
                                {
                                    emptyArray().map((num, index) => {
                                        return (
                                            <TableCell 
                                                sx={{
                                                    width: 30, 
                                                    borderRight: 1, 
                                                    borderTop: 1,
                                                    bgcolor: isLesson(item, index, data).isLesson ? isLesson(item, index, data).color : 'inherit'
                                                    }} 
                                                rowSpan={isLesson(item, index, data).isLesson && isLesson(item, index, data).duration === 60 ? 2 : 1}
                                                align='center'
                                                key={item.toString() + num}                                                              
                                            >
                                                {
                                                    isLesson(item, index, data).isLesson ?
                                                    (
                                                        <>
                                                            <Typography fontSize={10}>{isLesson(item, index, data).student}</Typography>
                                                            <Typography fontSize={10}>{isLesson(item, index, data).teacher}</Typography>
                                                        </>
                                                    ) : ''
                                                }
                                            </TableCell>
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

