import {FC, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { green } from '@mui/material/colors';
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

const schema = yup
  .object({
    email: yup.string().email('Invalid Email format').required('Email is required'),
  })
  .required()

const ResetEmail: FC<{email: string}> = ({email}) => {
    const [isEdit, setIsEdid] = useState<boolean>(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<{email: string}>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {email}
    })

    const onEdit = () => {
        setIsEdid(!isEdit);
        reset();
    }
    
    const onSubmit: SubmitHandler<{email: string}> = (data) => {
        console.log(data)
    };

    return (
        <Card sx={{marginTop: '20px'}}>
            <CardHeader

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
                <Grid2 sx={{textAlign: 'right'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{bgcolor: green[300], width: '100px'}}
                        disabled={!isEdit}
                    >
                        Зберегти
                    </Button>
                </Grid2>
            </Box>
            </CardContent>
        </Card>
    )
}

export default ResetEmail;