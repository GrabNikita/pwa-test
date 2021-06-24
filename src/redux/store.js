import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import tasksReducer from './reducers/tasksReducer';
import notificationsReducer from './reducers/notificationsReducer';
import appReducer from './reducers/appReducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    notifications: notificationsReducer,
    app: appReducer,
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));