import { ImageModel } from '../../types/models';

import { IMAGE_INIT, IMAGE_REMOVE, IMAGE_STORE, UploadActionTypes } from './types';
import { getEmptyImage } from './utils';

const initialSate = getEmptyImage();

const reducer = (state = initialSate, action: UploadActionTypes): ImageModel => {
    switch (action.type) {
        case IMAGE_INIT:
            return {
                ...state,
                meta: action.payload,
            };
        case IMAGE_REMOVE:
            return { ...state, file: undefined, url: '' };
        case IMAGE_STORE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default reducer;
