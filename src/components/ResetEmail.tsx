import {FC, useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { blue, green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {useForm, SubmitHandler, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Grid2 } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import { resetEmail, updateEmail } from '../api/user';
import { AuthContext } from './AuthProvider';
import { useTheme } from '@mui/material/styles';

const schema = yup
  .object({
    email: yup.string().email('Invalid Email format').required('Email is required'),
  })
  .required()

const ResetEmail: FC<{email: string}> = ({email}) => {
    const theme = useTheme();
    const authContext = useContext(AuthContext);
    const [isEdit, setIsEdid] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [resetSuccess, setResetSuccess] = useState<boolean>(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<{email: string, code?: string}>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {email}
    })

    const onEdit = () => {
        setIsEdid(!isEdit);
        setResetSuccess(false);
        reset();
    }
    
    const onSubmit: SubmitHandler<{email: string, code?: string}> = (data) => {
        if (!resetSuccess) {
            setIsloading(true);
            resetEmail(data).then(res => {
                if (res) {
                    setResetSuccess(true);
                }
            }).finally(() => setIsloading(false));
        } else {
            setIsloading(true);
            updateEmail(data).then(res => {
                if (res) {
                    authContext?.setUser(res);
                    setResetSuccess(false);
                    setIsEdid(false);
                }
            }).finally(() => setIsloading(false))
        }
    };

    return (
        <Card sx={{marginTop: '20px'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                        <EmailIcon />
                    </Avatar>
                }
                title='Email власника'
                action={
                    <IconButton aria-label="settings" onClick={onEdit}>
                      {!isEdit ? <EditIcon /> : <ClearIcon />}
                    </IconButton>
                }
            />
            <CardContent>
                {
                    isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
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
                            disabled={!isEdit}
                        />
                    </FormControl>
                    {
                        resetSuccess &&
                        <FormControl>
                        <FormLabel htmlFor="code">Код підтвердженя</FormLabel>
                            <TextField
                                {...register('code')}
                                id="code"
                                type="code"
                                name="code"
                                autoComplete="code"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                disabled={!isEdit}
                            />
                        </FormControl>
                    }
                    <Grid2 sx={{textAlign: 'right'}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{bgcolor: green[300], width: '150px'}}
                            disabled={!isEdit}
                        >
                            {!resetSuccess ? "Зберегти" : "Підтвердити"}
                        </Button>
                    </Grid2>
                </Box>
                }
            </CardContent>
        </Card>
    )
}

export default ResetEmail;