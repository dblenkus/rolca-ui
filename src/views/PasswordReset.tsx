import React, { useState } from 'react';

import { withTranslation, WithTranslation } from 'react-i18next';

import { isString } from 'lodash';

import { Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/GridLegacy';

import PasswordResetForm, { Errors, Fields } from '../components/Auth/PasswordResetForm';
import PasswordResetSuccess from '../components/Auth/PasswordResetSuccess';
import { IInputChangeEvent } from '../components/Upload/InputField';

import UserService from '../services/UserService';

interface PasswordResetState {
    fields: Fields;
    errors: Errors;
    done: boolean;
    redirect: boolean;
}

const PasswordResetView: React.FC<WithTranslation> = ({ t }) => {
    const location = useLocation();
    const [state, setState] = useState<PasswordResetState>({
        fields: {
            new_password: '',
        },
        errors: {
            new_password: null,
            non_field_errors: null,
        },
        done: false,
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
        const token = queryString.parse(location.search)['token'] || '';
        if (isString(token)) {
            try {
                await UserService.passwordReset({ ...state.fields, token });
                setState((prev) => ({ ...prev, done: true }));
            } catch (error: any) {
                setState((prev) => ({ ...prev, errors: error.response.data }));
            }
        } else {
            setState((prev) => ({
                ...prev,
                errors: { ...prev.errors, non_field_errors: ['Invalid password reset token.'] },
            }));
        }
    };

    if (state.redirect) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader
                        title={t('password_reset')}
                        titleTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        {state.done ? (
                            <PasswordResetSuccess
                                onClick={() => setState((prev) => ({ ...prev, redirect: true }))}
                            />
                        ) : (
                            <PasswordResetForm
                                fields={state.fields}
                                errors={state.errors}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default withTranslation()(PasswordResetView);
