import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { Navigate, Route } from 'react-router-dom';
import { validateEmail, validatePassword } from './validation';

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPwd, setShowErrorPwd] = useState(false);
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

 /* const register = () => {
    Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
    }).then((response) => {
        console.log(response);
    })
  }*/

  function validateForm(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const emailValidateResult = validateEmail(email)

    if (!emailValidateResult) {
      setShowErrorEmail("Please enter valid email address");
    } else {
      setShowErrorEmail(false);
    }

    const pwdValidateError = validatePassword(password)

    if (pwdValidateError) {
      setShowErrorPwd(pwdValidateError);
    } else {
      setShowErrorPwd(false);
    }

    return (emailValidateResult && !pwdValidateError)

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error)
    });
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });
    if (validateForm(event)) {
      setShowAlert("Login Successful");
    }
    //<Route path="/" element={ <Navigate to="/booking" /> } />
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Book a Meeting

          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
            <TextField
              error={showErrorEmail}
              helperText={showErrorEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />
            <TextField
              error={showErrorPwd}
              helperText={showErrorPwd}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
