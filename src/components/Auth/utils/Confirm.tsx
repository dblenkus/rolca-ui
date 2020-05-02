import React, { ReactNode } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface RegisterConfirmProps {
    title: string;
    children: ReactNode;
}

const useStyles = makeStyles(({ spacing }) => ({
    paragraph: {
        marginTop: spacing(2),
    },
}));

const RegisterConfirm: React.FC<RegisterConfirmProps> = (props) => {
    const classes = useStyles();
    const { title, children } = props;

    return (
        <>
            <Typography component="h3" variant="h6">
                {title}
            </Typography>
            <Typography className={classes.paragraph}>{children}</Typography>
        </>
    );
};

export default RegisterConfirm;
