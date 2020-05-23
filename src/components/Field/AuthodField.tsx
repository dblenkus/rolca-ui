import React from 'react';

import { Grid } from '@material-ui/core';

import InputField, { IInputChangeEvent } from './InputField';

import { AuthorError, AuthorModel } from '../../types/models';

interface AuthorFieldProps {
    inputs: AuthorModel;
    errors: AuthorError;
    onChange: (event: AuthorModel) => void;
}

class AuthorField extends React.Component<AuthorFieldProps> {
    propagateInputs = (inputs: AuthorModel): void => {
        const { onChange } = this.props;
        if (onChange) onChange(inputs);
    };

    handleChange = ({ name, value }: IInputChangeEvent): void => {
        const { inputs } = this.props;
        this.propagateInputs({ ...inputs, [name]: value });
    };

    render(): React.ReactNode {
        const { inputs, errors } = this.props;

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
                    onChange={this.handleChange}
                />
                <InputField
                    name="last_name"
                    value={inputs.last_name}
                    error={errors.last_name}
                    label="last name"
                    autoComplete="family-name"
                    required={true}
                    onChange={this.handleChange}
                />
                <InputField
                    name="email"
                    value={inputs.email}
                    error={errors.email}
                    label="Email"
                    autoComplete="email"
                    required={true}
                    onChange={this.handleChange}
                />
            </Grid>
        );
    }
}

export default AuthorField;
