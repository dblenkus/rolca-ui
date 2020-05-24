import { range } from 'lodash';

import { SubmissionModel } from '../../types/models';

import { imageInit } from './actions';
import { SUBMISSION_INIT, SUBMISSION_UPDATE, UploadActionTypes } from './types';
import imageReducer from './reducerImage';

const initialSate: SubmissionModel = {
    id: 0,
    isSeries: false,
    title: '',
    titleRequired: false,
    description: '',
    descriptionRequired: false,
    images: [],
};

const reducer = (state = initialSate, action: UploadActionTypes): SubmissionModel => {
    switch (action.type) {
        case SUBMISSION_INIT: {
            let { id, imageNumber, isSeries } = action.meta;
            return {
                ...state,
                id,
                isSeries,
                images: range(imageNumber).map((image_id) =>
                    imageReducer(undefined, imageInit({ id: image_id })),
                ),
            };
        }
        case SUBMISSION_UPDATE: {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value,
            };
        }
        default: {
            if ('image_id' in action) {
                let { images, titleRequired, descriptionRequired, isSeries } = state;
                images = images.map((image) => {
                    return image.id === action.image_id ? imageReducer(image, action) : image;
                });

                const anyImage = images.some((image) => !!image.file);
                titleRequired = anyImage;
                descriptionRequired = anyImage && isSeries;

                return { ...state, images, titleRequired, descriptionRequired };
            }
            return state;
        }
    }
};

export default reducer;
