import {
    emailErrorMessage,
    validateEmail,
    validatePassword,
    passwordErrorMessage,
} from '../../services/validation';

export interface LoginState {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
}

type LoginAction =
    | { type: 'SET_EMAIL'; email: string }
    | { type: 'SET_PASSWORD'; password: string }
    | { type: 'VALIDATE_INPUTS'; email: string; password: string };

export function loginReducer(
    state: LoginState,
    action: LoginAction
): LoginState {
    switch (action.type) {
        case 'SET_EMAIL': {
            return {
                ...state,
                email: action.email,
                emailError: validateEmail(action.email)
                    ? ''
                    : emailErrorMessage,
            };
        }

        case 'SET_PASSWORD': {
            return {
                ...state,
                password: action.password,
                passwordError: validatePassword(action.password)
                    ? ''
                    : passwordErrorMessage,
            };
        }

        case 'VALIDATE_INPUTS': {
            return {
                ...state,
                emailError: validateEmail(action.email)
                    ? ''
                    : emailErrorMessage,
                passwordError: validatePassword(action.password)
                    ? ''
                    : passwordErrorMessage,
            };
        }
        default:
            return state;
    }
}
