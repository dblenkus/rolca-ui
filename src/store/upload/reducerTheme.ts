import { range } from 'lodash';

import { ThemeModel } from '../../types/models';

import { submissionInit } from './actions';
import { THEME_INIT, UploadActionTypes } from './types';
import submissionReducer from './reducerSubmission';

const initialState: ThemeModel = { id: 0, title: '', submissions: [] };

const reducer = (state = initialState, action: UploadActionTypes): ThemeModel => {
    switch (action.type) {
        case THEME_INIT:
            const { is_series: isSeries, n_photos: imageNumber } = action.meta;
            const submissionNumber = isSeries ? 1 : imageNumber;
            const submissionMeta = {
                imageNumber: isSeries ? imageNumber : 1,
                isSeries,
            };
            return {
                ...state,
                id: action.meta.id,
                title: action.meta.title,
                submissions: range(submissionNumber).map((id) =>
                    submissionReducer(undefined, submissionInit({ ...submissionMeta, id })),
                ),
            };
        default:
            if ('submission_id' in action) {
                const submissions = state.submissions.map((submission) => {
                    return submission.id === action.submission_id
                        ? submissionReducer(submission, action)
                        : submission;
                });
                return { ...state, submissions };
            }
            return state;
    }
};

export default reducer;
