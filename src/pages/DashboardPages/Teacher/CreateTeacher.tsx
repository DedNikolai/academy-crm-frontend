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
import useCreateTeacher from '../../../api/query/teacher/useCreateTeacher';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
    email: yup.string().email('Не валідний Email').required('Обовязкове поле'),
    phone: yup.string().required('Обовязкове поле'),
    subjects: yup.array().min(1, 'Необхідно вибрати хоча б одне значення').required('Обовязкове поле'),
    age: yup.number().nullable().transform((curr, orig) => (orig === "" ? null : curr)),
    education: yup.string().optional(),
    birthday: yup.date().optional().nullable(),
    worktimes: yup.array().optional()
  })
  .required()

const CreateTeacher: FC = () => {
    const theme = useTheme();
    const mutation = useCreateTeacher();
    const {mutate, isPending} = mutation;
    const {register, handleSubmit, reset, watch, formState: {errors}, control} = useForm<ITeacher>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {subjects: []}
    })

    const watchBirthday = watch('birthday', null)
    const age = watchBirthday ? new Date().getFullYear() - new Date(watchBirthday).getFullYear() : '';

    const onSubmit: SubmitHandler<ITeacher> = (data) => {
        const newTeacher: ITeacher = {...data}
        mutate(newTeacher);
        reset();
    };

    return (
        <>
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <EditIcon />
                    </Avatar>
                }
                title={`Додати нового вчителя`}
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
                    <Grid size={12}>
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
                                    value={value}
                                    onChange={onChange}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    color={!!errors.subjects ? 'error' : 'primary'}
                                >
                                    {Object.values(Subjects).map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={value && value.includes(name)} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.subjects?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={12}>    
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

export default CreateTeacher;