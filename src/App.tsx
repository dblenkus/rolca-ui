import React from 'react';

import * as Sentry from '@sentry/browser';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CssBaseline, Container } from '@material-ui/core';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { makeStyles } from '@material-ui/core/styles';

import ContestsListView from './views/ContestsList';
import ContestDetailsView from './views/ContestDetails';
import LoginView from './views/Login';
import RegisterView from './views/Register';
import RegisterActivateView from './views/RegisterActivate';
import ResultsListView from './views/ResultsList';
import UploadView from './views/Upload';
import UploadConfirmView from './views/UploadConfirm';
import EditSubmissionsList from './views/EditSubmissionsList';
import PasswordResetRequestView from './views/PasswordResetRequest';
import PasswordResetView from './views/PasswordReset';
import AdminSubmissionSetList from './views/admin/SubmissionSetList';
import AdminSubmissionSetView from './views/admin/SubmissionSetView';

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

Sentry.init({ dsn: 'https://59015e5be11d4433af471cfd3a8d194d@o74924.ingest.sentry.io/190302' });

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
                                <Route
                                    path="/contest/:contestId/details"
                                    component={ContestDetailsView}
                                />
                                <PrivateRoute
                                    path="/contest/:contestId/upload"
                                    component={UploadView}
                                />
                                <PrivateRoute
                                    path="/contest/:contestId/confirm"
                                    component={UploadConfirmView}
                                />
                                <PrivateRoute
                                    path="/user/submissions"
                                    component={EditSubmissionsList}
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

                                <PrivateRoute
                                    path="/admin/contest/:contestId/submissions"
                                    component={AdminSubmissionSetList}
                                />
                                <PrivateRoute
                                    path="/admin/contest/:contestId/submission/:submissionSetId"
                                    component={AdminSubmissionSetView}
                                />
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
