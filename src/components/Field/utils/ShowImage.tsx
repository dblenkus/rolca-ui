import React, { useMemo, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid } from '@material-ui/core';
import { uploadFormStyles } from '../../../styles/general';

interface ShowImageProps {
    image: File;
    error: boolean;
    handleChange: (event: React.MouseEvent) => void;
    handleRemove: (event: React.MouseEvent) => void;
}

const useStyles = makeStyles(uploadFormStyles);

const ShowImage: React.FC<ShowImageProps> = (props: ShowImageProps) => {
    const classes = useStyles();
    const { error, handleChange, handleRemove, image } = props;

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useMemo(() => {
        if (image) {
            const reader = new FileReader();
            reader.onload = (): void => {
                if (typeof reader.result === 'string') setImageUrl(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setImageUrl(null);
        }
    }, [image]);

    let className = classes.image;
    if (error) className += ` ${classes.error}`;

    return (
        <>
            {imageUrl !== null ? (
                <img className={className} src={imageUrl} alt="Preview" />
            ) : (
                // TODO: Loading icon
                <img className={className} src="" alt="Loading" />
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
};

export default ShowImage;
