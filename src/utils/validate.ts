import {
    AuthorError,
    AuthorModel,
    ContestError,
    ContestModel,
    ImageError,
    ImageModel,
    SubmissionError,
    SubmissionModel,
    ThemeError,
    ThemeModel,
} from '../types/models';

import imageReader from './imageReader';
import { anyImage } from './image';

const asyncMap = async <T, U extends any[], R>(
    array: T[],
    fn: (item: T, ...rest: U) => Promise<R>,
    ...rest: U
): Promise<R[]> => {
    const promises = array.map((element) => fn(element, ...rest));
    return await Promise.all(promises);
};

const getErrors = async <T, U extends any[], R extends object>(
    values: T[],
    validationFn: (item: T, ...rest: U) => Promise<[boolean, R]>,
    ...rest: U
): Promise<[boolean, R[]]> => {
    const results = await asyncMap(values, validationFn, ...rest);
    const isValid = results.reduce((result, next) => result && next[0], true);
    const errors = results.map((result) => result[1]);

    return [isValid, errors];
};

const validateImage = async (image: ImageModel): Promise<[boolean, ImageError]> => {
    const constructError = (file: string | null): ImageError => ({ id: image.id, file });

    const { file } = image;
    if (file) {
        if (file === undefined) {
            return [false, constructError('Please select an image.')];
        }
        if (file.type !== 'image/jpeg') {
            return [false, constructError('File must be in JPEG format.')];
        }
        if (file.size > 2 * 1024 ** 2) {
            return [false, constructError('Image must be smaller than 2MB.')];
        }

        let img: HTMLImageElement;
        try {
            img = await imageReader(file);
        } catch (error) {
            return [false, constructError('Invalid file.')];
        }

        if (img.height > 1920 || img.width > 1920)
            return [false, constructError('Longe edge should not exceed 1920.')];
    }

    return [true, constructError(null)];
};

const validateSubmission = async (
    submission: SubmissionModel,
): Promise<[boolean, SubmissionError]> => {
    const { id } = submission;

    const title = anyImage(submission.images) && !submission.title ? 'Please enter title.' : null;
    const [imageValid, images] = await getErrors(submission.images, validateImage);
    const isValid = imageValid && title === null;

    return [isValid, { id, title, images }];
};

const validateTheme = async (theme: ThemeModel): Promise<[boolean, ThemeError]> => {
    const { id } = theme;

    const [submissionValid, submissions] = await getErrors(theme.submissions, validateSubmission);

    return [submissionValid, { id, submissions }];
};

const validateAuthor = (author: AuthorModel, initial: boolean): [boolean, AuthorError] => {
    const error = {
        first_name: !author.first_name && !initial ? 'Please enter the first name.' : null,
        last_name: !author.last_name && !initial ? 'Please enter the last name.' : null,
        email: !author.email && !initial ? 'Please enter the email.' : null,
    };
    return [error.first_name === null && error.last_name === null && error.email === null, error];
};

export default async (inputs: ContestModel, initial = false): Promise<[boolean, ContestError]> => {
    const [themesValid, themes] = await getErrors(inputs.themes, validateTheme);
    const [authorValid, author] = validateAuthor(inputs.author, initial);

    return [themesValid && authorValid, { author, themes }];
};
