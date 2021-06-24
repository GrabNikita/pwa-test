export function load() {
    return dispatch => {
        dispatch({type: 'START_FETCH'});
        fetch('/data/notifications.json').then(response => response.json()).then(
            json => {
                dispatch({type: 'notifications/load', payload: json.notifications});
            }
        ).catch((error) => {
            dispatch({type: 'ERROR', payload: error});
        }).finally(() => {
            dispatch({type: 'END_FETCH'});
        });
    }
}

export function setViewed() {
    return (dispatch) => {
        dispatch({type: 'START_FETCH'});
        fetch('/data/set-viewed-notification.json').then(response => response.json()).then(
            json => {
                dispatch({type: 'notifications/setViewed', payload: json.notification});
            }
        ).catch((error) => {
            dispatch({type: 'ERROR', payload: error});
        }).finally(() => {
            dispatch({type: 'END_FETCH'});
        });
    }
}

export function requestPermissions() {
    return dispatch => {
        console.log('requestPermissions call');
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
}

