import { Typography } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingProgress from '../components/LoadingProgress';
import ContestService from '../services/ContestService';
import { Contest } from '../types/api';

const UploadConfirmView: React.FC = () => {
    const [contest, setContest] = useState<Contest | null>(null);
    const { contestId } = useParams<'contestId'>();

    useEffect((): void => {
        const fetchContest = async (): Promise<void> => {
            if (!contestId) return;
            const { data } = await ContestService.getContest(contestId);
            setContest(data);
        };
        fetchContest();
    }, [contestId]);

    if (!contest) return <LoadingProgress />;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    Thank you for uploading photos!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div dangerouslySetInnerHTML={{ __html: contest.confirmation_html }} />
            </Grid>
        </Grid>
    );
};

export default UploadConfirmView;
