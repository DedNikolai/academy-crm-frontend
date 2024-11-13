import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container } from '@mui/material';
import {Link, Navigate, useParams, useSearchParams} from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import SignInContainer from '../components/SignInContainer';
import Loader from '../components/Loader';
import CustomCard from '../components/CustomCard';
import { verifyEmail } from '../api/user';

type Params = {
    id: string;
}

export default function VerifyEmail() {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  const {id} = useParams<Params>();  

  useEffect(() => {
    if(token && id) {
        setIsLoading(true);
        verifyEmail(id, token).then(res => {
            if(res) {
                setConfirmed(true);
            }
        }).finally(() => setIsLoading(false))
    }
  }, [])


  if (authContext?.user) return <Navigate to='/dashboard/main'/>
  if (isLoading) return <Loader />

  return (
    <Container component="main">
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <CustomCard variant="outlined">
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
            {confirmed ? 'Пошту успішно підтверджено' : 'Не вдалося підтвердити пошту'}
          </Typography>
          {
            confirmed && 
            <Link 
                to='/'
                className='link__decorated'
            >
                Вхід
            </Link>
          }
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          </Box>
        </CustomCard>
      </SignInContainer>
    </Container>
  )
}