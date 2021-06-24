import { createSlice } from '@reduxjs/toolkit';

import {NOTIFICATION_STATUS} from '../../constants';

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [
            {
                "id": 1,
                "text": "Hi, Dima!",
                "status": "new",
                "type": "message"
            },
            {
                "id": 2,
                "text": "No hi",
                "status": "viewed",
                "type": "error"
            }
        ],
    },
    reducers: {
        add: (state, action) => {
            state.notifications.push(action.payload);
        },
        setViewed: (state, action) => {
            state.notifications = state.notifications.map(notification => {
                if (notification.id === action.payload) {
                    notification.status = NOTIFICATION_STATUS.VIEWED;
                }
                return notification;
            });
        },
        remove: (state, action) => {
            state.notifications.every((notification, index) => {
                if (notification.id === action.payload) {
                    state.notifications.splice(index, 1);
                    return false;
                }
                return true;
            });
        }
    },
});

export const {add, remove, setViewed} = notificationsSlice.actions;

export default notificationsSlice.reducer;