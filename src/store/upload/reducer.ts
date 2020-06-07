import { UPLOAD_SET, UPLOAD_SET_ERRORS, UploadActionTypes, UploadState } from './types';
import authorReducer from './reducerAuthor';
import themeReducer from './reducerTheme';

const initialState: UploadState = {
    inputs: { title: '', themes: [], author: { first_name: '', last_name: '', email: '' } },
    errors: {
        hasError: false,
        themes: [],
        author: { hasError: false, first_name: null, last_name: null, email: null },
    },
};

const reducer = (state = initialState, action: UploadActionTypes): UploadState => {
    switch (action.type) {
        case UPLOAD_SET:
            return action.meta;
        case UPLOAD_SET_ERRORS:
            return { ...state, inputs: state.inputs, errors: action.payload };
        default:
            let { themes } = state.inputs;
            if ('theme_id' in action) {
                themes = themes.map((theme) => {
                    return theme.id === action.theme_id ? themeReducer(theme, action) : theme;
                });
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    themes,
                    author: authorReducer(state.inputs.author, action),
                },
                errors: state.errors,
            };
    }
};

export default reducer;