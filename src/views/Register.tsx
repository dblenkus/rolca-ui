import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Card, CardContent, CardHeader, Grid, Link } from '@material-ui/core';

import RegisterForm, { Errors, Fields } from '../components/Auth/RegisterForm';
import RegisterConfirm from '../components/Auth/RegisterConfirm';
import { IInputChangeEvent } from '../components/Upload/InputField';

import UserService from '../services/UserService';

interface RegisterViewState {
    fields: Fields;
    errors: Errors;
    done: boolean;
}

class RegisterView extends React.Component<{}, RegisterViewState> {
    state = {
        fields: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            address: '',
            city: '',
            postal_code: '',
            country: '',
        },
        errors: {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            address: null,
            city: null,
            postal_code: null,
            country: null,
            non_field_errors: null,
        },
        done: false,
    };

    handleChange = ({ name, value }: IInputChangeEvent): void => {
        this.setState((state) => {
            const fields: Fields = Object.assign({}, state.fields);
            const errors: Errors = Object.assign({}, state.errors);
            fields[name] = value;
            errors[name] = null;
            errors.non_field_errors = null;
            return { fields, errors };
        });
    };

    handleSubmit = async (): Promise<void> => {
        const { fields } = this.state;
        try {
            await UserService.register(fields);
            this.setState({ done: true });
        } catch (error) {
            this.setState({ errors: error.response.data });
        }
    };

    render() {
        const { errors, done, fields } = this.state;

        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader title="Register" titleTypographyProps={{ align: 'center' }} />
                        <CardContent>
                            {done ? (
                                <RegisterConfirm email={fields.email} />
                            ) : (
                                <>
                                    <RegisterForm
                                        fields={fields}
                                        errors={errors}
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                    />
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Link
                                                component={RouterLink}
                                                to="/login"
                                                variant="body2"
                                            >
                                                Already have an account? Log in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default RegisterView;
