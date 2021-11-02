import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppHeader } from './app-header';
import { AppRouter } from './app-router';
import { AuthProvider } from './auth-provider';

const queryClient = new QueryClient();

export function App(): ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <>
                    <AppHeader />
                    <AppRouter />
                </>
            </AuthProvider>
        </QueryClientProvider>
    );
}
