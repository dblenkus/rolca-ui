import React from 'react';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

import PasswordResetRequestForm, { Fields } from '../components/Auth/PasswordResetRequestForm';
import PasswordResetRequestConfirm from '../components/Auth/PasswordResetRequestConfirm';
import { IInputChangeEvent } from '../components/Upload/InputField';

import UserService from '../services/UserService';

interface PasswordResetRequestViewState {
    done: boolean;
    fields: Fields;
}

class PasswordResetRequestView extends React.Component<{}, PasswordResetRequestViewState> {
    state = {
        done: false,
        fields: {
            email: '',
        },
    };

    handleChange = ({ name, value }: IInputChangeEvent): void => {
        this.setState((state) => {
            const fields: Fields = Object.assign({}, state.fields);
            fields[name] = value;
            return { fields };
        });
    };

    handleSubmit = async (): Promise<void> => {
        const { fields } = this.state;
        try {
            await UserService.requestPasswordReset(fields);
            this.setState({ done: true });
        } catch (error) {
            // TODO: Handle error.
        }
    };

    render() {
        const { done, fields } = this.state;

        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                            title="Password reset"
                            titleTypographyProps={{ align: 'center' }}
                        />
                        <CardContent>
                            {done ? (
                                <PasswordResetRequestConfirm email={fields.email} />
                            ) : (
                                <PasswordResetRequestForm
                                    fields={fields}
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default PasswordResetRequestView;
