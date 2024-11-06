import {useContext, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Container } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import CustomCard from '../components/CustomCard';
import SignInContainer from '../components/SignInContainer';
import {useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { AuthContext } from '../components/AuthProvider';
import Loader from '../components/Loader';
import { forgotPassword } from '../api/user';

const schema = yup
  .object({
    email: yup.string().email('Invalid Email format').required('Email is required'),
  })
  .required()

export default function ForgotPassword(props: { disableCustomTheme?: boolean }) {
  const authContext = useContext(AuthContext);
  const {register, handleSubmit, reset, formState: {errors}} = useForm<{email: string}>({mode: 'onSubmit', resolver: yupResolver(schema)})
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<{email: string}> = (data) => {
    setIsLoading(true);
    forgotPassword(data).finally(() => setIsLoading(false))
    reset()
  };

  if (authContext?.user) return <Navigate to='/dashboard/main'/>
  if (isLoading) return <Loader />


  return (
    <Container component="main">
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <CustomCard variant="outlined">
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Avatar sx={{ my: 1, mb: 2, bgcolor: 'primary.main' }}>
                <VpnKeyIcon />
            </Avatar>
          </Box>  
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: '18px', textAlign: 'center' }}
          >
            Введіть електронну адресу для вдновлення пароля
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
                color={errors.email ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Нідіслати
            </Button>
          </Box>
          <Link to='/' className='link__decorated'>На головну</Link>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          </Box>
        </CustomCard>
      </SignInContainer>
    </Container>
  );
}