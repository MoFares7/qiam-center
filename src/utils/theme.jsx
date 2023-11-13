// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Change this to your desired primary color
    },
    secondary: {
      main: '#f50057', // Change this to your desired secondary color
    },
    h1: {
      fontFamily: 'Cairo, sans-serif',
    }
  },
});

export default theme;
