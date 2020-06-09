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

interface BaseError {
    hasError: boolean;
}

const asyncMap = async <T, U extends any[], R>(
    array: T[],
    fn: (item: T, ...rest: U) => Promise<R>,
    ...rest: U
): Promise<R[]> => {
    const promises = array.map((element) => fn(element, ...rest));
    return await Promise.all(promises);
};

const getErrors = async <T, U extends any[], R extends BaseError>(
    values: T[],
    validationFn: (item: T, ...rest: U) => Promise<R>,
    ...rest: U
): Promise<{ hasError: boolean; errors: R[] }> => {
    const errors = await asyncMap(values, validationFn, ...rest);
    const hasError = errors.reduce((result, next) => result || next.hasError, false);

    return { hasError, errors };
};

const validateImage = async (image: ImageModel): Promise<ImageError> => {
    const constructError = (file: string | null): ImageError => ({
        id: image.id,
        file,
        hasError: file !== null,
    });

    const { file } = image;
    if (file) {
        if (file === undefined) {
            return constructError('Please select an image.');
        }
        if (file.type !== 'image/jpeg') {
            return constructError('File must be in JPEG format.');
        }
        if (file.size > 5 * 1024 ** 2) {
            return constructError('Image must be smaller than 5MB.');
        }

        let img: HTMLImageElement;
        try {
            img = await imageReader(file);
        } catch (error) {
            return constructError('Invalid file.');
        }

        if (img.height > 3000 || img.width > 3000)
            return constructError('Longe edge should not exceed 3000px.');
    }

    return constructError(null);
};

const validateSubmission = async (submission: SubmissionModel): Promise<SubmissionError> => {
    const { id } = submission;

    const title = anyImage(submission.images) && !submission.title ? 'Please enter title.' : null;
    const description =
        submission.descriptionRequired && !submission.description
            ? 'Please enter description.'
            : null;
    const imagesResult = await getErrors(submission.images, validateImage);

    if ((submission.title || submission.description) && !anyImage(submission.images)) {
        imagesResult.errors[0].file = 'Please select an image';
        imagesResult.hasError = true;
    }

    const hasError = imagesResult.hasError || title !== null || description !== null;

    return { id, hasError, title, description, images: imagesResult.errors };
};

const validateTheme = async (theme: ThemeModel): Promise<ThemeError> => {
    const { id } = theme;
    const { hasError, errors } = await getErrors(theme.submissions, validateSubmission);

    return { id, hasError, submissions: errors };
};

const validateAuthor = (author: AuthorModel, initial: boolean): AuthorError => {
    const error = {
        first_name: !author.first_name && !initial ? 'Please enter the first name.' : null,
        last_name: !author.last_name && !initial ? 'Please enter the last name.' : null,
    };
    const hasError = error.first_name !== null || error.last_name !== null;
    return { ...error, hasError };
};

export default async (inputs: ContestModel, initial = false): Promise<ContestError> => {
    const themes = await getErrors(inputs.themes, validateTheme);
    const author = validateAuthor(inputs.author, initial);
    const hasError = themes.hasError || author.hasError;

    return { hasError, author, themes: themes.errors };
};
