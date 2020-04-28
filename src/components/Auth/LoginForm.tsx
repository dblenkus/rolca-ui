import React from 'react';

import { Button } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import InputField, { IInputChangeEvent } from '../Field/InputField';

import { userContext } from './AuthProvider';

interface LoginFormProps extends WithStyles<typeof styles>, RouteComponentProps {}

interface IFields {
    email: string;
    password: string;
    [key: string]: string;
}

interface Errors {
    email: null | Array<string>;
    password: null | Array<string>;
    non_field_errors: null | Array<string>;
    [key: string]: any;
}

interface LoginFormState {
    fields: IFields;
    errors: Errors;
    redirect: boolean;
}

interface LocationState {
    from?: { pathname: string };
}

const styles = ({ spacing }: Theme) => ({
    submit: {
        margin: spacing(2, 0, 2),
        padding: spacing(1),
    },
    alert: {
        margin: spacing(2, 0, 0),
    },
});

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    static contextType = userContext;

    state = {
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
    };

    handleLogin = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            const { email, password } = this.state.fields;
            await this.context.login(email, password);
            this.setState({ redirect: true });
        } catch (error) {
            this.setState({ errors: error.response.data });
        }
    };

    onInputChange = ({ name, value }: IInputChangeEvent): void => {
        this.setState((state) => {
            const fields: IFields = Object.assign({}, state.fields);
            const errors: Errors = Object.assign({}, state.errors);
            fields[name] = value;
            errors[name] = null;
            errors.non_field_errors = null;
            return { fields, errors };
        });
    };

    getError = (field: string): string => {
        const errors: Errors = this.state.errors;
        return errors[field] ? errors[field].join(' ') : null;
    };

    render() {
        const { redirect } = this.state;
        if (redirect) {
            const { location } = this.props;
            const state = location.state as LocationState;
            const from = state?.from?.pathname || '/';
            return <Redirect to={from} />;
        }

        const { classes } = this.props;

        return (
            <form onSubmit={this.handleLogin}>
                <InputField
                    name="email"
                    label="Email"
                    value={this.state.fields.email}
                    error={this.getError('email')}
                    autoComplete="email"
                    autoFocus
                    required
                    onChange={this.onInputChange}
                />
                <InputField
                    name="password"
                    label="Password"
                    value={this.state.fields.password}
                    error={this.getError('password')}
                    autoComplete="current-password"
                    type="password"
                    required
                    onChange={this.onInputChange}
                />
                {this.getError('non_field_errors') !== null ? (
                    <Alert severity="error" className={classes.alert}>
                        {this.getError('non_field_errors')}
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
                    Sign In
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(withRouter(LoginForm));
