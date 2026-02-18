import React from 'react';

import { useTranslation } from 'react-i18next';

import { Link as RouterLink } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/GridLegacy';

import { Contest } from '../../store/contests/types';

interface ContestCardProps {
    contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = (props) => {
    const { t } = useTranslation();

    const { contest } = props;

    return (
        <Card>
            <CardMedia
                component="img"
                image={contest.header_image || '/img/no-photo.png'}
                width="100%"
                sx={{ maxHeight: 210 }}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {contest.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {contest.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container alignItems="flex-start" justifyContent="flex-end" direction="row">
                    <Button
                        component={RouterLink}
                        to={`/contest/${contest.id}/details`}
                        color="primary"
                    >
                        {t('open')}
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default ContestCard;
