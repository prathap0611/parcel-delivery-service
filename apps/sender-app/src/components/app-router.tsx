import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from './auth-guard';
import { Home } from './home';
import { Login } from './login';

export function AppRouter(): ReactElement {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    }
                ></Route>
            </Routes>
        </>
    );
}
