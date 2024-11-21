import { IWorktime } from "../../../types/teacher";
import {FC, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {useForm, SubmitHandler, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import EditIcon from '@mui/icons-material/Edit';
import { ITeacher } from '../../../types/teacher';
import { Grid2, CircularProgress } from '@mui/material';
import {useParams, Navigate} from 'react-router-dom';
import useTeacher from '../../../api/query/teacher/useGetTaecher';
import { useTheme } from '@mui/material/styles';

interface IWorktimeItem {
    data: IWorktime
}

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
    email: yup.string().email('Не валідний Email').required('Обовязкове поле'),
    roles: yup.array().optional()
  })
  .required()

const WorkTimeItem: FC<IWorktimeItem> = ({data}) => {
    const theme = useTheme();
    // const {mutate, isPending} = mutation;
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IWorktime>({
        mode: 'onSubmit', 
        // resolver: yupResolver(schema),
        defaultValues: {...data}
    })
    
    const onSubmit: SubmitHandler<IWorktime> = (user) => {
        const updatedAdmin: IWorktime = {...data, ...user}
        // mutate(updatedAdmin);
        reset();
    };

    return (
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
            <Grid2 container spacing={2}>
            <Grid2 size={3}>    
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="day">День</FormLabel>
                    </Box>
                    <TextField
                        {...register("day")}
                        error={!!errors.day}
                        helperText={errors.day?.message}
                        name="day"
                        type="text"
                        id="day"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={!!errors.day ? 'error' : 'primary'}
                    />
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <FormControl>
                        <FormLabel htmlFor="startTime">Час Поатку роботи</FormLabel>
                            <TextField
                                {...register('startTime')}
                                error={!!errors.startTime}
                                helperText={errors.startTime?.message}
                                id="startTime"
                                type="text"
                                name="startTime"
                                autoComplete="startTime"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.startTime ? 'error' : 'primary'}
                                sx={{ ariaLabel: 'startTime' }}
                            />
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <FormControl>
                        <FormLabel htmlFor="endTime">Час зікінчення роботи</FormLabel>
                            <TextField
                                {...register('endTime')}
                                error={!!errors.endTime}
                                helperText={errors.endTime?.message}
                                id="endTime"
                                type="text"
                                name="endTime"
                                autoComplete="endTime"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.startTime ? 'error' : 'primary'}
                                sx={{ ariaLabel: 'endTime' }}
                            />
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{bgcolor: theme.status.success, width: theme.button.width}}
                    >
                        Зберегти
                    </Button>
                </Grid2>
                </Grid2>
        </Box>
    )
};

export default WorkTimeItem;