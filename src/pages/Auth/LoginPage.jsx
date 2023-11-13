import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginLogo from '../../assets/images/login.jpg';
import { useDispatch } from './../../../node_modules/react-redux/es/hooks/useDispatch';
import { login } from '../../services/AuthServices/authSlice';
import { setToken } from '../../services/AuthServices/tokenSlice';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; 
import { CircularProgress } from '@mui/material';


const defaultTheme = createTheme();

export default function LoginPage() {
        const dispatch = useDispatch();
        const [fieldsName, setfieldsName] = useState('');
        const [fieldsNameError, setfieldsNameError] = useState(false);
        const [loading, setLoading] = useState(false);

        const handelFillFields = () => {
                // Perform validation
                if (fieldsName.trim() === '') {
                        setfieldsNameError(true);
                } else {
                        setfieldsNameError(false);
                }
        };
        const handleSubmit = async (event) => {
                event.preventDefault();
                setLoading(true);
                const data = new FormData(event.currentTarget);

                const credentials = {
                        username: data.get('username'),
                        password: data.get('password'),
                };

                try {
                        const resultAction = await dispatch(login(credentials));
                        if (login.fulfilled.match(resultAction)) {
                                const token = resultAction.payload.token;
                                dispatch(setToken(token)); // Dispatch the token to your Redux store
                                window.location.href = '/'; // Redirect or perform other actions upon successful login
                        } else if (login.rejected.match(resultAction)) {
                                toast.error('Email and Password not matched.');
                        }
                } catch (error) {
                        toast.error('An error occurred during login.');
                } finally {
                        setLoading(false);
                }
        };


        return (
                <ThemeProvider theme={defaultTheme}>
                        <Box sx={{
                                display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'flex',

                                }
                        }}>


                                <Grid container component="main" sx={{ height: '100vh' }}>
                                        <CssBaseline />

                                        <Grid item xs={12} sm={8} md={5} elevation={6} square>
                                                <Box
                                                        sx={{
                                                                my: 15,
                                                                mx: 4,
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                        }}
                                                >
                                                        <Avatar sx={{ m: 1, bgcolor: '#272356' }}>
                                                                <LockOutlinedIcon />
                                                        </Avatar>
                                                        <Typography component="h1" variant="h5" sx={{
                                                                fontFamily: 'Cairo',
                                                        }}>
                                                                تسجيل الدخول الى المركز
                                                        </Typography>
                                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                                                <TextField
                                                                        margin="normal"
                                                                        required
                                                                        fullWidth
                                                                        id="username"
                                                                        label="اسم المستخدم"
                                                                        name="username"
                                                                        autoComplete="email"
                                                                        autoFocus
                                                                        error={fieldsNameError}
                                                                        helperText={fieldsNameError ? ' الحقل مطلوب' : ''}
                                                                        onChange={(e) => {
                                                                                setfieldsName(e.target.value);
                                                                                if (e.target.value.trim() !== '') {
                                                                                        setfieldsNameError(false);
                                                                                }
                                                                        }}
                                                                        InputLabelProps={{
                                                                                style: {
                                                                                        fontFamily: 'Cairo',
                                                                                        fontSize: '12px',

                                                                                },
                                                                        }}
                                                                />
                                                                <TextField
                                                                        margin="normal"
                                                                        required
                                                                        fullWidth
                                                                        name="password"
                                                                        label="كلمة المرور"
                                                                        type="password"
                                                                        id="password"
                                                                        error={fieldsNameError}
                                                                        helperText={fieldsNameError ? ' الحقل مطلوب' : ''}
                                                                        onChange={(e) => {
                                                                                setfieldsName(e.target.value);
                                                                                if (e.target.value.trim() !== '') {
                                                                                        setfieldsNameError(false);
                                                                                }
                                                                        }}
                                                                        InputLabelProps={{
                                                                                style: {
                                                                                        fontFamily: 'Cairo',
                                                                                        fontSize: '12px',

                                                                                },
                                                                        }}
                                                                />
                                                                {loading ? (
                                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                                <CircularProgress />
                                                                        </Box>
                                                                ) : (
                                                                        <Button
                                                                                onClick={handelFillFields}
                                                                                type="submit"
                                                                                fullWidth
                                                                                variant="contained"
                                                                                sx={{
                                                                                        mt: 3, mb: 2, backgroundColor: '#272356', fontFamily: 'Cairo',
                                                                                        '&:hover': {
                                                                                                backgroundColor: '#303F9F',
                                                                                        },
                                                                                }}
                                                                        >
                                                                                تسجيل الدخول
                                                                        </Button>
                                                                )}
                                                        </Box>
                                                </Box>
                                        </Grid>
                                        <Grid
                                                item
                                                xs={false}
                                                sm={4}
                                                md={7}
                                                sx={{
                                                        backgroundImage: `url(${loginLogo})`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                }}
                                        />
                                </Grid>
                                <ToastContainer />
                        </Box>
                </ThemeProvider>
        );
}