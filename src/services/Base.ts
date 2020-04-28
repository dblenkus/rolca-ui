import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

let config: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const apiClient: AxiosInstance = axios.create(config);

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // let token = store.getters['user/getToken'];
    // if (token) {
    //     config.headers['Authorization'] = `Token ${token}`;
    // }
    return config;
};

apiClient.interceptors.request.use(authInterceptor);

export { apiClient };
