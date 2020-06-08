import { Theme } from '../../types/api';
import { ContestError, ContestModel, InputChange } from '../../types/models';

export interface UploadState {
    inputs: ContestModel;
    errors: ContestError;
    redirect: boolean;
}

export interface ImageMeta {
    id: number;
}

export interface SubmissionMeta {
    id: number;
    imageNumber: number;
    isSeries: boolean;
}

export const UPLOAD_SET = 'UPLOAD_SET';
export const UPLOAD_SET_ERRORS = 'UPLOAD_SET_ERRORS';
export const UPLOAD_SET_REDIRECT = 'UPLOAD_SET_REDIRECT';
export const AUTHOR_UPDATE = 'AUTHOR_UPDATE';
export const THEME_INIT = 'THEME_INIT';
export const SUBMISSION_INIT = 'SUBMISSION_INIT';
export const SUBMISSION_UPDATE = 'SUBMISSION_UPDATE';
export const IMAGE_INIT = 'IMAGE_INIT';
export const IMAGE_REMOVE = 'IMAGE_REMOVE';
export const IMAGE_STORE = 'IMAGE_STORE';

interface UploadSetAction {
    type: typeof UPLOAD_SET;
    meta: UploadState;
}

interface UploadSetErrorAction {
    type: typeof UPLOAD_SET_ERRORS;
    payload: ContestError;
}

interface UploadSetRedirectAction {
    type: typeof UPLOAD_SET_REDIRECT;
}

interface AuthorUpdateAction {
    type: typeof AUTHOR_UPDATE;
    payload: InputChange;
}

interface ThemeInitAction {
    type: typeof THEME_INIT;
    meta: Theme;
}

interface SubmissionInitAction {
    type: typeof SUBMISSION_INIT;
    meta: SubmissionMeta;
}

interface SubmissionUpdateAction {
    type: typeof SUBMISSION_UPDATE;
    theme_id: number;
    submission_id: number;
    payload: InputChange;
}

interface ImageInitAction {
    type: typeof IMAGE_INIT;
    meta: ImageMeta;
}

interface ImageRemoveAction {
    type: typeof IMAGE_REMOVE;
    theme_id: number;
    submission_id: number;
    image_id: number;
}

interface ImageStoreAction {
    type: typeof IMAGE_STORE;
    theme_id: number;
    submission_id: number;
    image_id: number;
    payload: { file: File; url: string };
}

export type UploadActionTypes =
    | UploadSetAction
    | UploadSetErrorAction
    | UploadSetRedirectAction
    | AuthorUpdateAction
    | ThemeInitAction
    | SubmissionInitAction
    | SubmissionUpdateAction
    | ImageInitAction
    | ImageRemoveAction
    | ImageStoreAction;
