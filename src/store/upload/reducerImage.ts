import { ImageModel } from '../../types/models';

import { IMAGE_INIT, IMAGE_REMOVE, IMAGE_STORE, UploadActionTypes } from './types';

const initialSate: ImageModel = {
    id: 0,
    file: undefined,
    url: '',
};

const reducer = (state = initialSate, action: UploadActionTypes): ImageModel => {
    switch (action.type) {
        case IMAGE_INIT:
            return {
                ...state,
                id: action.meta.id,
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
