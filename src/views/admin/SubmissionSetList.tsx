import React, { useCallback, useEffect, useState } from 'react';
import { AxiosPromise } from 'axios';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { useTranslation } from 'react-i18next';

import ConfirmDialog from '../../components/Notifications/ConfirmDialog';

import SubmissionSetService from '../../services/SubmissionSetService';
import ContestService from '../../services/ContestService';
import { Contest, PaginatedResponse, SubmissionSet } from '../../types/api';
import SubmissionSetTable from '../../components/SubmissionSetTable/SubmissionSetTable';
import LoadingProgress from '../../components/LoadingProgress';

const SubmissionSetList: React.FC = () => {
    const { t } = useTranslation();
    const { contestId } = useParams<'contestId'>();
    const [contest, setContest] = useState<Contest | null>(null);
    const [pendingSubmissionSet, setPendingSubmissionSet] = useState<SubmissionSet | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const fetchData = useCallback(async (): Promise<void> => {
        if (!contestId) return;
        const { data } = await ContestService.getContest(contestId);
        setContest(data);
    }, [contestId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = (toDelete: SubmissionSet): void => {
        setPendingSubmissionSet(toDelete);
        setShowDialog(true);
    };

    const closeDialog = (): void => {
        setPendingSubmissionSet(null);
        setShowDialog(false);
    };

    const processDelete = async (): Promise<void> => {
        if (!pendingSubmissionSet) return;
        await SubmissionSetService.deleteSubmissionSet(pendingSubmissionSet.id);
        closeDialog();
        await fetchData();
    };

    if (!contest) return <LoadingProgress />;

    const dataSource = (
        page: number,
        pageSize: number,
    ): AxiosPromise<PaginatedResponse<SubmissionSet>> =>
        SubmissionSetService.getByContest(contest.id.toString(), page, pageSize);

    return (
        <>
            <Typography align="center" variant="h2">
                {contest.title}
            </Typography>

            <Grid item xs={12}>
                <SubmissionSetTable
                    contestId={contest.id}
                    dataSource={dataSource}
                    onDelete={handleDelete}
                />
            </Grid>

            <ConfirmDialog
                open={showDialog}
                title={t('delete_confirmation_title')}
                onClose={closeDialog}
                onConfirm={processDelete}
            >
                {t('delete_confirmation') as React.ReactNode}
            </ConfirmDialog>
        </>
    );
};

export default SubmissionSetList;
