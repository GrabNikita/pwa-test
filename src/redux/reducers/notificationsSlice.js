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
            let notification = action.payload;
            state.notifications.push(notification);
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(notification.text, notification.options);
                });
            }
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
        },
        requestPermissions: () => {
            if (!('Notification' in window)) {
                console.error('This browser does not support desktop notification');
                return;
            }
            if (Notification.permission === 'granted') {
                return;
            }
            if (Notification.permission === 'denied') {
                return;
            }

            Notification.requestPermission().catch(
                error => {
                    console.error('request notification permission error', error);
                }
            );
        }
    },
});

export const {add, remove, setViewed, requestPermissions} = notificationsSlice.actions;

export default notificationsSlice.reducer;