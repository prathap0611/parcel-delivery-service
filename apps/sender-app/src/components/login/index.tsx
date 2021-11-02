import React, { ReactElement, useCallback, useReducer } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../services/api.request';
import { loginReducer } from './login.reducer';
import { LoginPage } from './login-page';

export function Login(): ReactElement {
    const navigate = useNavigate();
    const location = useLocation();

    const locationState = location.state as { from: Location };
    const from = locationState ? locationState.from.pathname : '/';

    const [{ email, password, emailError, passwordError }, dispatch] =
        useReducer(loginReducer, {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        });

    const {
        mutate: invokeLogin,
        isLoading,
        error,
    } = useMutation(login, {
        onSuccess: () => {
            navigate(from, { replace: true });
        },
    });

    const emailChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'SET_EMAIL', email: event.target.value });
        },
        [dispatch]
    );

    const passwordChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'SET_PASSWORD', password: event.target.value });
        },
        [dispatch]
    );

    const submitHandler = useCallback(async () => {
        if (email && password) {
            try {
                invokeLogin({ email, password });
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch({ type: 'VALIDATE_INPUTS', email, password });
        }
    }, [email, invokeLogin, password]);

    return (
        <LoginPage
            email={email}
            emailError={emailError}
            emailChangeHandler={emailChangeHandler}
            password={password}
            passwordError={passwordError}
            passwordChangeHandler={passwordChangeHandler}
            submitHandler={submitHandler}
            error={error as Error}
            isLoading={isLoading}
        />
    );
}
