import {NOTIFICATION_STATUS} from '../../constants';

const initialState = {
    notifications: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'notifications/setViewed':
            var notifications = state.notifications;
            notifications = state.notifications.map(notification => {
                if (notification.id === action.payload.id) {
                    return action.payload;
                }
                return notification;
            });
            return {
                ...state,
                notifications: notifications,
            };
        case 'notifications/load':
            var notifications = action.payload;
            return {
                ...state,
                notifications: notifications,
            };
        case 'notifications/requestPermissions':
            return state;
        default:
            return state;
    }
}