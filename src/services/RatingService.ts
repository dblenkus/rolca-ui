import { AxiosPromise } from 'axios';

import { Rating, PaginatedResponse } from '../types/api';

import { apiClient } from './Base';

export default {
    getForSubmission(submissionId: number): AxiosPromise<PaginatedResponse<Rating>> {
        return apiClient.get('/rating', { params: { submission: submissionId } });
    },
    getForTheme(themeId: number): AxiosPromise<PaginatedResponse<Rating>> {
        return apiClient.get('/rating', { params: { theme: themeId, page_size: 1000 } });
    },
    updateForSubmission(submissionId: number, rating: number): AxiosPromise<Rating> {
        return apiClient.post('/rating', { submission: submissionId, rating });
    },
};
