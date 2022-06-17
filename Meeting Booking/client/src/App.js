import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginPage';
import Appointment from './components/appointmentPage/appointment';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Router>
      <Routes>
        <Route
          path='/'
          element={ <LoginForm /> }
        />
        <Route
          path='/booking'
          element={ <Appointment /> }
        />
      </Routes>
    </Router>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
