import { AxiosPromise } from 'axios';

import { apiClient } from './Base';

export interface LoginPayload {
    email: string;
    password: string;
}

export default {
    login(payload: LoginPayload): AxiosPromise {
        return apiClient.post('/login', payload);
    },
};
