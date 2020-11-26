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

    const { file } = submission.files[0];
    const { title, author } = submission;

    return (
        <>
            <div className={classes.flex}>
                <img className={classes.image} src={file} alt={title} />
                <div className={classes.title}>
                    <Typography align="center">
                        <b>{title}</b>, {author.first_name} {author.last_name} ({author.country})
                        <br />
                        {submission.reward_label}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default SubmissionResults;
