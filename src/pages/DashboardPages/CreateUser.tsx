import {FC, useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green, red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../components/AuthProvider';
import {useForm, SubmitHandler, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import IconButton from '@mui/material/IconButton';
import Loader from '../../components/Loader';
import ResetEmail from '../../components/ResetEmail';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { updateUser } from '../../api/user';
import { IUser } from '../../types/user';
import { CircularProgress, Grid2 } from '@mui/material';
import { Roles } from '../../types/roles';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import useCreateUser from '../../api/query/user/useCreateUser';

interface ICreateUser {
    fullName: string;
    email: string;
    password: string;
}

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
    email: yup.string().email('Не валідний Email').required('Обовязкове поле'),
    roles: yup.array().optional(),
    password: yup.string().min(5, 'Мінімум 5 символів').required('Обовязкове поле')
  })
  .required()

const CreateUser: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const mutation = useCreateUser();
    const {mutate, isPending} = mutation
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICreateUser>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const onSubmit: SubmitHandler<ICreateUser> = (data) => {
        const newAdmin: IUser = {
            ...data,
            roles: [Roles.ADMIN]
        }
        mutate(newAdmin)
        reset();
    };

    if (isPending) return <CircularProgress />

    return (
        <>
        <Card sx={{}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
                }
                title='Додати адміністратора'
            />
            <CardContent>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
                }}
            >
                <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password">Ім'я</FormLabel>
                </Box>
                <TextField
                    {...register('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    name="fullName"
                    type="text"
                    id="fullName"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={!!errors.fullName ? 'error' : 'primary'}
                />
                </FormControl>
                <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={!!errors.email ? 'error' : 'primary'}
                    sx={{ ariaLabel: 'email' }}
                />
            </FormControl>
            
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Пароль</FormLabel>
              </Box>
              <OutlinedInput
                {...register('password')}
                error={!!errors.password}
                name="password"
                type={!showPassword ? "password" : 'text'}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                color={!!errors.password ? 'error' : 'primary'}
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
              />
            </FormControl>
                <Grid2 sx={{textAlign: 'right'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{bgcolor: green[300], width: '150px'}}
                    >
                        Зберегти
                    </Button>
                </Grid2>
            </Box>
            </CardContent>           
        </Card>
        </>
    )
};

export default CreateUser;