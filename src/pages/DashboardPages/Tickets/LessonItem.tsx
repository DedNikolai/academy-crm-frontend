import {FC, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Grid2, CircularProgress } from '@mui/material';
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
import { IFormDataLesson, ILesson } from "../../../types/lesson";
import { Status } from "../../../types/lesson-status";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import useUpdateLesson from '../../../api/query/lesson/useUpdateLesson';
import useDeleteLesson from '../../../api/query/lesson/useDeleteLesson copy';
import MenuProps from '../../../utils/MenuProps';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ILessonItem {
    lesson: ILesson,
    copy: Function,
    addNew: Function,
}

const schema = yup
  .object({
    day: yup.mixed<Days>().oneOf(Object.values(Days)).defined(),
    date: yup.date().required('Обовязкове поле'),
    durationMinutes: yup.number().required('Обовязкове поле'),
    room: yup.number().required('Обовязкове поле'),
    time: yup.date().required('Обовязкове поле'),
  })
  .required()

const LessonItem: FC<ILessonItem> = ({lesson, copy, addNew}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const deleteMutation = useDeleteLesson();
    const {handleSubmit, reset, watch, setValue, control, formState: {errors}} = useForm<IFormDataLesson>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...lesson, time: lesson.date}
    });
    const mutation = useUpdateLesson(reset);
    const {mutate, isPending} = mutation;
    const copyLesson = () => {
        const current = new Date(lesson.date);
        const dateAfterWeek = new Date(current.setDate(current.getDate() + 7));
        const {_id, status,...rest} = lesson;
        const copyAfterWeek: ILesson = {...rest, date: dateAfterWeek};
        copy(copyAfterWeek);
        addNew(true);
    }

    const onSubmit: SubmitHandler<IFormDataLesson> = (data) => {
        const updatedLesson: ILesson = {...lesson, ...data, date: data.time};
        mutate(updatedLesson);   
    };

    const watchDate = watch('date');

    useEffect(() => {
        reset(lesson)
    }, [lesson])

    useEffect(() => {
        if (watchDate) {
            setValue('time', new Date(watchDate))
            setValue('day', Object.values(Days)[new Date(watchDate).getDay()])
        }
    }, [watchDate])

    const deleteItem = () => {
        const isAccept: boolean = window.confirm("Видалити урок?");
        if (isAccept) {
            if (lesson._id) {
                deleteMutation.mutate(lesson._id)
            }
        }
    }

    if (isPending || deleteMutation.isPending) return <Box sx={{textAlign: 'center'}}><CircularProgress /></Box>

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
                        name='date'
                        control={control}
                        render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.date} size='small' >
                                     <LocalizationProvider 
                                        dateAdapter={AdapterDayjs} 
                                        adapterLocale='uk'
                                    >
                                        <DatePicker
                                            disabled={!isEdit}
                                            value={value ? dayjs(value) : null}
                                            onChange={onChange}
                                            slotProps={{ 
                                                textField: { 
                                                    size: 'small',
                                                    error: !!errors.date 
                                                } 
                                            }}
                                        />
                                    </LocalizationProvider>
                                    <FormHelperText>{errors.date?.message}</FormHelperText>   
                                </FormControl>
                                )}
                    />        
                </Grid2>
                <Grid2 size={1.5}>    
                    <Controller
                        name='day'
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <FormControl fullWidth={true} error={!!errors.day} size="small">
                                <Select
                                    id="day"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={(selected) => selected}
                                    disabled
                                >
                                    {Object.values(Days).map((name) => (
                                        <MenuItem key={name} value={name}>{name}</MenuItem>
                                        ))}
                                </Select>
                                <FormHelperText>{errors.time?.message}</FormHelperText>
                            </FormControl>
                            )}
                    />
                </Grid2>
                <Grid2 size={1.5}>
                    <Controller
                        name='time'
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <FormControl size="small" error={!!errors.time}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>
                                    <TimePicker
                                        disabled={!isEdit}
                                        value={dayjs(value)}
                                        format="HH:mm"
                                        onChange={onChange}
                                        timeSteps={{hours: 1, minutes: 30}}
                                        timezone={'Europe/Kyiv'}
                                        slotProps={{
                                            textField: { 
                                                size: 'small',
                                                error: !!errors.time 
                                            },
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
                                <FormHelperText>{errors.time?.message}</FormHelperText>   
                            </FormControl>
                            )}
                    />
                </Grid2>
                <Grid2 size={1}>
                    <Controller
                        name='durationMinutes'
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <FormControl fullWidth={true} error={!!errors.durationMinutes} size='small'>
                                <Select
                                    disabled={!isEdit}
                                    id="durationMinutes"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={(selected) => selected}
                                    MenuProps={MenuProps}
                                    color={!!errors.durationMinutes ? 'error' : 'primary'}
                                >
                                    {[30, 60].map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={!!value && value == item} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.durationMinutes?.message}</FormHelperText>
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
                                    id="durationMinutes"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={(selected) => selected}
                                    MenuProps={MenuProps}
                                    color={!!errors.room ? 'error' : 'primary'}
                                >
                                    {[1, 2, 3, 4].map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={!!value && value == item} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.durationMinutes?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Controller
                        name='status'
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <FormControl fullWidth={true} error={!!errors.status} size='small'>
                                <Select
                                    id="status"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={(selected) => selected}
                                    MenuProps={MenuProps}
                                    color={!!errors.status ? 'error' : 'primary'}
                                    disabled={!isEdit}
                                >
                                    {Object.values(Status).map((name) => (
                                    <MenuItem key={name} value={name}>
                                            <Checkbox checked={!!value && value.includes(name)} />
                                            <ListItemText primary={name} />
                                    </MenuItem>
                                    ))}
                                        <MenuItem value={''}>Очистити</MenuItem>                    
                                </Select>
                           <FormHelperText>{errors.status?.message}</FormHelperText>
                        </FormControl>
                        )}
                    />
                </Grid2>
                <Grid2 size={1} textAlign='center'>
                    <Controller
                        name='payout'
                        control={control}
                        render={({field: { onChange, value }}) => (
                                <Checkbox 
                                    checked={value}
                                    onChange={onChange}
                                    disabled={!isEdit}
                                />
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
                                }}
                            >
                                <CancelIcon />
                            </IconButton>
                        }
                        {
                            !isEdit &&
                            <IconButton aria-label="copy" onClick={copyLesson}>
                                <ContentCopyIcon />
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

export default LessonItem;