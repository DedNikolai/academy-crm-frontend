import {FC, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green, } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {useForm, SubmitHandler, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import EditIcon from '@mui/icons-material/Edit';
import { IUser } from '../../types/user';
import { Grid2, CircularProgress } from '@mui/material';
import { Roles } from '../../types/roles';
import {useParams, Navigate} from 'react-router-dom';
import useGetUser from '../../api/query/user/useGetUser';
import useUpdateUser from '../../api/query/user/useUpdateUser';

interface ICreateUser {
    fullName: string;
    email: string;
}

type Params = {
    id: string;
}

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
    email: yup.string().email('Не валідний Email').required('Обовязкове поле'),
    roles: yup.array().optional()
  })
  .required()

const EditUser: FC = () => {
    const params = useParams<Params>();
    const {data, isLoading, isFetched} = useGetUser(params.id);
    const mutation = useUpdateUser(params.id);
    const {mutate, isPending} = mutation;
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICreateUser>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...data}
    })
    
    const onSubmit: SubmitHandler<ICreateUser> = (user) => {
        const updatedAdmin: IUser = {...data, ...user}
        mutate(updatedAdmin);
        // console.log(updatedAdmin);
        reset();
    };

    useEffect(() => {
        reset(data);
    }, [data])

    if (!data && isFetched) return <Navigate to='/404' />

    return (
        <>
        <Card sx={{}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }}>
                        <EditIcon />
                    </Avatar>
                }
                title='Редагувати адміністратора'
            />
            {isLoading || isPending ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
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
            }           
        </Card>
        </>
    )
};

export default EditUser;