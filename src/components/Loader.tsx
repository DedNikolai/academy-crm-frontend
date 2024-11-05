import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SignInContainer from './SignInContainer';

export default function Loader() {
  return (
    <SignInContainer>
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    </SignInContainer>
  );
}