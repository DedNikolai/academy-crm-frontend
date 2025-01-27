
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid2, Typography, Box, CircularProgress } from "@mui/material";
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { timesArray, teacherCellsArray} from '../../../utils/timesArray';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Subjects } from '../../../types/subjects';
import { ITeacher } from '../../../types/teacher';
import useGetTieacherTimes from '../../../api/query/studentTime/useGetStudentsTimeByTeacher';
import { Days } from '../../../types/days';
import CustomCell from '../../../components/dashboard/CustomCell';


dayjs.extend(localeData)

const TeacherShedule: React.FC<{teacher: ITeacher}> = ({teacher}) => {
  const weekDays = Object.values(Days);
  weekDays.shift();
  weekDays.push(Days.SUNDAY)
  const times = timesArray();
  const {data = {docs: []}, isLoading} = useGetTieacherTimes(teacher._id || '');

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <Grid2 container spacing={3} sx={{padding: '20px'}} alignItems='center'>
        <Grid2 size={4} sx={{}}>
            <Typography>
                {`Розклад ${teacher.fullName}`}
            </Typography>
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
                    sx={{width: '10px', borderRight: 1, borderTop: 1}}
                    style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }} 
                />
                {
                    weekDays.map(item => <TableCell 
                                            sx={{width: 100, borderRight: 1, borderTop: 1}}
                                            align='center'
                                            key={item.toString()}>
                                                {item}
                                          </TableCell>)
                }
            </TableRow> 
          </TableHead>
          <TableBody>
                {
                    times.map((item, rowIndex) => {
                        return (
                            <TableRow key={item.toString()}>
                                <TableCell
                                    id={`${rowIndex*7}`} 
                                    sx={{borderRight: 1, borderTop: 1, textAlign: 'center'}}
                                    style={{position: 'sticky', left: 0, backgroundColor: '#fff' }} 
                                >
                                    {dayjs(item).format('HH:mm')}
                                </TableCell>
                                {
                                    teacherCellsArray().map((num, cellIndex) => {
                                        return (
                                            <CustomCell  
                                                rowIndex={rowIndex}
                                                cellIndex={cellIndex}
                                                time={item}
                                                lessons={data}
                                                workTimes={teacher.worktimes}
                                                key={item.toString() + num}
                                            />
                                            // <TableCell
                                            //     id={`${rowIndex*7 + cellIndex + 1}`}
                                            //     sx={{
                                            //         width: 100, 
                                            //         borderRight: 1, 
                                            //         bgcolor: isTeacherLesson(item, cellIndex, data, teacher.worktimes || []).color,
                                            //         borderTop: isTeacherLesson(item, cellIndex, data, teacher.worktimes || []).borderTop,
                                            //         borderBottom: isTeacherLesson(item, cellIndex, data, teacher.worktimes || []).borderBottom,
                                            //     }} 
                                            //     align='center'
                                            //     key={item.toString() + num}                                                              
                                            // >
                                            //     {
                                            //         isTeacherLesson(item, cellIndex, data, teacher.worktimes || []).isText ?
                                            //         <Typography fontSize={14} sx={{cursor: 'pointer'}}>
                                            //                 {isTeacherLesson(item, cellIndex, data, teacher.worktimes || []).student  + ' / ' + isTeacherLesson(item, cellIndex, data, teacher.worktimes || []).room}
                                            //          </Typography>
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

export default  TeacherShedule;



