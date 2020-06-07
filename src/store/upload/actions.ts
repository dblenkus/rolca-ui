import { AppThunk } from '..';

import { Contest, Theme } from '../../types/api';
import { ContestError, InputChange } from '../../types/models';
import imageReader from '../../utils/imageReader';
import upload from '../../utils/upload';
import validate from '../../utils/validate';

import themeReducer from './reducerTheme';
import { ImageMeta, SubmissionMeta, UploadState } from './types';

import {
    AUTHOR_UPDATE,
    IMAGE_INIT,
    THEME_INIT,
    SUBMISSION_INIT,
    SUBMISSION_UPDATE,
    UPLOAD_SET,
    UPLOAD_SET_ERRORS,
    UploadActionTypes,
    IMAGE_REMOVE,
    IMAGE_STORE,
} from './types';

export const uploadInit = (contest: Contest): AppThunk => async (dispatch, getState) => {
    const inputs = {
        ...getState().upload.inputs,
        title: contest.title,
        themes: contest.themes.map((theme) => themeReducer(undefined, themeInit(theme))),
    };
    const errors = await validate(inputs, true);
    dispatch(uploadSet({ inputs, errors }));
};

export const uploadSet = (meta: UploadState): UploadActionTypes => ({ type: UPLOAD_SET, meta });

export const uploadSubmit = (): AppThunk => async (dispatch, getState) => {
    const { inputs } = getState().upload;

    const errors = await validate(inputs);
    if (!errors.hasError) {
        upload(inputs);
    } else {
        dispatch(uploadSetErrors(errors));
    }
};

export const uploadSetErrors = (errors: ContestError): UploadActionTypes => ({
    type: UPLOAD_SET_ERRORS,
    payload: errors,
});

export const authorUpdate = (payload: InputChange): UploadActionTypes => ({
    type: AUTHOR_UPDATE,
    payload,
});

export const themeInit = (meta: Theme): UploadActionTypes => ({ type: THEME_INIT, meta });

export const submissionInit = (meta: SubmissionMeta): UploadActionTypes => ({
    type: SUBMISSION_INIT,
    meta,
});

export const submissionUpdate = (
    theme_id: number,
    submission_id: number,
    payload: InputChange,
): UploadActionTypes => ({ type: SUBMISSION_UPDATE, theme_id, submission_id, payload });

export const imageInit = (meta: ImageMeta): UploadActionTypes => ({ type: IMAGE_INIT, meta });

export const imageRemove = (
    theme_id: number,
    submission_id: number,
    image_id: number,
): UploadActionTypes => ({ type: IMAGE_REMOVE, theme_id, submission_id, image_id });

export const imageStore = (
    theme_id: number,
    submission_id: number,
    image_id: number,
    payload: { file: File; url: string },
): UploadActionTypes => ({ type: IMAGE_STORE, theme_id, submission_id, image_id, payload });

export const imageUpdate = (
    theme_id: number,
    submission_id: number,
    image_id: number,
    payload: { file: File },
): AppThunk => async (dispatch) => {
    const { src: url } = await imageReader(payload.file);
    dispatch(imageStore(theme_id, submission_id, image_id, { ...payload, url }));
};
