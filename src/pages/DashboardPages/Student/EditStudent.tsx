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
import { IFormStudent, IStudent } from '../../../types/student';
import FormControlLabel from '@mui/material/FormControlLabel';
import useUpdateStudent from '../../../api/query/student/useUpdateStudent';

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

interface IStudentItem {
    student: IStudent,
    allTeachers: ITeacher[]
}


type Params = {
    id: string;
}

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Обовязкове поле'),
    email: yup.string().email('Не валідний Email').optional(),
    phone: yup.string().required('Обовязкове поле'),
    subjects: yup.array().min(1, 'Необхідно вибрати хоча б одне значення').required('Обовязкове поле'),
    parents: yup.string().optional(),
    birthday: yup.date().optional().nullable(),
    isActive: yup.boolean().required('Обовязкове поле'),
    gender: yup.string().oneOf(['Чоловіча', 'Жіноча', '']).required('Обовязкове поле'),
    teachers: yup.array().min(1, 'Необхідно вибрати хоча б одне значення').required('Обовязкове поле')
  })
  .required()

const EditStudent: FC<IStudentItem> = ({student, allTeachers}) => {
    const theme = useTheme();
    const params = useParams<Params>();
    const mutation = useUpdateStudent(params.id);
    const {mutate, isPending} = mutation;

    const {register, watch, handleSubmit, reset, formState: {errors}, control} = useForm<IFormStudent>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...student, teachers: student.teachers.map(item => item._id)}
    })

    const watchBirthday = watch('birthday')
    const age = watchBirthday ? new Date().getFullYear() - new Date(watchBirthday).getFullYear() : '';

    const onSubmit: SubmitHandler<IFormStudent> = (data) => {
        const updatedStudent: IFormStudent = {...data}
        mutate(updatedStudent);
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
                title={`Редагувати дані учня ${student?.fullName}`}
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
                    <Grid size={3}>
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
                    <Grid size={3}>
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
                    <Grid size={3}>
                        <FormControl fullWidth={true}>
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
                    <Grid size={3}>
                        <Controller
                            name='gender'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.gender}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormLabel htmlFor="education">Стать *</FormLabel>
                                </Box>
                                <Select
                                    id="gender"
                                    value={value}
                                    onChange={onChange}
                                    MenuProps={MenuProps}
                                    renderValue={value => value}
                                    color={!!errors.gender ? 'error' : 'primary'}
                                >
                                    {['Чоловіча', 'Жіноча'].map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={!!value && value.includes(name)} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.gender?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={12}>    
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="education">Інформація про батьків</FormLabel>
                            </Box>
                            <TextField
                                {...register('parents')}
                                error={!!errors.parents}
                                helperText={errors.parents?.message}
                                name="parents"
                                type="text"
                                id="parents"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                color={!!errors.parents ? 'error' : 'primary'}
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
                    <Grid size={5}>
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
                    <Grid size={5}>
                        <Controller
                            name='teachers'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.teachers}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormLabel htmlFor="education">Вчителі *</FormLabel>
                                </Box>
                                <Select
                                    id="teachers"
                                    multiple
                                    value={value || []}
                                    onChange={onChange}
                                    renderValue={
                                        (selected) => selected.map(item => allTeachers.find(teacher => teacher._id == item)?.fullName).join(', ')
                                    }
                                    MenuProps={MenuProps}
                                    color={!!errors.teachers ? 'error' : 'primary'}
                                >
                                    {allTeachers.map((teacher) => (
                                        <MenuItem key={teacher._id} value={teacher._id}>
                                            <Checkbox checked={
                                                !!value.length && !!teacher._id && value.includes(teacher._id)}
                                             />
                                            <ListItemText primary={teacher.fullName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.teachers?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
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

export default EditStudent;