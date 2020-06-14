import {
    AuthorModel,
    ContestModel,
    ImageModel,
    SubmissionModel,
    ThemeModel,
} from '../types/models';

import imageReader from './imageReader';
import { anyImage } from './image';

interface BaseError {
    hasError: boolean;
}

interface BaseObject {
    errors: BaseError;
}

const asyncMap = async <T>(array: T[], fn: (item: T) => Promise<T>): Promise<T[]> => {
    const promises = array.map((element) => fn(element));
    return await Promise.all(promises);
};

const hasError = (obj: BaseObject | BaseObject[]): boolean => {
    if (Array.isArray(obj)) {
        return obj.some((o) => o.errors.hasError);
    } else {
        return obj.errors.hasError;
    }
};

const validateImage = async (image: ImageModel): Promise<ImageModel> => {
    // const constructError = (file: string | null): ImageError => ({
    //     id: image.id,
    //     file,
    //     hasError: file !== null,
    // });

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

const validateSubmission = async (submission: SubmissionModel): Promise<SubmissionModel> => {
    const { title, description } = submission;
    const { titleRequired, descriptionRequired } = submission.meta;
    const images = await asyncMap(submission.images, validateImage);

    if ((title || description) && !anyImage(images)) {
        images[0].errors.file = 'Please select an image';
        images[0].errors.hasError = true;
    }

    const errors = {
        description: descriptionRequired && !description ? 'Please enter description.' : null,
        title: titleRequired && !title ? 'Please enter title.' : null,
        hasError:
            hasError(images) || (descriptionRequired && !description) || (titleRequired && !title),
    };

    return { meta: submission.meta, title, description, images, errors };
};

const validateTheme = async (theme: ThemeModel): Promise<ThemeModel> => {
    const submissions = await asyncMap(theme.submissions, validateSubmission);
    const errors = { hasError: hasError(submissions) };

    return { meta: theme.meta, submissions, errors };
};

const validateAuthor = (author: AuthorModel, initial: boolean): AuthorModel => {
    const { first_name, last_name } = author;
    const errors = {
        first_name: !first_name && !initial ? 'Please enter the first name.' : null,
        last_name: !last_name && !initial ? 'Please enter the last name.' : null,
        hasError: !initial && (!first_name || !last_name),
    };

    return { first_name, last_name, errors };
};

export default async (contest: ContestModel, initial = false): Promise<ContestModel> => {
    const author = validateAuthor(contest.author, initial);
    const themes = await asyncMap(contest.themes, validateTheme);
    const errors = { hasError: hasError(themes) || hasError(author) };

    return { meta: contest.meta, author, themes, errors };
};
