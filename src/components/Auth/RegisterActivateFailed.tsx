import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { authStyles } from '../../styles/general';

const useStyles = makeStyles(authStyles);

const RegisterActivateFailed: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Typography component="h3" variant="h6">
                Account activation failed!
            </Typography>
            <Typography className={classes.paragraph}>Invalid token.</Typography>
        </>
    );
};

export default RegisterActivateFailed;
