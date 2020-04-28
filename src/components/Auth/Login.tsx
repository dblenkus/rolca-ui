import React from 'react';

import { Card, CardContent, CardHeader, Grid, Link } from '@material-ui/core';

import LoginForm from './LoginForm';

interface LoginProps {
    location?: string;
}

const Login: React.FC<LoginProps> = () => (
    <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardHeader title="Login" titleTypographyProps={{ align: 'center' }} />
                <CardContent>
                    <LoginForm />
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
);

export default Login;
