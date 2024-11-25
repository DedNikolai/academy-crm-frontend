import {FC} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue, green } from '@mui/material/colors';
import { ukUA } from '@mui/x-date-pickers/locales';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      error: string;
      success: string;
    };

    button: {
      width: string
    }
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      error?: string;
      success?: string
    };

    button: {
      width?: string
    }
  }
}


const theme = createTheme({
  palette: {
    primary: {
        main: blue[600]
    }
  },

  status: {
    error: red[500],
    success: green[300]
  },

  button: {
    width: '150px'
  }
}, ukUA);

interface IThemeProps {
    children: React.ReactNode
}

const CustomTheme: FC<IThemeProps> = ({children}) =>  {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default CustomTheme;
