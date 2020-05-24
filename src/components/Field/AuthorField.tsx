import React from 'react';

import { Grid } from '@material-ui/core';

import InputField from './InputField';

import { AuthorError, AuthorModel, InputChange } from '../../types/models';

interface AuthorFieldProps {
    inputs: AuthorModel;
    errors: AuthorError;
    handleAUthorChange: (payload: InputChange) => void;
}

class AuthorField extends React.Component<AuthorFieldProps> {
    render(): React.ReactNode {
        const { inputs, errors, handleAUthorChange } = this.props;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <InputField
                    name="first_name"
                    value={inputs.first_name}
                    error={errors.first_name}
                    label="First name"
                    autoComplete="given-name"
                    autoFocus={true}
                    required={true}
                    onChange={handleAUthorChange}
                />
                <InputField
                    name="last_name"
                    value={inputs.last_name}
                    error={errors.last_name}
                    label="last name"
                    autoComplete="family-name"
                    required={true}
                    onChange={handleAUthorChange}
                />
                <InputField
                    name="email"
                    value={inputs.email}
                    error={errors.email}
                    label="Email"
                    autoComplete="email"
                    required={true}
                    onChange={handleAUthorChange}
                />
            </Grid>
        );
    }
}

export default AuthorField;
