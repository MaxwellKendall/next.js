import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import appReducer from './reducers';

export const initializeStore = () => createStore(
    appReducer,
    {},
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);
