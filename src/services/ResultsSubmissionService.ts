import { AxiosPromise } from 'axios';

import { ResultsSubmission, PaginatedResponse } from '../types/api';

import { apiClient } from './Base';

export default {
    getOverview(themeId: string): AxiosPromise<PaginatedResponse<ResultsSubmission>> {
        return apiClient.get('/results/submission', {
            params: { ordering: '-rating_sum', page_size: 30, theme: themeId },
        });
    },
};
