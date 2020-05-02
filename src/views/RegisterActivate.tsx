import React from 'react';

import { isString } from 'lodash';

import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { parse } from 'query-string';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

import RegisterActivateFailed from '../components/Auth/RegisterActivateFailed';
import RegisterActivateSuccess from '../components/Auth/RegisterActivateSuccess';

import UserService from '../services/UserService';

interface RegisterActivateViewProps extends RouteComponentProps {}

interface RegisterActivateViewState {
    succeeded: boolean | null;
    redirect: boolean;
}

class RegisterActivateView extends React.Component<
    RegisterActivateViewProps,
    RegisterActivateViewState
> {
    state = {
        succeeded: null,
        redirect: false,
    };

    async componentDidMount() {
        const { location } = this.props;
        const token = parse(location.search)['token'] || '';
        if (isString(token)) {
            try {
                await UserService.activateUser({ token });
                this.setState({ succeeded: true });
            } catch {
                this.setState({ succeeded: false });
            }
        } else {
            this.setState({ succeeded: false });
        }
    }

    handleClick = () => this.setState({ redirect: true });

    render() {
        const { redirect, succeeded } = this.state;

        if (redirect) {
            return <Redirect to="/login" />;
        }

        if (succeeded === null) {
            return <></>;
        }

        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                            title="Account activation"
                            titleTypographyProps={{ align: 'center' }}
                        />
                        <CardContent>
                            {succeeded ? (
                                <RegisterActivateSuccess onClick={this.handleClick} />
                            ) : (
                                <RegisterActivateFailed />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(RegisterActivateView);
