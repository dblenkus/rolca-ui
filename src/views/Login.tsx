import React, { useContext, useState } from 'react';

import { withTranslation, WithTranslation } from 'react-i18next';

import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';

import { Card, CardContent, CardHeader, Link } from '@mui/material';
import Grid from '@mui/material/GridLegacy';

import { userContext } from '../components/Auth/AuthProvider';
import LoginForm, { Errors, Fields } from '../components/Auth/LoginForm';
import { IInputChangeEvent } from '../components/Upload/InputField';

interface LoginViewState {
    fields: Fields;
    errors: Errors;
    redirect: boolean;
}

interface LocationState {
    from?: { pathname: string };
}

const LoginView: React.FC<WithTranslation> = ({ t }) => {
    const user = useContext(userContext);
    const location = useLocation();
    const [state, setState] = useState<LoginViewState>({
        fields: {
            email: '',
            password: '',
        },
        errors: {
            email: null,
            password: null,
            non_field_errors: null,
        },
        redirect: false,
    });

    const handleChange = ({ name, value }: IInputChangeEvent): void => {
        setState((prev) => {
            const fields: Fields = { ...prev.fields, [name]: value };
            const errors: Errors = { ...prev.errors, [name]: null, non_field_errors: null };
            return { ...prev, fields, errors };
        });
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            await user.login(state.fields);
            setState((prev) => ({ ...prev, redirect: true }));
        } catch (error: any) {
            setState((prev) => ({ ...prev, errors: error.response.data }));
        }
    };

    if (state.redirect) {
        const routeState = location.state as LocationState | undefined;
        const from = routeState?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader title={t('login')} titleTypographyProps={{ align: 'center' }} />
                    <CardContent>
                        <LoginForm
                            fields={state.fields}
                            errors={state.errors}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    component={RouterLink}
                                    to="/password-reset/request"
                                    variant="body2"
                                >
                                    {t('forgot_password')}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {t('new_registration')}
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default withTranslation()(LoginView);
