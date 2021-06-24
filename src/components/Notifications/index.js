import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Notification from './Notification';
import {load} from '../../redux/actions/notificationsActions';

export default function Notifications() {
    const dispatch = useDispatch();
    let notifications = useSelector(state => state.notifications.notifications);

    useEffect(() => {
        dispatch(load());
    }, []);

    return <React.Fragment>
        <div id={'notifications'}>
            {notifications.map(notification => {
                return <Notification notificationId={notification.id} key={notification.id}/>;
            })}
        </div>
    </React.Fragment>;
}