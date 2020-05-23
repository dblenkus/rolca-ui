import { AxiosPromise } from 'axios';

import { Submission } from '../types/api';

import { apiClient } from './Base';

export interface CreateSubmissionPayload {
    theme: number;
    title: string;
    files: number[];
}

export default {
    createSubmissions(submissions: any): AxiosPromise<Submission[]> {
        return apiClient.post('/submission', submissions);
    },
};
