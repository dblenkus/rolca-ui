import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import contests from './contests/reducer';
import notifications from './notifications/reducer';

const rootReducer = combineReducers({
    contests,
    notifications,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

    return store;
};

export default configureStore();
