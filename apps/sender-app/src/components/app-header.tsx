import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function AppHeader(): ReactElement {
    return (
        <AppBar position="relative">
            <Toolbar>
                <LocalShippingIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    Parcel Delivery
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
