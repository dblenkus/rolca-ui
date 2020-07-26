import { AxiosPromise } from 'axios';

import { PaginatedResponse, Submission } from '../types/api';

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
    deleteSubmission(submissionsId: number): AxiosPromise<Submission[]> {
        return apiClient.delete(`/submission/${submissionsId}`);
    },
    getSubmissionsByContest(contentiD: number): AxiosPromise<PaginatedResponse<Submission>> {
        return apiClient.get('/submission', { params: { content: contentiD } });
    },
};
