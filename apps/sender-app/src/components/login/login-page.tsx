import React, { ReactElement } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import { LoginState } from './login.reducer';
import { Spinner } from '../spinner';

interface LoginUIProps extends LoginState {
    error: Error | null;
    isLoading: boolean;
    emailChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitHandler: () => void;
}

export function LoginPage({
    email,
    emailError,
    emailChangeHandler,
    password,
    passwordError,
    passwordChangeHandler,
    submitHandler,
    error,
    isLoading,
}: LoginUIProps): ReactElement {
    return (
        <Container maxWidth="sm">
            <Spinner open={isLoading} />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && error.message && (
                    <Typography color="error" component="h6" sx={{ mt: 1 }}>
                        {error.message}
                    </Typography>
                )}
                <Box component="div" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={emailChangeHandler}
                        helperText={emailError}
                        error={!!emailError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={passwordChangeHandler}
                        helperText={passwordError}
                        error={!!passwordError}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={submitHandler}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
