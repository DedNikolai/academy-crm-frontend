import {FC} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import EditIcon from '@mui/icons-material/Edit';
import { Grid2, CircularProgress } from '@mui/material';
import {useParams } from 'react-router-dom';
import useUpdateTeacher from '../../../api/query/teacher/useUpdateTeacher';
import { useTheme } from '@mui/material/styles';
import { ITeacher } from '../../../types/teacher';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Subjects } from '../../../types/subjects';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuProps from '../../../utils/MenuProps';

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
    email: yup.string().email('Не валідний Email').required('Обовязкове поле'),
    phone: yup.string().required('Обовязкове поле'),
    subjects: yup.array().min(1, 'Необхідно вибрати хоча б одне значення').required('Обовязкове поле'),
    age: yup.number().nullable().transform((curr, orig) => (orig === "" ? null : curr)),
    education: yup.string().optional(),
    birthday: yup.date().optional().nullable(),
    worktimes: yup.array().optional(),
    isActive: yup.boolean().required('Обовязкове поле')
  })
  .required()

const EditTeacher: FC<{teacher: ITeacher}> = ({teacher}) => {
    const theme = useTheme();
    const params = useParams<{id: string;}>();
    const mutation = useUpdateTeacher(params.id);
    const {mutate, isPending} = mutation;
    const {register, watch, handleSubmit, reset, formState: {errors}, control} = useForm<ITeacher>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...teacher}
    })

    const watchBirthday = watch('birthday')
    const age = watchBirthday ? new Date().getFullYear() - new Date(watchBirthday).getFullYear() : '';

    const onSubmit: SubmitHandler<ITeacher> = (data) => {
        const updatedTeacher: ITeacher = {...data}
        mutate(updatedTeacher);
    };

    const geSubjectValue = (key: string) => {
        let day = '';
        Object.keys(Subjects).forEach(item => {
            if (key === item) {
                day = Subjects[item as keyof typeof Subjects];
            }
        })
     
        return day;
    }

    return (
        <>
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <EditIcon />
                    </Avatar>
                }
                title={`Редагувати дані вчителя ${teacher?.fullName}`}
            />
            {
            isPending ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
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
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <FormControl fullWidth={true}  error={!!errors.fullName}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="fullName">Ім'я *</FormLabel>
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
                    </Grid>
                    <Grid size={4}>
                        <Controller
                                name='birthday'
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <FormControl fullWidth={true}>
                                        <FormLabel htmlFor="birthday">Дата Народження</FormLabel>
                                        <LocalizationProvider 
                                            dateAdapter={AdapterDayjs} 
                                            adapterLocale='uk'
                                        >

                                            <DatePicker
                                                value={value ? dayjs(value) : null}
                                                onChange={onChange}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                )}
                        />        
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth={true} error={!!errors.age}>
                            <FormLabel htmlFor="age">Вік</FormLabel>
                                <TextField
                                    id="age"
                                    type="number"
                                    name="age"
                                    autoComplete="age"
                                    autoFocus
                                    fullWidth
                                    value={age}
                                    variant="outlined"
                                    sx={{ ariaLabel: 'age' }}
                                    disabled
                                />
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <FormControl fullWidth={true} error={!!errors.phone}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="phone">Телефон *</FormLabel>
                            </Box>
                            <TextField
                                {...register('phone')}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                name="phone"
                                type="text"
                                id="phone"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.phone ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <FormControl fullWidth={true} error={!!errors.email}>
                            <FormLabel htmlFor="email">Email *</FormLabel>
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
                    </Grid>
                    <Grid size={10}>
                        <Controller
                            name='subjects'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.subjects}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormLabel htmlFor="education">Предмети *</FormLabel>
                                </Box>
                                <Select
                                    id="subjects"
                                    multiple
                                    value={value || []}
                                    onChange={onChange}
                                    renderValue={(selected) => selected.map(item => geSubjectValue(item)).join(', ')}
                                    MenuProps={MenuProps}
                                    color={!!errors.subjects ? 'error' : 'primary'}
                                >
                                    {Object.keys(Subjects).map((key) => (
                                        <MenuItem key={key} value={key}>
                                            <Checkbox checked={value && value.includes(key)} />
                                            <ListItemText primary={Subjects[key as keyof typeof Subjects]} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.subjects?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={2}>
                        <FormControl fullWidth={true} error={!!errors.balance}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="phone">Баланс</FormLabel>
                            </Box>
                            <TextField
                                {...register('balance')}
                                error={!!errors.balance}
                                helperText={errors.balance?.message}
                                name="balance"
                                type="number"
                                id="balance"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.balance ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={10}>    
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="education">Освіта</FormLabel>
                            </Box>
                            <TextField
                                {...register('education')}
                                error={!!errors.education}
                                helperText={errors.education?.message}
                                name="education"
                                type="text"
                                id="education"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                color={!!errors.education ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid2 size={2} display='flex' alignItems='center'>
                        <Controller
                            name='isActive'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControlLabel control={
                                    <Checkbox 
                                        checked={value}
                                        onChange={onChange}
                                    />
                                    } 
                                    label="Активний" 
                                />
                            )}
                        />
                    </Grid2>
                </Grid>
                <Grid2 sx={{textAlign: 'right'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{bgcolor: theme.status.success, width: theme.button.width}}
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

export default EditTeacher;