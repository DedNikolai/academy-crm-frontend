
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
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuProps from '../../../utils/MenuProps';
import { IPayment, IPaymentFromServer } from '../../../types/payment';
import usePayAccounts from '../../../api/query/payments/useGetPayAccounts';
import useCreateExpense from '../../../api/query/expense/useCreateExpense';
import { IFormDataExpense } from '../../../types/expense';

const schema = yup
  .object({
    payaccount: yup.string().required('Обовязкове поле'),
    value: yup.number().min(1, 'Значення має бути більше 0').required('Обовязкове поле'),
    title: yup.string().required('Обовязкове поле')
  })
  .required()

const CreateExpense: FC = () => {
    const theme = useTheme();
    const mutation = useCreateExpense();
    const payAccounts = usePayAccounts();
    const {mutate, isPending} = mutation;
    const {register, handleSubmit, formState: {errors}, control} = useForm<IFormDataExpense>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<IFormDataExpense> = (data) => {
        const expense: IFormDataExpense = {...data};
        mutate(expense);
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
                title={`Створити витрату`}
            />
            {
            payAccounts.isLoading || isPending ?  <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
            <CardContent>
            <Grid container spacing={1} marginBottom={5}>
                {payAccounts.data.map((item: IPayment) => (
                    <Grid size={3} key={item._id}>
                        <Typography variant='h4'>{item.title  + ': ' + item.value}</Typography>
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
                    <Grid size={6}>
                        <FormControl fullWidth={true}  error={!!errors.value}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="fullName">Назва *</FormLabel>
                            </Box>
                            <TextField
                                {...register('title')}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                name="title"
                                type="text"
                                id="title"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.title ? 'error' : 'primary'}
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
                                        renderValue={(selected) => selected ? payAccounts.data.filter((item: IPaymentFromServer) => item._id === selected)[0].title : ''}
                                        MenuProps={MenuProps}
                                        color={!!errors.payaccount ? 'error' : 'primary'}
                                    >
                                        {payAccounts.data.map((key: IPaymentFromServer) => (
                                            <MenuItem key={key._id} value={key._id}>
                                                <Checkbox checked={!!value && value === key._id} />
                                                <ListItemText primary={key.title} />
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

export default CreateExpense;
