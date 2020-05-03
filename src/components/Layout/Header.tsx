import React from 'react';

import { Link } from 'react-router-dom';

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Dropdown from './Dropdown';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const CustomButton = ({ navigate, ...rest }: { navigate: Function }) => {
    // Rendering element with the 'navigate' prop raises an error, so we have
    // to strip it: Warning: Invalid value for prop `navigate` on <a> tag.
    return React.createElement(Button, rest);
};

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Rolca
                </Typography>
                <Link
                    to="/contests"
                    component={CustomButton}
                    className={classes.menuButton}
                    color="inherit"
                >
                    Active contests
                </Link>
                <Link
                    to="/results"
                    component={CustomButton}
                    className={classes.menuButton}
                    color="inherit"
                >
                    Results
                </Link>
                <Dropdown />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
