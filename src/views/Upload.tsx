import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { AppState } from '../store';
import {
    authorUpdate,
    imageUpdate,
    submissionUpdate,
    uploadInit,
    uploadSubmit,
} from '../store/upload/actions';

import ContestService from '../services/ContestService';

import { DateChange, InputChange } from '../types/models';
import { Contest } from '../types/api';

import ContestField from '../components/Upload/Contest/ContestField';

const UploadView: React.FC<PropsFromRedux> = ({
    contest,
    handleAuthorChange,
    handleSubmissionChange,
    handleImageChange,
    handleSubmit,
    redirect,
    uploading,
    uploadInit,
}: PropsFromRedux) => {
    const { contestId } = useParams<'contestId'>();

    useEffect(() => {
        const fetchContest = async (): Promise<void> => {
            if (!contestId) return;
            const { data } = await ContestService.getContest(contestId);
            uploadInit(data);
        };
        fetchContest();
    }, [contestId, uploadInit]);

    if (!contestId) return null;

    if (redirect) {
        return <Navigate to={`/contest/${contestId}/confirm`} replace />;
    }

    return (
        <ContestField
            contest={contest}
            handleAuthorChange={handleAuthorChange}
            handleSubmissionChange={handleSubmissionChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            uploading={uploading}
        />
    );
};

const mapStateToProps = (state: AppState) => ({ ...state.upload });

const mapDispatchToProps = (dispatch: any) => ({
    uploadInit: (contest: Contest) => dispatch(uploadInit(contest)),
    handleAuthorChange: (payload: InputChange | DateChange) => dispatch(authorUpdate(payload)),
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) =>
        dispatch(submissionUpdate(theme_id, submission_id, payload)),
    handleImageChange: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File | undefined },
    ): void => dispatch(imageUpdate(theme_id, submission_id, image_id, payload)),
    handleSubmit: () => dispatch(uploadSubmit()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UploadView);
