import React, { ReactElement, useEffect } from 'react';
import { useAuthContext } from './auth-provider';
import { Spinner } from './spinner';

export function AuthGuard({
    children,
}: {
    children: ReactElement;
}): ReactElement {
    const auth = useAuthContext();

    useEffect(() => {
        auth.refetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.refetchProfile]);

    if (auth.isFetchingProfile) {
        return <Spinner open={auth.isFetchingProfile}></Spinner>;
    }

    return children;
}
