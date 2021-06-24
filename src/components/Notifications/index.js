import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Notification from './Notification';
import {add} from '../../redux/reducers/notificationsSlice';

export default function Notifications() {
    const notifications = useSelector(state => state.notifications.notifications);
    const dispatch = useDispatch();

    return <React.Fragment>
        <div id={'notifications'}>
            {notifications.map(notification => {
                return <Notification notification={notification} key={notification.id}/>;
            })}
        </div>
        <div id="buttons-wrapper">
            <button
                aria-label="Add notification"
                onClick={() => {dispatch(add({
                    "id": notifications.length + 1,
                    "text": "Added notification",
                    "status": "new",
                    "type": "message"
                }))}}
            >Добавить уведомление</button>
        </div>
    </React.Fragment>;
}