import { AxiosPromise } from 'axios';

import { apiClient } from './Base';

export default {
    login(email: string, password: string): AxiosPromise {
        return apiClient.post('/login', { email, password });
    },
};
