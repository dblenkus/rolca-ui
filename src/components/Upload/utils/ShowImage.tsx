import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid } from '@material-ui/core';
import { uploadFormStyles } from '../../../styles/general';

interface ShowImageProps {
    imageUrl: string;
    error: boolean;
    handleChange: (event: React.MouseEvent) => void;
    handleRemove: (event: React.MouseEvent) => void;
}

const useStyles = makeStyles(uploadFormStyles);

const ShowImage: React.FC<ShowImageProps> = (props: ShowImageProps) => {
    const classes = useStyles();
    const { error, handleChange, handleRemove, imageUrl } = props;

    let className = classes.image;
    if (error) className += ` ${classes.error}`;

    return (
        <>
            <img className={className} src={imageUrl} alt="Preview" />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button
                        className={classes.button}
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={handleChange}
                    >
                        Change
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className={classes.button}
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={handleRemove}
                    >
                        Remove
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ShowImage;
