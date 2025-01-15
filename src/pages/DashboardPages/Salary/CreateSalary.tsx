
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
import { Grid2, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ITeacher } from '../../../types/teacher';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import useTeachers from '../../../api/query/teacher/useGetTeachers';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuProps from '../../../utils/MenuProps';
import { IPayment, PayTypes } from '../../../types/payment';
import { IFormDataSalary } from '../../../types/salary';
import usePayAccounts from '../../../api/query/payments/useGetPayAccounts';
import useCreateSalary from '../../../api/query/salary/useCreateSalary';

const schema = yup
  .object({
    payaccount: yup.string().required('Обовязкове поле'),
    value: yup.number().required('Обовязкове поле'),
    teacher: yup.string().required('Обовязкове поле')
  })
  .required()

const CreateSalary: FC = () => {
    const theme = useTheme();
    const mutation = useCreateSalary();
    const payAccounts = usePayAccounts();
    const {mutate, isPending} = mutation;
    const {data = [], isLoading} = useTeachers()
    const {register, handleSubmit, watch, formState: {errors}, control} = useForm<IFormDataSalary>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        defaultValues: {teacher: ''}
    })

    const watchTeacher= watch('teacher');
    const balance = watchTeacher && data.filter((teacher: ITeacher) => teacher._id === watchTeacher)[0].balance;

    const onSubmit: SubmitHandler<IFormDataSalary> = (data) => {
        const payaccount = payAccounts.data.filter((item: IPayment) => item.title === data.payaccount)[0];
        const salary: IFormDataSalary = {...data, payaccount: payaccount._id};
        mutate(salary);
    };

    return (
        <>
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <AddCircleIcon />
                    </Avatar>
                }
                title={`Виплата зарплати`}
            />
            {
            isLoading || payAccounts.isLoading || isPending ?  <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
            <CardContent>
            <Grid container spacing={1} marginBottom={5}>
                {payAccounts.data.map((item: IPayment) => (
                    <Grid size={3} key={item._id}>
                        <Typography variant='h4'>{item.title + ': ' + item.value}</Typography>
                    </Grid>
                    ))}
            </Grid>       
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
                                    value={value}
                                    onChange={onChange}
                                    renderValue={
                                        (selected) => data.find((teacher:ITeacher) => teacher._id == selected).fullName}
                                    MenuProps={MenuProps}
                                    color={!!errors.teacher ? 'error' : 'primary'}
                                >
                                    {data.map((teacher: ITeacher) => (
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
                                <FormLabel htmlFor="fullName">Баланс</FormLabel>
                            </Box>
                            <TextField
                                name="teacherBalance"
                                type="number"
                                id="teacherBalance"
                                value={balance}
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth={true}  error={!!errors.value}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="fullName">Сума *</FormLabel>
                            </Box>
                            <TextField
                                {...register('value')}
                                error={!!errors.value}
                                helperText={errors.value?.message}
                                name="value"
                                type="number"
                                id="value"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.value ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <Controller
                            name='payaccount'
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <FormControl fullWidth={true} error={!!errors.payaccount}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <FormLabel htmlFor="education">Тип виплати *</FormLabel>
                                    </Box>
                                    <Select
                                        id="payaccount"
                                        value={value || ''}
                                        onChange={onChange}
                                        renderValue={(selected) => PayTypes[selected as keyof typeof PayTypes]}
                                        MenuProps={MenuProps}
                                        color={!!errors.payaccount ? 'error' : 'primary'}
                                    >
                                        {Object.keys(PayTypes).map((key) => (
                                            <MenuItem key={key} value={key}>
                                                <Checkbox checked={!!value && value === key} />
                                                <ListItemText primary={PayTypes[key as keyof typeof PayTypes]} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                <FormHelperText>{errors.payaccount?.message}</FormHelperText>
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

export default CreateSalary;
