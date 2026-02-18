import React, { useEffect, useState } from 'react';

import { WithTranslation, withTranslation } from 'react-i18next';

import { isString } from 'lodash';

import { Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/GridLegacy';

import RegisterActivateFailed from '../components/Auth/RegisterActivateFailed';
import RegisterActivateSuccess from '../components/Auth/RegisterActivateSuccess';

import UserService from '../services/UserService';

interface RegisterActivateViewState {
    succeeded: boolean | null;
    redirect: boolean;
}

const RegisterActivateView: React.FC<WithTranslation> = ({ t }) => {
    const location = useLocation();
    const [state, setState] = useState<RegisterActivateViewState>({
        succeeded: null,
        redirect: false,
    });

    useEffect(() => {
        const activate = async (): Promise<void> => {
            const token = queryString.parse(location.search)['token'] || '';
            if (isString(token)) {
                try {
                    await UserService.activateUser({ token });
                    setState({ succeeded: true, redirect: false });
                } catch {
                    setState({ succeeded: false, redirect: false });
                }
            } else {
                setState({ succeeded: false, redirect: false });
            }
        };
        activate();
    }, [location.search]);

    if (state.redirect) {
        return <Navigate to="/login" replace />;
    }

    if (state.succeeded === null) {
        return <></>;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader
                        title={t('account_activation')}
                        titleTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        {state.succeeded ? (
                            <RegisterActivateSuccess
                                onClick={() => setState((prev) => ({ ...prev, redirect: true }))}
                            />
                        ) : (
                            <RegisterActivateFailed />
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default withTranslation()(RegisterActivateView);
