import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import TasksList from '../TasksList';
import Notifications from '../Notifications';
import {requestPermissions} from '../../redux/reducers/notificationsSlice';

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestPermissions());
    });
    return <React.Fragment>
        <h1>PWA test</h1>
        <Notifications />
        <TasksList />
    </React.Fragment>;
}