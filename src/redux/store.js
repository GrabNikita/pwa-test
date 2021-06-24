import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './reducers/tasksSlice';
import notificationsReducer from './reducers/notificationsSlice';

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        notifications: notificationsReducer,
    },
})