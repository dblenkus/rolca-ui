import { Dictionary, isEmpty, keyBy, mapValues, omit, without } from 'lodash';

import {
    ContestErrors,
    ImageModel,
    SubmissionModel,
    ThemeError,
    ThemeModel,
} from '../types/models';
import imageReader from './imageReader';

interface ImageError {
    error: string;
}

interface ImageErrorWithId extends ImageError {
    id: number;
}

interface SubmissionError {
    titleError: string | null;
    imageErrors: null | {
        [index: number]: ImageError;
    };
}

interface SubErrorWithId extends SubmissionError {
    id: number;
}

interface ThemeErrorWithId {
    id: number;
    submissionErrors: null | {
        [index: number]: SubmissionError;
    };
}

const asyncMap = async <T, R>(array: T[], fn: (item: T) => Promise<R>): Promise<R[]> => {
    const promises = array.map((element) => fn(element));
    return await Promise.all(promises);
};

const getErrors = async <T, R extends object>(
    values: T[],
    validationFn: (item: T) => Promise<R | null>,
) => {
    const errors = await asyncMap(values, validationFn);
    const actualErrors = without(errors, null) as R[];
    const errorsDict = keyBy(actualErrors, 'id');
    return mapValues(errorsDict, (obj) => omit(obj, 'id'));
};

const validateImage = async (image: ImageModel): Promise<ImageErrorWithId | null> => {
    const constructError = (error: string): ImageErrorWithId => ({ id: image.id, error });

    const { file } = image;
    if (file === undefined) {
        return constructError('Please select an image.');
    }
    if (file.type !== 'image/jpeg') {
        return constructError('File must be in JPEG format.');
    }
    if (file.size > 2 * 1024 ** 2) {
        return constructError('Image must be smaller than 2MB.');
    }

    let img: HTMLImageElement;
    try {
        img = await imageReader(file);
        console.log(img.width, img.height);
    } catch (error) {
        return constructError('Invalid file.');
    }

    if (img.height > 1920 || img.width > 1920)
        return constructError('Longe edge should not exceed 1920.');

    return null;
};

const validateSubmission = async (submission: SubmissionModel): Promise<SubErrorWithId | null> => {
    const { id } = submission;
    const titleError = submission.title ? null : 'Please enter title.';
    const imageErrors = await getErrors(submission.files, validateImage);
    return isEmpty(imageErrors) && titleError === null ? null : { id, titleError, imageErrors };
};

const validateTheme = async (theme: ThemeModel): Promise<ThemeErrorWithId | null> => {
    const { id } = theme;
    const submissionErrors = await getErrors(theme.submissions, validateSubmission);
    return isEmpty(submissionErrors) ? null : { id, submissionErrors };
};

export default async (inputs: ThemeModel[]): Promise<ContestErrors | null> => {
    const themeErrors = await getErrors(inputs, validateTheme);
    return isEmpty(themeErrors) ? null : { themeErrors: themeErrors as Dictionary<ThemeError> };
};
