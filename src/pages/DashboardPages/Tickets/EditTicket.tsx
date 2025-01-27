
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
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Grid2, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ITeacher } from '../../../types/teacher';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IEditTicket, ITicket, ITicketFromServer } from '../../../types/ticket';
import useUpdateTicket from '../../../api/query/ticket/useUpdateTicket';
import { Status } from '../../../types/lesson-status';
import MenuProps from '../../../utils/MenuProps';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IPaymentFromServer } from '../../../types/payment';
import { Subjects } from '../../../types/subjects';
import usePayAccounts from '../../../api/query/payments/useGetPayAccounts';
import { TicketNames } from '../../../constants/app';


const schema = yup
  .object({
    title: yup.string().min(3, 'Мінімум 3 символи').required('Обовязкове поле'),
    subject: yup.string().required('Обовязкове поле'),
    startDate: yup.date().required('Обовязкове поле'),
    endDate: yup.date().required('Обовязкове поле'),
    price: yup.number().min(1, 'Значення має бути більше 0').required('Обовязкове поле'),
    generalAmount: yup.number().required('Обовязкове поле'),
    teacher: yup.string().required('Обовязкове поле'),
    isPaid: yup.boolean().required('Обовязкове поле'),
    // payType: yup.string().when('isPaid', ([isPaid], schema) => {
    //     return isPaid ? schema.required('Виберіть тип оплати') : schema;
    // })
  })
  .required()

const EditTicket: FC<{ticket: ITicketFromServer, teachers: ITeacher[]}> = ({ticket, teachers}) => {
    const theme = useTheme();
    const mutation = useUpdateTicket();
    const payAccounts = usePayAccounts();

    const {mutate, isPending} = mutation;
    const {register, watch, setValue, handleSubmit, formState: {errors}, control} = useForm<IEditTicket>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {
            ...ticket, 
            student: ticket.student._id, 
            teacher: ticket.teacher._id,
        }
    })

    const onSubmit: SubmitHandler<IEditTicket> = (value) => {
        const updated: ITicket = {
            ...value, 
            _id: ticket._id, 
            student: ticket.student._id,
            
        }
        mutate(updated);
    };

    const watchIsPaid = watch('isPaid');

    useEffect(() => {
        if (!watchIsPaid) {
            setValue('payType', '')
        }
    }, [watchIsPaid])

    return (
        <>
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <AddCircleIcon />
                    </Avatar>
                }
                title={`абонемент ${ticket.student.fullName}`}
            />
            {
            isPending || payAccounts.isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
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
                    <Controller
                                name='title'
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <FormControl fullWidth={true} error={!!errors.title}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <FormLabel htmlFor="education">Предмет *</FormLabel>
                                    </Box>
                                    <Select
                                        id="title"
                                        value={value}
                                        onChange={onChange}
                                        renderValue={(selected) => TicketNames[selected as keyof typeof TicketNames]}
                                        MenuProps={MenuProps}
                                        color={!!errors.title ? 'error' : 'primary'}
                                    >
                                        {Object.keys(TicketNames).map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={!!value && value == name} />
                                                <ListItemText primary={TicketNames[name as keyof typeof TicketNames]} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.title?.message}</FormHelperText>
                                </FormControl>
                                )}
                        />
                    </Grid>
                    <Grid size={4}>
                        <Controller
                                name='startDate'
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <FormControl fullWidth={true} error={!!errors.startDate}>
                                        <FormLabel htmlFor="startDate">Дата початку дії *</FormLabel>
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
                        <Controller
                             name="endDate"
                             control={control}
                             render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.endDate}>
                                    <FormLabel htmlFor="startDate">Дата закінчення *</FormLabel>
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
                        <FormControl fullWidth={true}  error={!!errors.price}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="fullName">Вартість *</FormLabel>
                            </Box>
                            <TextField
                                {...register('price')}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                name="price"
                                type="number"
                                id="price"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.price ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={3}>    
                        <FormControl fullWidth={true}  error={!!errors.generalAmount}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="fullName">Кількість занять *</FormLabel>
                            </Box>
                            <TextField
                                {...register('generalAmount')}
                                error={!!errors.generalAmount}
                                helperText={errors.generalAmount?.message}
                                name="generalAmount"
                                type="number"
                                id="generalAmount"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.generalAmount ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <Controller
                            name='subject'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.subject}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormLabel htmlFor="education">Предмет *</FormLabel>
                                </Box>
                                <Select
                                    id="subject"
                                    value={value}
                                    onChange={onChange}
                                    renderValue={(selected) => Subjects[selected as keyof typeof Subjects]}
                                    MenuProps={MenuProps}
                                    color={!!errors.subject ? 'error' : 'primary'}
                                >
                                    {ticket.student.subjects.map((name: string) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={!!value && value == name} />
                                            <ListItemText primary={Subjects[name as keyof typeof Subjects]} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.subject?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={3}>
                        <Controller
                            name='teacher'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.teacher}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormLabel htmlFor="education">Вчитель *</FormLabel>
                                </Box>
                                <Select
                                    id="teacher"
                                    value={value || ''}
                                    onChange={onChange}
                                    renderValue={
                                        (selected) => teachers.find((teacher:ITeacher) => teacher._id == selected)?.fullName}
                                    MenuProps={MenuProps}
                                    color={!!errors.teacher ? 'error' : 'primary'}
                                >
                                    {ticket.student.teachers.map((teacher: ITeacher) => (
                                        <MenuItem key={teacher._id} value={teacher._id}>
                                            <Checkbox checked={
                                                !!value && teacher._id == value}
                                             />
                                            <ListItemText primary={teacher.fullName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.teacher?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={3}>    
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="usedAmount">Використані заняття *</FormLabel>
                            </Box>
                            <TextField
                                name="usedAmount"
                                type="number"
                                id="usedAmount"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                disabled
                                value={ticket.lessons?.filter(lesson => Status[lesson.status as keyof typeof Status] === Status.SUCCESS).length}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={3}>    
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="transferred">Перенесених занять *</FormLabel>
                            </Box>
                            <TextField
                                name="transferred"
                                type="number"
                                id="transferred"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                disabled
                                value={ticket.lessons?.filter(lesson => Status[lesson.status as keyof typeof Status] === Status.TRANSFERED).length}
                            />
                        </FormControl>
                    </Grid>
                    <Grid2 size={3} display='flex' alignItems='center'>
                        <Controller
                            name='isPaid'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControlLabel control={
                                    <Checkbox 
                                        checked={value}
                                        onChange={onChange}
                                    />
                                } 
                            label="Оплата" 
                        />
                        )}
                        />
                    </Grid2>
                    <Grid size={3}>
                        <Controller
                            name='payType'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.payType}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <FormLabel htmlFor="education">Тип Оплати</FormLabel>
                                    </Box>
                                    <Select
                                        id="payType"
                                        value={value || ''}
                                        onChange={onChange}
                                        renderValue={(selected) => selected ? payAccounts.data.filter((item: IPaymentFromServer) => item._id === selected)[0].title : ''}
                                        MenuProps={MenuProps}
                                        color={!!errors.payType ? 'error' : 'primary'}
                                        disabled={!watchIsPaid}
                                    >
                                        {payAccounts.data.map((key: IPaymentFromServer) => (
                                            <MenuItem key={key._id} value={key._id}>
                                                <Checkbox checked={!!value && value === key._id} />
                                                <ListItemText primary={key.title} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                <FormHelperText>{errors.payType?.message}</FormHelperText>
                            </FormControl>
                            )}
                        />
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

export default EditTicket;