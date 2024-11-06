import { FC, useEffect, useState } from "react";
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container } from '@mui/material';
import {Link, Navigate, useParams, useSearchParams} from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import SignInContainer from '../components/SignInContainer';
import {useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CustomCard from '../components/CustomCard';
import Loader from "../components/Loader";
import { UpdatePasswordTypes } from "../types/updatePasswordTypes";
import { resetPassword } from "../api/user";

type TypePassword = {
    password: string
}

type TypeParams = {
    id: string;
}

const schema = yup
  .object({
    password: yup.string().min(6, 'Занадто Короткий пароль').required('Password is required'),
  })
  .required()

const ResetPassword: FC = () => {
    const authContext = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const [isPasswordUpdating, setIsPasswordUpdating] = useState<boolean>(false);
    const [updateStatus, setUpdateStstus] = useState<UpdatePasswordTypes>(UpdatePasswordTypes.PENDING)
    const token = searchParams.get('token');
    const {id} = useParams<TypeParams>();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<TypePassword>({mode: 'onSubmit', resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<TypePassword> = (data) => {
        reset();
        if (id && token) {
            setIsPasswordUpdating(true);
            resetPassword(id, data, token).then(res => {
                if (res) {
                    setUpdateStstus(UpdatePasswordTypes.SUCCESS)
                }
            }).catch(() => setUpdateStstus(UpdatePasswordTypes.FAILED))
            .finally(() => setIsPasswordUpdating(false));
        }
        
    };
  
    useEffect(() => {
        return () => {
            setUpdateStstus(UpdatePasswordTypes.PENDING);
            setIsPasswordUpdating(false);
        }
    }, [])

    if (authContext?.user) return <Navigate to='/dashboard/main'/>
    if (isPasswordUpdating) return <Loader />

    return (
        <Container component="main">
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <CustomCard variant="outlined">
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Avatar sx={{ my: 1, mb: 2, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Box>  
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
                >
                    Зміна пароля
                </Typography>
                {
                    updateStatus === UpdatePasswordTypes.PENDING &&
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
                            <FormLabel htmlFor="password">Пароль</FormLabel>
                        </Box>
                        <TextField
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={!!errors.password ? 'error' : 'primary'}
                        />
                        </FormControl>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        >
                        Відправити
                        </Button>
                    </Box>
                }
                {
                    updateStatus === UpdatePasswordTypes.SUCCESS &&
                    <h2>Пароль оновлено успішно</h2>
                }
                                {
                    updateStatus === UpdatePasswordTypes.FAILED &&
                    <h2>Помилка при оновленні пароля</h2>
                }
                
                <Link 
                    to='/'
                    className='link__decorated'
                >На головну
                </Link>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                </Box>
                </CustomCard>
            </SignInContainer>
        </Container>
    )
};

export default ResetPassword;