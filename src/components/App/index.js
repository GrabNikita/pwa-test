import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Tasks from '../Tasks';
import Notifications from '../Notifications';
import {requestNotificationsPermissions} from '../../redux/actions/appActions';

export default function App() {
    const {loading, error} = useSelector(state => {
        return {
            loading: state.app.loading,
            error: state.app.error,
            notificationsPermission: state.app.notificationsPermission,
        }
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestNotificationsPermissions());
    }, []);

    return <React.Fragment>
        <h1>PWA test</h1>
        {(loading ? 'Идет загрузка данных...' : null)}
        {(error ? <div className={'error'}>{error}</div> : null)}
        <Notifications />
        <Tasks />
    </React.Fragment>;
}