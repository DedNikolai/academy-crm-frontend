import { FC } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Grid2 } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";
import useTeachers from "../../../api/query/teacher/useGetTeachers";
import { useTheme } from '@mui/material/styles';
import { ITeacher } from "../../../types/teacher";
import useDeleteTeacher from "../../../api/query/teacher/useDeleteTeacher";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Teachers: FC = () => {
    const theme = useTheme();
    const {data, isLoading} = useTeachers();
    const mutation = useDeleteTeacher();
    const {mutate, isPending} = mutation;

    const deleteItem = (id?: string) => {
      const isAccept: boolean = window.confirm("Видалити Вчителя?");
      if(isAccept && id) {
        mutate(id);
      }
    }
    return (
        <TableContainer component={Paper}>
        <Grid2 sx={{padding: '20px'}}><h2>Вчителі</h2></Grid2> 
        {
          isLoading || isPending ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Повне Ім'я</TableCell>
                <TableCell align="center">Номер Телефону</TableCell>
                <TableCell align="center">Пошта</TableCell>
                <TableCell align="center">Предмети</TableCell>
                <TableCell align="center">Активний</TableCell>
                <TableCell align="right">Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((teacher: ITeacher) => (
                <TableRow
                  key={teacher._id}
                  sx={{}}
                >
                  <TableCell component="th" scope="row">
                    {teacher.fullName}
                  </TableCell>
                  <TableCell align="center">{teacher.phone}</TableCell>
                  <TableCell align="center">{teacher.email}</TableCell>
                  <TableCell align="center">{teacher.subjects.join(', ')}</TableCell>
                  <TableCell align="center">
                          {
                            teacher.isActive ? <CheckBoxIcon sx={{color: theme.status.success}} />
                            : <CancelIcon sx={{color: theme.status.error}} />
                          }   
                  </TableCell>
                  <TableCell align="right">
                    <NavLink to={`/dashboard/teachers/edit/${teacher._id}`}>
                      <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                      </NavLink>
                      <IconButton aria-label="delete" onClick={() => deleteItem(teacher._id)}>
                          <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }   
        <Grid2 sx={{padding: '20px', textAlign: 'right'}}>
            <NavLink to='/dashboard/teachers/create'>
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
      </TableContainer>
    )
};

export default Teachers;