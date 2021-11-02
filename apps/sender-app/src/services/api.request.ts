import axios, { AxiosError } from 'axios';
import { getToken, setToken } from './token-manager';

const TIMEOUT = 30000;

export const authServiceInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function login(payload: {
    email: string;
    password: string;
}): Promise<void> {
    try {
        const response = await authServiceInstance.post<string>(
            '/senders/login',
            payload
        );
        setToken(response.data);
    } catch (error) {
        const errDetails = error as AxiosError;
        if (errDetails?.response?.data.message) {
            throw new Error(errDetails?.response?.data.message);
        } else {
            throw new Error(errDetails.message);
        }
    }
}
export interface UserProfile {
    name: string;
    email: string;
    mobile: string;
}

export async function fetchProfile(): Promise<UserProfile> {
    try {
        const authToken = getToken();
        const response = await authServiceInstance.get<UserProfile>(
            '/senders/profile',
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        const errDetails = error as AxiosError;
        if (errDetails?.response?.data.message) {
            throw new Error(errDetails?.response?.data.message);
        } else {
            throw new Error(errDetails.message);
        }
    }
}
