import { Action, createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import contests from './contests/reducer';
import notifications from './notifications/reducer';
import upload from './upload/reducer';

const rootReducer = combineReducers({
    contests,
    notifications,
    upload,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

const configureStore = () => {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

    return store;
};

export default configureStore();
