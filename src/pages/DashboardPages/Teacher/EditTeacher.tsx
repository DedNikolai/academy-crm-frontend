import {FC, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {useForm, SubmitHandler, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import EditIcon from '@mui/icons-material/Edit';
// import { IUser } from '../../types/user';
import { Grid2, CircularProgress } from '@mui/material';
import {useParams, Navigate} from 'react-router-dom';
// import useGetUser from '../../api/query/user/useGetUser';
// import useUpdateUser from '../../api/query/user/useUpdateUser';
import { useTheme } from '@mui/material/styles';
import { ITeacher } from '../../../types/teacher';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  

type Params = {
    id: string;
}

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Мінімум 3 символи').required('Email is required'),
    email: yup.string().email('Не валідний Email').required('Обовязкове поле'),
    phone: yup.string().required('Обовязкове поле'),
    subjects: yup.array().required('Обовязкове поле'),
    age: yup.number().required('Обовязкове поле'),
    education: yup.string().optional(),
    birthday: yup.date().optional(),
    worktimes: yup.array().optional()
  })
  .required()

const EditTeacher: FC = () => {
    const theme = useTheme();
    const params = useParams<Params>();
    // const {data, isLoading, isFetched} = useGetUser(params.id);
    // const mutation = useUpdateUser(params.id);
    // const {mutate, isPending} = mutation;
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ITeacher>({
        mode: 'onSubmit', 
        resolver: yupResolver(schema),
        // defaultValues: {...data}
    })
    
    const onSubmit: SubmitHandler<ITeacher> = (user) => {
        // const updatedAdmin: IUser = {...data, ...user}
        // mutate(updatedAdmin);
        reset();
    };

    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    // useEffect(() => {
    //     reset(data);
    // }, [data])

    // if (!data && isFetched) return <Navigate to='/404' />

    return (
        <>
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <EditIcon />
                    </Avatar>
                }
                title='Редагувати дані вчителя'
            />
            {
            // isLoading || isPending ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
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
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="fullName">Ім'я</FormLabel>
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
                        <FormControl fullWidth={true}>
                            <FormLabel htmlFor="age">Вік</FormLabel>
                                <TextField
                                    {...register('age')}
                                    error={!!errors.age}
                                    helperText={errors.age?.message}
                                    id="age"
                                    type="number"
                                    name="age"
                                    autoComplete="age"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={!!errors.age ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'age' }}
                                />
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel htmlFor="birthday">Дата Народження</FormLabel>
                                <TextField
                                    {...register('birthday')}
                                    error={!!errors.birthday}
                                    helperText={errors.email?.message}
                                    id="birthday"
                                    type="date"
                                    name="birthday"
                                    autoComplete="birthday"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={!!errors.birthday ? 'error' : 'primary'}
                                    sx={{ ariaLabel: 'birthday' }}
                                />
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="phone">Телефон</FormLabel>
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
                        <FormControl fullWidth={true}>
                            <FormLabel htmlFor="email">Email</FormLabel>
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
                        <FormControl fullWidth={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="education">Предмети</FormLabel>
                            </Box>
                            <Select
                                {...register('subjects')}
                                id="subjects"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.includes(name)} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                required
                                fullWidth
                                variant="outlined"
                                color={!!errors.education ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Grid>
                {/* <FormControl>
                    <FormLabel htmlFor="email">Предмети</FormLabel>
                        <TextField
                            {...register('subjects')}
                            error={!!errors.subjects}
                            helperText={errors.subjects?.message}
                            id="subjects"
                            type="text"
                            name="subjects"
                            autoComplete="subjects"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={!!errors.subjects ? 'error' : 'primary'}
                            sx={{ ariaLabel: 'email' }}
                        />
                </FormControl> */}
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

export default EditTeacher;