export const passwordErrorMessage =
    'Password should be a minimum of eight characters, should have at least one lower case and one number character';

export const emailErrorMessage = 'Invalid Email';

export function validatePassword(password: string): boolean {
    // eslint-disable-next-line prefer-regex-literals
    const expToCheck = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.{8,})');
    return expToCheck.test(password);
}

export function validateEmail(email: string): boolean {
    const expToCheck = /\S+@\S+\.\S+/;
    return expToCheck.test(email);
}
