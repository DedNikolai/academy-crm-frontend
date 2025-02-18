import { IWorktime } from "../../../types/teacher";
import {FC} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ITeacher } from '../../../types/teacher';
import { Grid2, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
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
import useCreateWorktime from "../../../api/query/worktime/useCreasteWorkTimer";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ICreateWorktime {
    closeForm: Function,
    teacher: ITeacher
}

const schema = yup
  .object({
    day: yup.string().required(),
    startTime: yup.date().required('Обовязкове поле'),
    endTime: yup.date().required('Обовязкове поле'),
    teacher: yup.mixed<ITeacher>().optional()
  })
  .required()

const CreateWorkTime: FC<ICreateWorktime> = ({closeForm, teacher}) => {
    const mutation = useCreateWorktime(closeForm);
    const {mutate, isPending} = mutation;
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IWorktime>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {
            startTime: new Date('1970-01-01T00:00:00'),
            endTime: new Date('1970-01-01T00:00:00'),
            teacher,
        }
    })
    
    const onSubmit: SubmitHandler<IWorktime> = (data) => {
        const worktime: IWorktime = {...data, teacher};
        mutate(worktime);
        reset();
    };

    const getDayValue = (key: string) => {
        let day = '';
        Object.keys(Days).forEach(item => {
            if (key === item) {
                day = Days[item as keyof typeof Days];
            }
        })
    
        return day;
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
            <Grid2 size={3}>    
                <Controller
                    name='day'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl fullWidth={true} error={!!errors.day} size="small">
                            <Select
                                id="day"
                                value={value || ''}
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
             <Grid2 size={3}>
                <Controller
                    name='startTime'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>
                                <TimePicker
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
            <Grid2 size={3}>
                <Controller
                    name='endTime'
                    control={control}
                    render={({field: { onChange, value }}) => (
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>
                                <TimePicker
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
                <Grid2 size={3} sx={{textAlign: 'right'}}>
                    <IconButton aria-label="save" type="submit">
                        <SaveIcon />
                    </IconButton>
                    <IconButton aria-label="cancel" onClick={() =>closeForm(false)}>
                        <CancelIcon />
                    </IconButton>
                </Grid2>
            </Grid2>
            <Divider />    
        </Box>
    )
};

export default CreateWorkTime;