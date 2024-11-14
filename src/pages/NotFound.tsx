import {FC} from 'react';
import {Link} from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

const MyBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh'
})

const NotFound: FC = () => {
    return (
        <MyBox>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid>
                <Typography variant="h1">
                  404
                </Typography>
                <Typography variant="h6">
                  Сторінки, яку ви шукаєте не існує
                </Typography>
                <Link to='/'>
                    <Button variant="contained">Назад на голвну</Button>
                </Link>
              </Grid>
              <Grid>
                <img
                  src="./error-2129569__340.jpg"
                  alt=""
                  width={500} height={250}
                />
              </Grid>
            </Grid>
          </Container>
        </MyBox>
    )
}

export default NotFound;