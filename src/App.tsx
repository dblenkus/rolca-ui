import React from 'react';

import { CssBaseline, Container } from '@material-ui/core';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Upload from './components/Upload/Upload';
import { makeStyles } from '@material-ui/core/styles';

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
            <CssBaseline />
            <Header />
            <Container className={classes.container}>
                <Upload />
            </Container>
            <Footer />
        </div>
    );
};

export default App;
