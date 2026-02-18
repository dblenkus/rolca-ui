import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import contests from './contests/reducer';
import notifications from './notifications/reducer';
import upload from './upload/reducer';
import jury from './jury/reducer';

const rootReducer = combineReducers({
    contests,
    notifications,
    upload,
    jury,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, AppState, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

const configureStore = () => {
    const middlewares = [thunk];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, undefined, composeWithDevTools(middleWareEnhancer));

    return store;
};

export default configureStore();
