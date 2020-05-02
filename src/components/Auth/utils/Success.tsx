import React from 'react';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface RegisterActivateSuccessProps {
    title: string;
    buttonText: string;
    onClick: () => void;
}

const useStyles = makeStyles(({ spacing }) => ({
    button: {
        margin: spacing(2, 0, 2),
        padding: spacing(1),
    },
    paragraph: {
        marginTop: spacing(2),
    },
}));

const RegisterActivateSuccess: React.FC<RegisterActivateSuccessProps> = (props) => {
    const classes = useStyles();
    const { buttonText, title, onClick } = props;

    return (
        <>
            <Typography component="h3" variant="h6">
                {title}
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => onClick()}
            >
                {buttonText}
            </Button>
        </>
    );
};

export default RegisterActivateSuccess;
