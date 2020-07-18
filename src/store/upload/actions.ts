import { AppThunk } from '..';

import { Contest, Theme } from '../../types/api';
import { ContestModel, ImageMeta, InputChange, SubmissionMeta } from '../../types/models';
import imageReader from '../../utils/imageReader';
import upload from '../../utils/upload';
import validate from '../../utils/validate';

import {
    AUTHOR_UPDATE,
    IMAGE_INIT,
    THEME_INIT,
    SUBMISSION_INIT,
    SUBMISSION_UPDATE,
    UPLOAD_INIT,
    UPLOAD_SET_CONTEST,
    UPLOAD_SET_REDIRECT,
    UploadActionTypes,
    IMAGE_STORE,
} from './types';

export const uploadInit = (payload: Contest): UploadActionTypes => ({
    type: UPLOAD_INIT,
    payload,
});

export const uploadSubmit = (): AppThunk => async (dispatch, getState) => {
    const { contest } = getState().upload;

    const newContest = await validate(contest);
    if (newContest.errors.hasError) {
        await upload(contest);
        dispatch(uploadSetRedirect());
    } else {
        dispatch(uploadSetContest(newContest));
    }
};

export const uploadSetContest = (payload: ContestModel): UploadActionTypes => ({
    type: UPLOAD_SET_CONTEST,
    payload,
});

export const uploadSetRedirect = (): UploadActionTypes => ({
    type: UPLOAD_SET_REDIRECT,
});

export const authorUpdate = (payload: InputChange): UploadActionTypes => ({
    type: AUTHOR_UPDATE,
    payload,
});

export const themeInit = (payload: Theme): UploadActionTypes => ({ type: THEME_INIT, payload });

export const submissionInit = (payload: SubmissionMeta): UploadActionTypes => ({
    type: SUBMISSION_INIT,
    payload,
});

export const submissionUpdate = (
    theme_id: number,
    submission_id: number,
    payload: InputChange,
): UploadActionTypes => ({ type: SUBMISSION_UPDATE, theme_id, submission_id, payload });

export const imageInit = (payload: ImageMeta): UploadActionTypes => ({ type: IMAGE_INIT, payload });

export const imageStore = (
    theme_id: number,
    submission_id: number,
    image_id: number,
    payload: { file: File | undefined; url: string },
): UploadActionTypes => ({ type: IMAGE_STORE, theme_id, submission_id, image_id, payload });

export const imageUpdate = (
    theme_id: number,
    submission_id: number,
    image_id: number,
    payload: { file: File | undefined },
): AppThunk => async (dispatch) => {
    const { file } = payload;
    const url = !file ? '' : (await imageReader(file)).src;
    dispatch(imageStore(theme_id, submission_id, image_id, { file, url }));
};
