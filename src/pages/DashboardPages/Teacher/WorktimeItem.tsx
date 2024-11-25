import { IWorktime } from "../../../types/teacher";
import {FC, useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ITeacher } from '../../../types/teacher';
import { Grid2, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import useUpdateWorktime from "../../../api/query/worktime/useUpdateWorktime";
import useDeleteWorktime from "../../../api/query/worktime/useDeleteWorktime copy";

dayjs.extend(utc);
dayjs.extend(timezone);

interface IWorktimeItem {
    data: IWorktime
}

const schema = yup
  .object({
    day: yup.mixed<Days>().oneOf(Object.values(Days)).defined(),
    startTime: yup.date().required('Обовязкове поле'),
    endTime: yup.date().required('Обовязкове поле'),
    teacher: yup.mixed<ITeacher>()
  })
  .required()

const WorkTimeItem: FC<IWorktimeItem> = ({data}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const mutation = useUpdateWorktime();
    const deleteMutation = useDeleteWorktime();
    const {mutate, isPending} = mutation;
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IWorktime>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {...data}
    })

    const onSubmit: SubmitHandler<IWorktime> = (data) => {
        const updatedWorktime: IWorktime = {...data};
        mutate(updatedWorktime);    
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
            <Grid2 size={3}>    
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
                                renderValue={(selected) => selected}
                            >
                                {Object.values(Days).map((name) => (
                                    <MenuItem key={name} value={name}>{name}</MenuItem>
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
            <Grid2 size={3}>
                <Controller
                    name='endTime'
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
                <Grid2 size={3} sx={{textAlign: 'right'}}>
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
                                reset();
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

export default WorkTimeItem;