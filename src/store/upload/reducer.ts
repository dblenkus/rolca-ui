import {
    UPLOAD_INIT,
    UPLOAD_SET_CONTEST,
    UPLOAD_SET_REDIRECT,
    UploadActionTypes,
    UploadState,
} from './types';
import authorReducer from './reducerAuthor';
import themeReducer from './reducerTheme';
import { getEmptyContest } from './utils';
import { themeInit } from './actions';

const initialState: UploadState = {
    contest: getEmptyContest(),
    redirect: false,
};

const reducer = (state = initialState, action: UploadActionTypes): UploadState => {
    switch (action.type) {
        case UPLOAD_INIT:
            const contest = action.payload;
            return {
                ...state,
                contest: {
                    ...state.contest,
                    meta: {
                        title: contest.title,
                        description: contest.description,
                        noticeHtml: contest.notice_html,
                        headerImage: contest.header_image,
                    },
                    themes: contest.themes.map((theme) =>
                        themeReducer(undefined, themeInit(theme)),
                    ),
                },
            };
        case UPLOAD_SET_CONTEST:
            return { ...state, contest: action.payload };
        case UPLOAD_SET_REDIRECT:
            return { ...state, redirect: true };
        default:
            let { themes } = state.contest;
            if ('theme_id' in action) {
                themes = themes.map((theme) => {
                    return theme.meta.id === action.theme_id ? themeReducer(theme, action) : theme;
                });
            }
            return {
                ...state,
                contest: {
                    ...state.contest,
                    themes,
                    author: authorReducer(state.contest.author, action),
                },
            };
    }
};

export default reducer;
