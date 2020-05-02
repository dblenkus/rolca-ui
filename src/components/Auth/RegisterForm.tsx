import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import InputField, { IInputChangeEvent } from '../Field/InputField';

export interface Fields {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    [key: string]: string;
}

export interface Errors {
    first_name: null | Array<string>;
    last_name: null | Array<string>;
    email: null | Array<string>;
    password: null | Array<string>;
    non_field_errors: null | Array<string>;
    [key: string]: any;
}

interface RegisterFormProps {
    fields: Fields;
    errors: Errors;
    onChange: (event: IInputChangeEvent) => void;
    onSubmit: () => Promise<void>;
}

const useStyles = makeStyles(({ spacing }) => ({
    submit: {
        margin: spacing(2, 0, 2),
        padding: spacing(1),
    },
    alert: {
        margin: spacing(2, 0, 0),
    },
}));

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const classes = useStyles();
    const { errors, fields, onChange, onSubmit } = props;

    const getError = (field: string): string => {
        return errors[field] ? errors[field].join(' ') : null;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name="first_name"
                        label="First name"
                        value={fields.first_name}
                        error={getError('first_name')}
                        autoComplete="given-name"
                        autoFocus
                        required
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        name="last_name"
                        label="Last name"
                        value={fields.last_name}
                        error={getError('last_name')}
                        autoComplete="family-name"
                        required
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="email"
                        label="Email"
                        value={fields.email}
                        error={getError('email')}
                        autoComplete="email"
                        required
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="password"
                        label="Password"
                        value={fields.password}
                        error={getError('password')}
                        autoComplete="new-password"
                        type="password"
                        required
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
            {getError('non_field_errors') !== null ? (
                <Alert severity="error" className={classes.alert}>
                    {getError('non_field_errors')}
                </Alert>
            ) : (
                false
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
