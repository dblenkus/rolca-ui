import { isEmpty, without } from 'lodash';

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

const asyncMap = async <T, R>(array: T[], fn: (item: T) => Promise<R>): Promise<R[]> => {
    const promises = array.map((element) => fn(element));
    return await Promise.all(promises);
};

const getErrors = async <T, R extends object>(
    values: T[],
    validationFn: (item: T) => Promise<R | null>,
) => {
    const errors = await asyncMap(values, validationFn);
    return without(errors, null) as R[];
};

const validateImage = async (image: ImageModel): Promise<ImageError | null> => {
    const constructError = (file: string): ImageError => ({ id: image.id, file });

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
    } catch (error) {
        return constructError('Invalid file.');
    }

    if (img.height > 1920 || img.width > 1920)
        return constructError('Longe edge should not exceed 1920.');

    return null;
};

const validateSubmission = async (submission: SubmissionModel): Promise<SubmissionError | null> => {
    const { id } = submission;
    const title = submission.title ? null : 'Please enter title.';
    const images = await getErrors(submission.images, validateImage);
    return isEmpty(images) && title === null ? null : { id, title, images };
};

const validateTheme = async (theme: ThemeModel): Promise<ThemeError | null> => {
    const { id } = theme;
    const submissions = await getErrors(theme.submissions, validateSubmission);
    return isEmpty(submissions) ? null : { id, submissions };
};

const validateAuthor = (author: AuthorModel): AuthorError => {
    return {
        first_name: !author.first_name ? 'Please enter the first name.' : null,
        last_name: !author.last_name ? 'Please enter the last name.' : null,
        email: !author.email ? 'Please enter the email.' : null,
    };
};

export default async (inputs: ContestModel): Promise<ContestError | null> => {
    const themes = await getErrors(inputs.themes, validateTheme);
    const author = validateAuthor(inputs.author);
    return isEmpty(themes) && !author.email && !author.first_name && !author.last_name
        ? null
        : { author, themes };
};
