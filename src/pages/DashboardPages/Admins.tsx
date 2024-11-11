import React, { FC, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid2 } from "@mui/material";
import { IUser } from "../../types/user";
import { Roles } from "../../types/roles";
import { green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";

const mock = {
    _id: '1',
    fullName: "John Doe",
    email: 'email.com.ua',
    roles: [Roles.ADMIN]
}

const Admins: FC = () => {
    const [users, setUsers] = useState<IUser[]>([mock])
    return (
        <TableContainer component={Paper}>
        <Grid2 sx={{padding: '20px'}}><h2>Aдміністатори</h2></Grid2>    
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Повне Ім'я</TableCell>
              <TableCell align="center">Пошта</TableCell>
              <TableCell align="right">Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{}}
              >
                <TableCell component="th" scope="row">
                  {user.fullName}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid2 sx={{padding: '20px', textAlign: 'right'}}>
            <NavLink to='/dashboard/admins/create'>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{bgcolor: green[300], width: '150px'}}
                >
                    Додати
                </Button>
            </NavLink>
        </Grid2>
      </TableContainer>
    )
}

export default Admins;