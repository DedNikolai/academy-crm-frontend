import { FC } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Grid2 } from "@mui/material";
import { IUser } from "../../types/user";
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";
import useUsers from "../../api/query/user/useGetUsers";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import useDeleteUser from "../../api/query/user/useDeleteUser";
import { useTheme } from '@mui/material/styles';

const Admins: FC = () => {
    const theme = useTheme();
    const {data, isLoading} = useUsers();
    const mutation = useDeleteUser();
    const {mutate, isPending} = mutation;
    
    const deleteItem = (id?: string) => {
      const isAccept: boolean = window.confirm("Видалити адміністратора?");
      if(isAccept && id) {
        mutate(id);
      }
    }
    
    return (
        <TableContainer component={Paper}>
        <Grid2 sx={{padding: '20px'}}><h2>Aдміністатори</h2></Grid2> 
        {
          isLoading || isPending ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Повне Ім'я</TableCell>
                <TableCell align="center">Пошта</TableCell>
                <TableCell align="center">Підтверджений</TableCell>
                <TableCell align="right">Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user: IUser) => (
                <TableRow
                  key={user._id}
                  sx={{}}
                >
                  <TableCell component="th" scope="row">
                    {user.fullName}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.verified ? <CheckIcon color="success"/> : <CancelIcon color="error"/>}
                  </TableCell>
                  <TableCell align="right">
                    <NavLink to={`/dashboard/admins/edit/${user._id}`}>
                      <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                      </NavLink>
                      <IconButton aria-label="delete" onClick={() => deleteItem(user._id)}>
                          <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }   
        <Grid2 sx={{padding: '20px', textAlign: 'right'}}>
            <NavLink to='/dashboard/admins/create'>
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
}

export default Admins;