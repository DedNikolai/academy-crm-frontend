import { FC, Fragment, useState } from "react";
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import { CardHeader } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { IPayment, PayTypes } from "../types/payment";
import useUpdatePayAccount from "../api/query/payments/useUpdateAccount";
import * as yup from "yup";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Grid2, CircularProgress, Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm, SubmitHandler, Controller} from 'react-hook-form';

const schema = yup
  .object({
    value: yup.number().min(1, 'Значення має бути більше 0').required('Обовязкове поле'),
    title: yup.string().required('Обовязкове поле')
  })
  .required()

const PayAccountItem: FC<{account: IPayment}> = ({account}) => {
    const theme = useTheme();
    const mutation = useUpdatePayAccount();   
    const {mutate, isPending} = mutation;
    const [isEdit, setIsEdit] = useState<boolean>(false);
        const {register, handleSubmit, formState: {errors}} = useForm<IPayment>({
            mode: 'onSubmit', 
            resolver: yupResolver(schema),
            defaultValues: {...account}
        })
    
        const onSubmit: SubmitHandler<IPayment> = (data) => {
            const expense: IPayment = {...data};
            setIsEdit(false)
            mutate(expense);
        };
    
    return (
                <Grid size={4}>
                    {
                        isPending ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box>
                    :
                    <Card sx={{height: 120}}>
                        <CardHeader
                            avatar={
                                account.title === PayTypes.CASH ?
                                <LocalAtmIcon sx={{fontSize: 60, color: theme.palette.primary.main }}/>
                                :
                                <CreditCardIcon sx={{fontSize: 60, color: theme.palette.primary.main }}/>  
                            }
                            action={
                                <IconButton aria-label="settings" onClick={() => setIsEdit(!isEdit)}>
                                  <EditIcon />
                                </IconButton>
                              }
                            title={
                                <Fragment>
                                    <Typography sx={{fontSize: 18}}>{account.title}</Typography>
                                    {
                                        isEdit ?
                                        <Box
                                            component="form"
                                            onSubmit={handleSubmit(onSubmit)}
                                            noValidate
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '100%',
                                                gap: 2,
                                                marginTop: 1
                                            }}
                                        >
                                        <Grid container spacing={2}>                    
                                            <Grid size={6}>
                                                <FormControl fullWidth={true}  error={!!errors.value}>
                                                    <TextField
                                                        size="small"
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
                                            <Grid size={1} sx={{textAlign: 'right'}}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{bgcolor: theme.status.success, width: theme.button.width}}
                                                >
                                                    Зберегти
                                                </Button>
                                            </Grid>
                                            </Grid>
                                        </Box>
                                        :
                                        <Typography 
                                            component="h2" sx={{fontSize: 32, fontWeight: 'bold'}}
                                        >
                                            {`₴ ${account.value}`}
                                        </Typography>
                                    }
                                </Fragment>
                            }
                        />
                    </Card>
                    }
                </Grid>
    )
};

export default PayAccountItem;