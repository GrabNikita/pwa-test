import React from 'react';
import {useDispatch} from 'react-redux';

import {NOTIFICATION_STATUS, NOTIFICATION_TYPE} from '../../../constants';
import {setViewed} from '../../../redux/reducers/notificationsSlice';

export default function Notification({notification}) {
    if (notification.status === NOTIFICATION_STATUS.VIEWED) return null;

    const dispatch = useDispatch();

    let className = 'notification' + (notification.type === NOTIFICATION_TYPE.ERROR ? ' error' : '');

    return <div
        className={className}
        onClick={() => {dispatch(setViewed(notification.id))}}
    >{notification.text} - {notification.status}</div>;
}