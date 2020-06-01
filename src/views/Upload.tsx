import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { AppState } from '../store';
import {
    authorUpdate,
    imageRemove,
    imageUpdate,
    submissionUpdate,
    uploadInit,
    uploadSubmit,
} from '../store/upload/actions';

import { InputChange } from '../types/models';
import { Contest } from '../types/api';

import ContestField from '../components/Field/ContestField';

const contest: Contest = {
    id: 1,
    title: 'Test contest',
    themes: [
        {
            id: 1,
            title: 'My theme',
            n_photos: 3,
            is_series: false,
        },
        {
            id: 2,
            title: 'My series',
            n_photos: 4,
            is_series: true,
        },
    ],
    start_date: '2020-01-01T00:00:00Z',
    end_date: '2020-12-31T23:59:59Z',
};

class UploadView extends React.Component<PropsFromRedux> {
    componentDidMount() {
        const { uploadInit } = this.props;
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
        } = this.props;

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

export default connector(UploadView);
