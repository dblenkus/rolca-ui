import React from 'react';

import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import InputField, { IInputChangeEvent } from '../Upload/InputField';

import { authStyles } from '../../styles/general';

export interface Fields {
    new_password: string;
    [key: string]: string;
}

export interface Errors {
    new_password: null | Array<string>;
    non_field_errors: null | Array<string>;
    [key: string]: any;
}

interface PasswordReserFormProps {
    fields: Fields;
    errors: Errors;
    onChange: (event: IInputChangeEvent) => void;
    onSubmit: () => Promise<void>;
}

const useStyles = makeStyles(authStyles);

const PasswordResetForm: React.FC<PasswordReserFormProps> = (props) => {
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
            <InputField
                name="new_password"
                label="New password"
                value={fields.new_password}
                error={getError('new_password')}
                autoComplete="new-password"
                type="password"
                required
                onChange={onChange}
            />
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
                Reset Password
            </Button>
        </form>
    );
};

export default PasswordResetForm;
