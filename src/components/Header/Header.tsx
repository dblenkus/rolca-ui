import React from 'react';

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

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Rolca
                </Typography>
                <Button className={classes.menuButton} color="inherit">
                    Active contests
                </Button>
                <Button className={classes.menuButton} color="inherit">
                    Results
                </Button>
                <Dropdown loggedin={false} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
