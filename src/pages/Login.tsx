import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container } from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import SignInContainer from '../components/SignInContainer';
import {useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IAuth } from '../types/user';
import { logIn } from '../api/user';
import Loader from '../components/Loader';

const schema = yup
  .object({
    email: yup.string().email('Invalid Email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required()

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));



export default function SignIn() {
  const authContext = useContext(AuthContext);
  const {register, handleSubmit, reset, formState: {errors}} = useForm<IAuth>({mode: 'onSubmit', resolver: yupResolver(schema)})
  
  const onSubmit: SubmitHandler<IAuth> = (data) => {
    authContext?.setIsUserLoading(true);
    logIn(data).then(res => {
      if (res) authContext?.setUser(res.user)
    }).finally(() => authContext?.setIsUserLoading(false))
    reset()
  };

  if (authContext?.user) return <Navigate to='/dashboard/main'/>
  if (authContext?.isUserLoading) return <Loader />

  return (
    <Container component="main">
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Avatar sx={{ my: 1, mb: 2, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
          </Box>  
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
          >
            Вхід
          </Typography>
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
            <FormControl>
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
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Пароль</FormLabel>
              </Box>
              <TextField
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={!!errors.password ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Увійти
            </Button>
          </Box>
          <Link 
            to='/forgot-password'
            className='link__decorated'
          >Забули пароль ?
          </Link>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          </Box>
        </Card>
      </SignInContainer>
    </Container>
  );
}