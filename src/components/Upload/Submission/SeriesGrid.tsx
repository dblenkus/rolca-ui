import React, { ReactNode } from 'react';

import Grid from '@mui/material/GridLegacy';
import { makeStyles } from 'tss-react/mui-compat';

import { uploadFormStyles } from '../../../styles/general';

interface SeriesGridProps {
    titleField: ReactNode;
    descriptionField: ReactNode;
}

const useStyles = makeStyles(uploadFormStyles);

const SeriesGrid: React.FC<SeriesGridProps> = (props) => {
    const classes = useStyles();
    const { titleField, descriptionField } = props;

    return (
        <>
            <Grid item xs={12} className={classes.seriesClearfix} />
            <Grid item xs={12} sm={6} md={4} className={classes.seriesMetaGrid}>
                {titleField}
            </Grid>
            <Grid item xs={12} className={classes.seriesMetaGrid}>
                {descriptionField}
            </Grid>
        </>
    );
};

export default SeriesGrid;
