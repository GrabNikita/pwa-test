export function load() {
    return dispatch => {
        dispatch({type: 'START_FETCH'});
        fetch('/data/tasks.json').then(response => response.json()).then(
            json => {
                dispatch({type: 'tasks/load', payload: json.tasks});
            }
        ).catch((error) => {
            dispatch({type: 'ERROR', payload: error});
        }).finally(() => {
            dispatch({type: 'END_FETCH'});
        });
    }
}

export function add() {
    return (dispatch) => {
        dispatch({type: 'START_FETCH'});
        fetch('/data/add-task.json').then(response => response.json()).then(
            json => {
                dispatch({type: 'tasks/add', payload: json.task});
            }
        ).catch((error) => {
            dispatch({type: 'ERROR', payload: error});
        }).finally(() => {
            dispatch({type: 'END_FETCH'});
        });
    }
}