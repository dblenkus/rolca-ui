import {
    UPLOAD_SET,
    UPLOAD_SET_ERRORS,
    UPLOAD_SET_REDIRECT,
    UploadActionTypes,
    UploadState,
} from './types';
import authorReducer from './reducerAuthor';
import themeReducer from './reducerTheme';

const initialState: UploadState = {
    inputs: {
        title: '',
        description: '',
        noticeHtml: '',
        headerImage: null,
        themes: [],
        author: { first_name: '', last_name: '' },
    },
    errors: {
        hasError: false,
        themes: [],
        author: { hasError: false, first_name: null, last_name: null },
    },
    redirect: false,
};

const reducer = (state = initialState, action: UploadActionTypes): UploadState => {
    switch (action.type) {
        case UPLOAD_SET:
            return action.meta;
        case UPLOAD_SET_ERRORS:
            return { ...state, inputs: state.inputs, errors: action.payload };
        case UPLOAD_SET_REDIRECT:
            return { ...state, redirect: true };
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
