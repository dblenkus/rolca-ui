import { AxiosPromise } from 'axios';

import { apiClient } from './Base';
import { Author } from '../types/api';

interface UserCreatePayload {
    first_name: string;
    last_name: string;
    dob?: string;
    school?: string;
    mentor?: string;
    club?: string;
    distinction?: string;
}

export default {
    create(user: UserCreatePayload): AxiosPromise<Author> {
        return apiClient.post('/author', user);
    },
};
