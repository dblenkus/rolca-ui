import { Contest, Theme } from '../../types/api';
import { ContestModel, ImageMeta, InputChange, SubmissionMeta } from '../../types/models';

export interface UploadState {
    contest: ContestModel;
    redirect: boolean;
}

export const UPLOAD_INIT = 'UPLOAD_INIT';
export const UPLOAD_SET_CONTEST = 'UPLOAD_SET_CONTEST';
export const UPLOAD_SET_REDIRECT = 'UPLOAD_SET_REDIRECT';
export const AUTHOR_UPDATE = 'AUTHOR_UPDATE';
export const THEME_INIT = 'THEME_INIT';
export const SUBMISSION_INIT = 'SUBMISSION_INIT';
export const SUBMISSION_UPDATE = 'SUBMISSION_UPDATE';
export const IMAGE_INIT = 'IMAGE_INIT';
export const IMAGE_STORE = 'IMAGE_STORE';

interface UploadInitAction {
    type: typeof UPLOAD_INIT;
    payload: Contest;
}

interface UploadSetContestAction {
    type: typeof UPLOAD_SET_CONTEST;
    payload: ContestModel;
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
    payload: Theme;
}

interface SubmissionInitAction {
    type: typeof SUBMISSION_INIT;
    payload: SubmissionMeta;
}

interface SubmissionUpdateAction {
    type: typeof SUBMISSION_UPDATE;
    theme_id: number;
    submission_id: number;
    payload: InputChange;
}

interface ImageInitAction {
    type: typeof IMAGE_INIT;
    payload: ImageMeta;
}

interface ImageStoreAction {
    type: typeof IMAGE_STORE;
    theme_id: number;
    submission_id: number;
    image_id: number;
    payload: { file: File | undefined; url: string };
}

export type UploadActionTypes =
    | UploadInitAction
    | UploadSetContestAction
    | UploadSetRedirectAction
    | AuthorUpdateAction
    | ThemeInitAction
    | SubmissionInitAction
    | SubmissionUpdateAction
    | ImageInitAction
    | ImageStoreAction;
