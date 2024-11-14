import {FC, useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
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
import { Grid2 } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
  })
  .required()

const Profile: FC = () => {
    const [isEdit, setIsEdid] = useState<boolean>(false);
    const theme = useTheme();
    const authContext = useContext(AuthContext);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<{fullName: string}>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...authContext?.user}
    })
    
    const onSubmit: SubmitHandler<{fullName: string}> = (data) => {
        authContext?.setIsUserLoading(true);
        updateUser(data as IUser).then(res => {
            if (res) {
                authContext?.setUser(res)
            }
        }).finally(() => authContext?.setIsUserLoading(false))
    };

    const onEdit = () => {
        setIsEdid(!isEdit);
        reset();
    }

    if (authContext?.isUserLoading) return <Loader />


    return (
        <>
        <Card sx={{}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: theme.status.error }} aria-label="recipe" />
                }
                title={authContext?.user?.fullName}
                subheader="Власник компанії"
                action={
                    <IconButton aria-label="settings" onClick={onEdit}>
                      {!isEdit ? <EditIcon /> : <ClearIcon />}
                    </IconButton>
                }
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
                    disabled={!isEdit}
                />
                </FormControl>
                <Grid2 sx={{textAlign: 'right'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{bgcolor: theme.status.success, width: theme.button.width}}
                        disabled={!isEdit}
                    >
                        Зберегти
                    </Button>
                </Grid2>
            </Box>
            </CardContent>           
        </Card>
        <ResetEmail email={authContext?.user?.email || ''} />
        </>
    )
}

export default Profile