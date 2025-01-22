import { IWorktime } from "../../../types/teacher";
import {FC, useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ITeacher } from '../../../types/teacher';
import { Grid2, CircularProgress, duration } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Days } from "../../../types/days";
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import useDeleteWorktime from "../../../api/query/worktime/useDeleteWorktime";
import { IStudentTime, IStudentTimeForm } from "../../../types/studentTime";
import { IStudent } from "../../../types/student";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Subjects } from "../../../types/subjects";
import MenuProps from '../../../utils/MenuProps';
import { Durations, Rooms } from "../../../constants/app";
import useUpdateStudentTime from "../../../api/query/studentTime/useUpdateStudentTime";
import useDeleteStudentTime from "../../../api/query/studentTime/useDeleteStudentTime";

dayjs.extend(utc);
dayjs.extend(timezone);

interface IStudentTimeItem {
    data: IStudentTime,
    student: IStudent,
    allTeachers: ITeacher[]
}

const schema = yup
  .object({
    day: yup.string().required(),
    startTime: yup.date().required('Обовязкове поле'),
    duration: yup.number().required('Обовязкове поле'),
    teacher: yup.string().required('Обовязкове поле'),
    student: yup.string().required('Обовязкове поле'),
    subject: yup.string().required('Обовязкове поле'),
  })
  .required()

const StudentTimeItem: FC<IStudentTimeItem> = ({data, student, allTeachers}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const mutation = useUpdateStudentTime();
    const deleteMutation = useDeleteStudentTime();
    const {mutate, isPending} = mutation;
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IStudentTimeForm>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...data, 
            teacher: data.teacher._id, 
            student: student._id,
        }
    })
   
    const getDayValue = (key: string) => {
        let day = '';
        Object.keys(Days).forEach(item => {
            if (key === item) {
                day = Days[item as keyof typeof Days];
            }
        })
    
        return day;
    }
    const selectedTeacher = (value: string) => {
        if (value) {
           let teacher =  allTeachers.find((teacher:ITeacher) => teacher._id == value);
           return teacher?.fullName || '' 
        }

        return ''
    }

    const onSubmit: SubmitHandler<IStudentTimeForm> = (data) => {
        const time: IStudentTimeForm = {...data};
        mutate(time);    
    };

    const deleteItem = () => {
        const isAccept: boolean = window.confirm("Видалити час?");
        if (isAccept) {
            if (data._id) {
                deleteMutation.mutate(data._id)
            }
        }
    }

    if (isPending) return <Box sx={{textAlign: 'center'}}><CircularProgress /></Box>

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
                marginBottom: '15px',
                padding: '0 20px'
            }}
        >
            <Grid2 container spacing={2} alignItems='flex-end'>
            <Grid2 size={2}>    
                <Controller
                    name='day'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl fullWidth={true} error={!!errors.day} size="small">
                            <Select
                                disabled={!isEdit}
                                id="day"
                                value={value}
                                onChange={onChange}
                                renderValue={(selected) => getDayValue(selected)}
                            >
                                {Object.keys(Days).map((key) => (
                                    <MenuItem key={key} value={key}>{Days[key as keyof typeof Days]}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        )}
                />
             </Grid2>
             <Grid2 size={2}>
                <Controller
                    name='startTime'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>
                                <TimePicker
                                    disabled={!isEdit}
                                    value={dayjs(value)}
                                    format="HH:mm"
                                    onChange={onChange}
                                    timeSteps={{hours: 1, minutes: 30}}
                                    timezone={'Europe/Kyiv'}
                                    slotProps={{
                                        textField: { size: 'small' },
                                        layout: {
                                          sx: {
                                            ul: {
                                              '::-webkit-scrollbar': {
                                                width: '0',
                                              },
                                            },
                                          },
                                        }
                                      }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        )}
                />
            </Grid2>
            <Grid2 size={1}>
                    <Controller
                        name='duration'
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <FormControl fullWidth={true} error={!!errors.duration} size='small'>
                                <Select
                                    disabled={!isEdit}
                                    id="duration"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={(selected) => selected}
                                    MenuProps={MenuProps}
                                    color={!!errors.duration ? 'error' : 'primary'}
                                >
                                    {Object.values(Durations).map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={!!value && value == item} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid2>
            <Grid2 size={2}>    
                <Controller
                    name='teacher'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl fullWidth={true} error={!!errors.teacher} size="small">
                            <Select
                                id="day"
                                disabled={!isEdit}
                                value={value}
                                onChange={onChange}
                                renderValue={
                                    (selected) => selectedTeacher(selected)}
                            >
                                {student.teachers.map((teacher: ITeacher) => (
                                        <MenuItem key={teacher._id} value={teacher._id}>
                                            <Checkbox checked={
                                                !!value && teacher._id == value}
                                             />
                                            <ListItemText primary={teacher.fullName} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        )}
                />
             </Grid2>
             <Grid2 size={2}>    
                <Controller
                    name='subject'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl fullWidth={true} error={!!errors.subject} size="small">
                            <Select
                                disabled={!isEdit}
                                id="subject"
                                value={value}
                                onChange={onChange}
                                renderValue={(selected) => Subjects[selected as keyof typeof Subjects]}
                            >
                                {student.subjects.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={!!value && value == name} />
                                            <ListItemText primary={Subjects[name as keyof typeof Subjects]} />
                                        </MenuItem>
                                 ))}
                            </Select>
                        </FormControl>
                        )}
                />
             </Grid2>
             <Grid2 size={1}>
                    <Controller
                        name='room'
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <FormControl fullWidth={true} error={!!errors.room} size='small'>
                                <Select
                                    disabled={!isEdit}
                                    id="room"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={(selected) => selected}
                                    MenuProps={MenuProps}
                                    color={!!errors.room ? 'error' : 'primary'}
                                >
                                    {Object.values(Rooms).map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={!!value && value == item} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid2>
                <Grid2 size={2} sx={{textAlign: 'center'}}>
                    {
                        isEdit &&
                        <IconButton aria-label="save" type="submit">
                            <SaveIcon />
                        </IconButton>
                    }
                    {
                        isEdit &&
                        <IconButton 
                            aria-label="cancel" 
                            onClick={() => {
                                setIsEdit(false);
                                // reset();
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                    }
                    {
                        !isEdit &&
                        <IconButton aria-label="edit" onClick={() => setIsEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    }
                    {
                        !isEdit &&
                        <IconButton aria-label="delete" onClick={deleteItem}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </Grid2>
            </Grid2>
            <Divider />    
        </Box>
    )
};

export default StudentTimeItem;