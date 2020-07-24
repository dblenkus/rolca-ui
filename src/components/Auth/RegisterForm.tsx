import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import InputField, { IInputChangeEvent } from '../Upload/InputField';

import { authStyles } from '../../styles/general';

export interface Fields {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    [key: string]: string;
}

export interface Errors {
    first_name: null | Array<string>;
    last_name: null | Array<string>;
    email: null | Array<string>;
    password: null | Array<string>;
    address: null | Array<string>;
    city: null | Array<string>;
    postal_code: null | Array<string>;
    country: null | Array<string>;
    non_field_errors: null | Array<string>;
    [key: string]: any;
}

interface RegisterFormProps {
    fields: Fields;
    errors: Errors;
    onChange: (event: IInputChangeEvent) => void;
    onSubmit: () => Promise<void>;
}

const useStyles = makeStyles(authStyles);

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
                <Grid item xs={12}>
                    <InputField
                        name="address"
                        label="Address"
                        value={fields.address}
                        error={getError('address')}
                        autoComplete="street-address"
                        required
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="city"
                        label="City"
                        value={fields.city}
                        error={getError('city')}
                        autoComplete="address-level2"
                        required
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="postal_code"
                        label="Postal code"
                        value={fields.postal_code}
                        error={getError('postal_code')}
                        autoComplete="postal-code"
                        required
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="country"
                        label="Country"
                        value={fields.country}
                        error={getError('country')}
                        autoComplete="country-name"
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
