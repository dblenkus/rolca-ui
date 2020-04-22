import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid } from '@material-ui/core';
import { uploadFormStyles } from '../../../styles/general';

interface ShowImageProps {
    image: File;
    handleChange: (event: React.MouseEvent) => void;
    handleRemove: (event: React.MouseEvent) => void;
}

const useStyles = makeStyles(uploadFormStyles);

const ShowImage: React.FC<ShowImageProps> = React.memo((props: ShowImageProps) => {
    const classes = useStyles();
    const { handleChange, handleRemove, image } = props;

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    if (image) {
        const reader = new FileReader();
        reader.onloadend = (): void => {
            if (typeof reader.result === 'string' && reader.result !== imageUrl)
                setImageUrl(reader.result);
        };
        reader.readAsDataURL(image);
    } else {
        setImageUrl(null);
    }

    return (
        <>
            {imageUrl !== null ? (
                <img className={classes.image} src={imageUrl} alt="Preview" />
            ) : (
                // TODO: Loading icon
                <img className={classes.image} src="" alt="Loading" />
            )}
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
});

export default ShowImage;
