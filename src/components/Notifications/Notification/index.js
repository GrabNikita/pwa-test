import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {NOTIFICATION_STATUS, NOTIFICATION_TYPE} from '../../../constants';
import {setViewed} from '../../../redux/actions/notificationsActions';

export default function Notification({notificationId}) {
    const notification = useSelector(state => {
        return state.notifications.notifications.find(notification => {
            return notification.id === notificationId;
        });
    });
    if (notification.status === NOTIFICATION_STATUS.VIEWED) return null;

    const dispatch = useDispatch();

    let className = 'notification' + (notification.type === NOTIFICATION_TYPE.ERROR ? ' error' : '');

    return <div
        className={className}
        onClick={() => {dispatch(setViewed(notification.id))}}
    >{notification.text} - {notification.status}</div>;
}