import React, { createContext, ReactElement, useContext } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, UserProfile } from '../services/api.request';

interface AuthContextProps {
    user?: UserProfile;
    isFetchingProfile: boolean;
    refetchProfile: () => Promise<QueryObserverResult<UserProfile, unknown>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: ReactElement;
}): ReactElement {
    const navigate = useNavigate();

    const {
        isLoading: isFetchingProfile,
        data,
        refetch,
    } = useQuery('userProfile', fetchProfile, {
        onError: () => {
            navigate('/login', { replace: true });
        },
        enabled: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
    });

    const value = {
        user: data,
        isFetchingProfile,
        refetchProfile: refetch,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            'You probably forgot to wrap in <AuthContextProvider>.'
        );
    }
    return context;
};
