import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { CssBaseline, Container } from '@material-ui/core';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';

import ContestsListView from './views/ContestsList';
import LoginView from './views/Login';
import RegisterView from './views/Register';
import ResultsListView from './views/ResultsList';
import UploadView from './views/Upload';

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
            <BrowserRouter>
                <CssBaseline />
                <Header />
                <Container className={classes.container}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/contests" />} />
                        <Route path="/contests" component={ContestsListView} />
                        <Route path="/contest/:id/upload" component={UploadView} />
                        <Route path="/login" component={LoginView} />
                        <Route path="/register" component={RegisterView} />
                        <Route path="/results" component={ResultsListView} />
                    </Switch>
                </Container>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
