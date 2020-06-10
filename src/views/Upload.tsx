import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import { AppState } from '../store';
import {
    authorUpdate,
    imageRemove,
    imageUpdate,
    submissionUpdate,
    uploadInit,
    uploadSubmit,
} from '../store/upload/actions';

import ContestService from '../services/ContestService';

import { InputChange } from '../types/models';
import { Contest } from '../types/api';

import ContestField from '../components/Upload/ContestField';

interface RouteMatchParams {
    contestId: string;
}

interface UploadViewProps extends PropsFromRedux, RouteComponentProps<RouteMatchParams> {}

class UploadView extends React.Component<UploadViewProps> {
    async componentDidMount() {
        const { uploadInit } = this.props;
        const { contestId } = this.props.match.params;
        const { data: contest } = await ContestService.getContest(contestId);

        uploadInit(contest);
    }

    render(): React.ReactNode {
        const {
            inputs,
            errors,
            handleAuthorChange,
            handleSubmissionChange,
            handleImageChange,
            handleImageRemove,
            handleSubmit,
            redirect,
        } = this.props;
        const { contestId } = this.props.match.params;

        if (redirect) {
            return <Redirect to={`/contest/${contestId}/confirm`} />;
        }

        return (
            <ContestField
                inputs={inputs}
                errors={errors}
                handleAuthorChange={handleAuthorChange}
                handleSubmissionChange={handleSubmissionChange}
                handleImageChange={handleImageChange}
                handleImageRemove={handleImageRemove}
                handleSubmit={handleSubmit}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => ({ ...state.upload });

const mapDispatchToProps = (dispatch: any) => ({
    uploadInit: (contest: Contest) => dispatch(uploadInit(contest)),
    handleAuthorChange: (payload: InputChange) => dispatch(authorUpdate(payload)),
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) =>
        dispatch(submissionUpdate(theme_id, submission_id, payload)),
    handleImageChange: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File },
    ) => dispatch(imageUpdate(theme_id, submission_id, image_id, payload)),
    handleImageRemove: (theme_id: number, submission_id: number, image_id: number) =>
        dispatch(imageRemove(theme_id, submission_id, image_id)),
    handleSubmit: () => dispatch(uploadSubmit()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRouter(UploadView));
