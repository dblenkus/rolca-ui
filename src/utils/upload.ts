import { flatten, without } from 'lodash';

import ImageService from '../services/ImageService';
import { ContestModel, ImageModel, SubmissionModel, ThemeModel } from '../types/models';
import SubmissionService from '../services/SubmissionService';
import AuthorService from '../services/AuthorService';

import { asyncMap } from './async';

// interface XXX {
//     files: number[];
//     title: string;
//     description: string;
// }

const processImage = async (image: ImageModel): Promise<any> => {
    const { file } = image;
    if (image.file) {
        const { data } = await ImageService.uploadImage(file!);
        return data;
    }
    return undefined;
};

const processSubmission = async (submission: SubmissionModel): Promise<any> => {
    let files = await asyncMap(submission.images, processImage);
    files = without(files, undefined);
    const { title, description } = submission;
    return { files, title, description };
};

const processTheme = async (theme: ThemeModel): Promise<any> => {
    const submissions = await asyncMap(theme.submissions, processSubmission);
    return flatten(submissions).map((submission) => ({ ...submission, theme: theme.meta.id }));
};

export default async (contest: ContestModel): Promise<void> => {
    const themes = await asyncMap(contest.themes, processTheme);
    let submissions = flatten(themes);
    const { data: author } = await AuthorService.create(contest.author);
    submissions = submissions.map((submission) => ({ ...submission, author }));
    SubmissionService.createSubmissions(submissions);
};
