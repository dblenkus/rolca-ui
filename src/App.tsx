import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CssBaseline, Container } from '@material-ui/core';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { makeStyles } from '@material-ui/core/styles';

import ContestsListView from './views/ContestsList';
import LoginView from './views/Login';
import RegisterView from './views/Register';
import RegisterActivateView from './views/RegisterActivate';
import ResultsListView from './views/ResultsList';
import UploadView from './views/Upload';
import PasswordResetRequestView from './views/PasswordResetRequest';
import PasswordResetView from './views/PasswordReset';

import AuthProvider from './components/Auth/AuthProvider';
import Notifications from './components/Notifications/Notifications';
import PrivateRoute from './components/Auth/PrivateRoute';

import store from './store';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Provider store={store}>
                <AuthProvider>
                    <BrowserRouter>
                        <CssBaseline />
                        <Notifications />
                        <Header />
                        <Container className={classes.container}>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/contests" />} />
                                <Route path="/contests" component={ContestsListView} />
                                <PrivateRoute
                                    path="/contest/:contestId/upload"
                                    component={UploadView}
                                />
                                <Route path="/login" component={LoginView} />
                                <Route exact path="/password-reset" component={PasswordResetView} />
                                <Route
                                    path="/password-reset/request"
                                    component={PasswordResetRequestView}
                                />
                                <Route exact path="/register" component={RegisterView} />
                                <Route path="/register/activate" component={RegisterActivateView} />
                                <Route path="/results" component={ResultsListView} />
                            </Switch>
                        </Container>
                        <Footer />
                    </BrowserRouter>
                </AuthProvider>
            </Provider>
        </div>
    );
};

export default App;
