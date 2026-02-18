import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { Card } from '@mui/material';
import Grid from '@mui/material/GridLegacy';

import { Contest, SubmissionSet } from '../../types/api';

import SubmissionSetService from '../../services/SubmissionSetService';
import ContestService from '../../services/ContestService';

const SubmissionList: React.FC = () => {
    const { t } = useTranslation();
    const { contestId, submissionSetId } = useParams<'contestId' | 'submissionSetId'>();
    const [contest, setContest] = useState<Contest | null>(null);
    const [submissionSet, setSubmissionSet] = useState<SubmissionSet | null>(null);

    const fetchData = useCallback(async (): Promise<void> => {
        if (!contestId || !submissionSetId) return;

        const { data: contestData } = await ContestService.getContest(contestId);
        const { data: submissionSetData } =
            await SubmissionSetService.getSubmissionSet(submissionSetId);
        setContest(contestData);
        setSubmissionSet(submissionSetData);
    }, [contestId, submissionSetId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getSubmissionSetAuthor = (set: SubmissionSet): string => {
        if (!set.submissions.length) return '';

        const { first_name: firstName, last_name: lastName, email } = set.submissions[0].author;
        return `${firstName} ${lastName}, ${email}`;
    };

    return (
        <>
            <Grid item xs={12}>
                <b>{t('contest')}:</b> {contest?.title}
                <br />
                <b>{t('author')}:</b> {submissionSet ? getSubmissionSetAuthor(submissionSet) : ''}
                <br />
                <br />
            </Grid>
            <Grid container spacing={2}>
                {submissionSet?.submissions.map((submission) => {
                    const theme = contest?.themes.find(
                        (themeItem) => themeItem.id === submission.theme,
                    );
                    return (
                        <Grid key={submission.id} item xs={12} sm={6} md={4}>
                            <Card raised>
                                {submission.files.map((file) => (
                                    <img
                                        key={file.id}
                                        alt={submission.title}
                                        src={file.file}
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            maxHeight: '100%',
                                            padding: '5px',
                                            width: '100%',
                                        }}
                                    />
                                ))}
                                <br />
                                <b>{t('title')}:</b> {submission.title}
                                <br />
                                <b>{t('theme')}:</b> {theme?.title}
                                {submission.description && (
                                    <>
                                        <br />
                                        <b>{t('description')}:</b> {submission.description}
                                    </>
                                )}
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default SubmissionList;
