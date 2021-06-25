export function requestNotificationsPermissions() {
    return dispatch => {
        let payload = {
            permission: 'default',
            requested: true,
            supported: false,
        };
        if (!('Notification' in window)) {
            console.error('This browser does not support notifications.');
            dispatch({type: 'app/requestNotificationsPermissions', payload: payload});
            return;
        }
        payload.supported = true;
        if (Notification.permission === 'granted' || Notification.permission === 'denied') {
            payload.permission = Notification.permission;
            dispatch({type: 'app/requestNotificationsPermissions', payload: payload});
            return;
        }

        Notification.requestPermission().then(permission => {
            payload.permission = permission;
            dispatch({type: 'app/requestNotificationsPermissions', payload: payload});
        }).catch(
            error => {
                console.error('request notification permission error', error);
            }
        );
    }
}