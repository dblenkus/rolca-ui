import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles, Typography } from '@material-ui/core';

import LoadingProgress from '../../components/LoadingProgress';
import ResultsSubmissionService from '../../services/ResultsSubmissionService';
import { ResultsSubmission } from '../../types/api';

interface RouteMatchParams {
    submissionId: string;
}

const useStyles = makeStyles({
    flex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '90vh',
    },
    title: {
        paddingTop: '0.5em',
    },
});

const SubmissionResults: React.FC = () => {
    const classes = useStyles();

    const [submission, setSubmission] = useState<null | ResultsSubmission>(null);
    const { submissionId } = useParams<RouteMatchParams>();

    useEffect(() => {
        const fetch = async (): Promise<void> => {
            const { data } = await ResultsSubmissionService.get(submissionId);
            setSubmission(data);
        };
        fetch();
    }, [submissionId]);

    if (!submission) return <LoadingProgress />;

    const { files, title, author } = submission;

    return (
        <>
            <div className={classes.flex}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {files.slice(0, 3).map((file) => (
                        <img
                            style={{
                                maxWidth: files.length === 1 ? '100%' : '30%',
                                maxHeight: files.length === 1 ? '85vh' : '40vh',
                                margin: '5px',
                            }}
                            src={file.file}
                            alt={submission.title}
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
                    {files.slice(3, 6).map((file) => (
                        <img
                            style={{
                                maxWidth: '30%',
                                maxHeight: '40vh',
                                margin: '5px',
                            }}
                            src={file.file}
                            alt={submission.title}
                        />
                    ))}
                </div>
                <div className={classes.title}>
                    <Typography align="center">
                        <b>{title}</b>, {author.first_name} {author.last_name} ({author.country})
                        {submission.reward_label && (
                            <>
                                <br />
                                {submission.reward_label}
                            </>
                        )}
                        {submission.description && (
                            <>
                                <br />
                                {submission.description}
                            </>
                        )}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default SubmissionResults;
