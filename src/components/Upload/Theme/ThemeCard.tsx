import React, { ReactNode } from 'react';

import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { makeStyles } from 'tss-react/mui-compat';

import { uploadFormStyles } from '../../../styles/general';

export interface ThemeCardProps {
    title: string;
    children: ReactNode;
}

const useStyles = makeStyles(uploadFormStyles);

const ThemeCard: React.FC<ThemeCardProps> = (props) => {
    const classes = useStyles();
    const { title, children } = props;

    return (
        <Card className={classes.themeCard} raised>
            <CardHeader title={title} titleTypographyProps={{ align: 'center', variant: 'h3' }} />
            <CardContent>
                <Grid container alignItems="center" spacing={2}>
                    {children}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ThemeCard;
