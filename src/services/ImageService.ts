import { AxiosPromise } from 'axios';

import { apiClient } from './Base';
import { Image } from '../types/api';

export default {
    uploadImage(image: File): AxiosPromise<Image> {
        return apiClient.post('/file', image, {
            headers: {
                'Content-Type': image.type,
                'Content-Disposition': `attachment; filename=${image.name}`,
            },
        });
    },
};
