import React, { ReactNode } from 'react';

import Grid from '@mui/material/GridLegacy';
import { makeStyles } from 'tss-react/mui-compat';

import { uploadFormStyles } from '../../../styles/general';

interface ImageGridProps {
    children: ReactNode;
}

const useStyles = makeStyles(uploadFormStyles);

const ImageGrid: React.FC<ImageGridProps> = (props) => {
    const classes = useStyles();
    const { children } = props;

    return (
        <Grid item xs={12} sm={6} md={4} className={classes.imageGrid}>
            {children}
        </Grid>
    );
};

export default ImageGrid;
