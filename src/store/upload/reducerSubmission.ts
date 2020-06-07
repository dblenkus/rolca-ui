import { range } from 'lodash';

import { SubmissionModel } from '../../types/models';

import { imageInit } from './actions';
import { SUBMISSION_INIT, SUBMISSION_UPDATE, UploadActionTypes } from './types';
import imageReducer from './reducerImage';

interface RequiredFields {
    titleRequired?: boolean;
    descriptionRequired?: boolean;
}

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
            const { isSeries } = state;

            const requiredFields: RequiredFields = {};
            if (name === 'title' || name === 'description') {
                requiredFields.titleRequired = !!value;
                requiredFields.descriptionRequired = isSeries && !!value;
            }

            return {
                ...state,
                ...requiredFields,
                [name]: value,
            };
        }
        default: {
            if ('image_id' in action) {
                let {
                    description,
                    descriptionRequired,
                    images,
                    isSeries,
                    title,
                    titleRequired,
                } = state;
                images = images.map((image) => {
                    return image.id === action.image_id ? imageReducer(image, action) : image;
                });

                const anyImage = images.some((image) => !!image.file);
                titleRequired = anyImage || (isSeries && !!description);
                descriptionRequired = isSeries && (anyImage || !!title);

                return { ...state, images, titleRequired, descriptionRequired };
            }
            return state;
        }
    }
};

export default reducer;
