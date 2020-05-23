import { flatten } from 'lodash';

import ImageService from '../services/ImageService';
import { ContestModel, ImageModel, SubmissionModel, ThemeModel } from '../types/models';
import SubmissionService from '../services/SubmissionService';
import AuthorService from '../services/AuthorService';

// interface XXX {
//     files: number[];
//     title: string;
//     description: string;
// }

const asyncMap = async <T, R>(array: T[], fn: (item: T) => Promise<R>): Promise<R[]> => {
    const promises = array.map((element) => fn(element));
    return await Promise.all(promises);
};

const processImage = async (image: ImageModel): Promise<any> => {
    const { file } = image;
    const { data } = await ImageService.uploadImage(file!);
    return data;
};

const processSubmission = async (submission: SubmissionModel): Promise<any> => {
    const files = await asyncMap(submission.images, processImage);
    const { title, description } = submission;
    return { files, title, description };
};

const processTheme = async (theme: ThemeModel): Promise<any> => {
    const submissions = await asyncMap(theme.submissions, processSubmission);
    return flatten(submissions).map((submission) => ({ ...submission, theme: theme.id }));
};

export default async (inputs: ContestModel): Promise<void> => {
    const themes = await asyncMap(inputs.themes, processTheme);
    let submissions = flatten(themes);
    const { data: author } = await AuthorService.create(inputs.author);
    submissions = submissions.map((submission) => ({ ...submission, author }));
    SubmissionService.createSubmissions(submissions);
};
