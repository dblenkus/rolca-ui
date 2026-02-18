import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import LoadingProgress from '../../components/LoadingProgress';
import ResultsSubmissionService from '../../services/ResultsSubmissionService';
import { ResultsSubmission } from '../../types/api';

const ThemeOverview: React.FC = () => {
    const { themeId } = useParams<'themeId'>();
    const [submissions, setSubmissions] = useState<null | ResultsSubmission[]>();

    // Initialize the state.
    useEffect(() => {
        const fetch = async (): Promise<void> => {
            if (!themeId) return;
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
                    <Grid key={submission.id} item xs={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {submission.files.slice(0, 3).map((file) => (
                                <img
                                    key={file.id}
                                    style={{ maxWidth: '30%', margin: '5px' }}
                                    src={file.file}
                                    alt={submission.title}
                                    onClick={() => window.open(file.file)}
                                />
                            ))}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {submission.files.slice(3, 6).map((file) => (
                                <img
                                    key={file.id}
                                    style={{ maxWidth: '30%', margin: '5px' }}
                                    src={file.file}
                                    alt={submission.title}
                                    onClick={() => window.open(file.file)}
                                />
                            ))}
                        </div>
                        <Typography align="center">
                            <b>{submission.title}</b>
                            <br />
                            {submission.description && (
                                <>
                                    {submission.description}
                                    <br />
                                </>
                            )}
                            Points: {submission.rating}, Author: {submission.author.id}, Submission
                            id: {submission.id}
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
