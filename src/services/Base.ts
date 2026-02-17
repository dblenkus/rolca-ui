import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';

import store from '../store/index';
import { addNotificationError } from '../store/notifications/actions';

const baseURL = `${process.env.REACT_APP_BASE_URL || ''}/api/v1`;

let config: AxiosRequestConfig = {
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const apiClient: AxiosInstance = axios.create(config);

const authInterceptor = (
    requestConfig: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const token: { token: string; expires: string } = JSON.parse(tokenString);
        if (!!token) {
            requestConfig.headers = requestConfig.headers ?? {};
            requestConfig.headers.Authorization = `Token ${token.token}`;
        }
    }
    return requestConfig;
};

const notificationsInterceptor = (error: AxiosError) => {
    store.dispatch(addNotificationError('Network error occurred.'));
    return Promise.reject(error);
};

apiClient.interceptors.request.use(authInterceptor);
apiClient.interceptors.response.use((response) => response, notificationsInterceptor);

export { apiClient };
