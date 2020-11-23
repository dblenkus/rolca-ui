import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';
import LoadingProgress from '../../components/LoadingProgress';
import ResultsSubmissionService from '../../services/ResultsSubmissionService';
import { ResultsSubmission } from '../../types/api';

interface RouteMatchParams {
    contestId: string;
    themeId: string;
}

const ThemeOverview: React.FC = () => {
    const { themeId } = useParams<RouteMatchParams>();
    const [submissions, setSubmissions] = useState<null | ResultsSubmission[]>();

    // Initialize the state.
    useEffect(() => {
        const fetch = async (): Promise<void> => {
            const { data } = await ResultsSubmissionService.getOverview(themeId);
            setSubmissions(data.results);
        };
        fetch();
    }, [themeId]);

    if (!submissions) return <LoadingProgress />;

    return (
        <Grid container>
            {submissions.map((submission) => {
                return (
                    <Grid item xs={12}>
                        <img
                            src={submission.files[0].file}
                            alt={submission.title}
                            style={{ maxWidth: '100%', maxHeight: '80vh' }}
                        />
                        <Typography align="center">
                            Title: {submission.title}, Points: {submission.rating}, Author:{' '}
                            {submission.author.id}
                            <br />
                            <br />
                        </Typography>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ThemeOverview;
